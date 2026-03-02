// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs/promises");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { GoogleGenAI } = require("@google/genai");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require("dotenv");

dotenv.config();

// Define exact schema for Gemini Structured Output
const responseSchema = {
  type: "OBJECT",
  properties: {
    tag: {
      type: "STRING",
      enum: ["SQL", "Async", "Frontend", "Infra"],
    },
    context: {
      type: "STRING",
      description: "Brief explanation of the problem or situation from the commits.",
    },
    decision: {
      type: "STRING",
      description: "What exact action/code change was made to fix it.",
    },
    why: {
      type: "STRING",
      description: "The underlying engineering reasoning forcing this decision.",
    },
    impact: {
      type: "STRING",
      description: "A short, sharp metric or result (e.g., '10s -> 1s', '0 dropped hooks').",
    },
    note: {
      type: "STRING",
      description: "A short, punchy architectural lesson learned and a non-obvious technical or psychological insight.",
    },
  },
  required: ["tag", "context", "decision", "why", "impact", "note"],
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Octokit } = require("@octokit/rest");

// Initialize GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || process.env.GH_TOKEN,
});

// Configure the list of repositories to scan (username/repo-name format)
const TARGET_REPOSITORIES = [
  "sherlocod3/portfolio-sherlocod3",
  "sherloCod3/reporting-platform-prototype",
  "sherloCod3/health-data-analytics",
  "sherloCod3/desafio-vnw-projetos-sociais",
  // Add your other repositories here! e.g., "sherlocod3/another-repo"
];

const LOG_FILE = path.join(process.cwd(), "public", "devlog.json");
const STATE_FILE = path.join(__dirname, ".devlog-state.json");

async function getState() {
  try {
    const data = await fs.readFile(STATE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return { lastRunDate: null };
  }
}

async function saveState(dateStr) {
  await fs.writeFile(STATE_FILE, JSON.stringify({ lastRunDate: dateStr }, null, 2));
}

async function getRecentCommits(daysArg) {
  const state = await getState();
  
  let sinceISO;
  
  if (!isNaN(daysArg)) {
    console.log(`Explicit days argument provided (${daysArg}). Ignoring watermark and looking back...`);
    const date = new Date();
    date.setDate(date.getDate() - daysArg);
    sinceISO = date.toISOString();
  } else if (state.lastRunDate) {
    console.log(`Found watermark. Fetching commits strictly AFTER ${state.lastRunDate}...`);
    // Add 1 second to the watermark so we don't fetch the exact same last commit again
    const lastDate = new Date(state.lastRunDate);
    lastDate.setSeconds(lastDate.getSeconds() + 1);
    sinceISO = lastDate.toISOString();
  } else {
    const defaultDays = 7;
    console.log(`No watermark found. Looking back ${defaultDays} days...`);
    const date = new Date();
    date.setDate(date.getDate() - defaultDays);
    sinceISO = date.toISOString();
  }

  let allCommits = [];

  for (const repoString of TARGET_REPOSITORIES) {
    const [owner, repo] = repoString.split("/");
    if (!owner || !repo) continue;

    console.log(`Fetching commits from ${repoString}...`);
    try {
      const response = await octokit.rest.repos.listCommits({
        owner,
        repo,
        since: sinceISO,
        per_page: 100, // Fetch up to 100 commits per repository
      });

      const repoCommits = response.data
        // Filter out merge commits heuristically (merge commits usually have multiple parents)
        .filter((commitObj) => commitObj.parents.length <= 1)
        .map((commitObj) => ({
          date: commitObj.commit.author.date,
          message: commitObj.commit.message.split("\n")[0], // First line
          body: commitObj.commit.message.replace(/^.*\n/, "").trim(), // Everything else
          repo: repoString,
        }));

      allCommits = allCommits.concat(repoCommits);
    } catch (error) {
      console.warn(`⚠️ Failed to fetch commits for ${repoString}: ${error.message}`);
    }
  }

  // Sort all commits globally by date ascending (oldest first, so chronological order)
  return allCommits.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// removed duplicate LOG_FILE

async function run() {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set in .env.");
    console.warn("Dev log generation requires a valid Gemini API Key to synthesize commits.");
    console.warn("Aborting generation gracefully.");
    process.exit(0);
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  console.log("Analyzing recent commits for Dev Log candidate...");

  // Support various argument formats: -- 21, --21, --days=21
  const daysString = process.argv.slice(2).find((arg) => /\d+/.test(arg));
  const daysArg = daysString ? parseInt(daysString.replace(/[^\d]/g, ""), 10) : NaN;

  const rawCommits = await getRecentCommits(daysArg); 
  
  if (rawCommits.length === 0) {
    console.log("No new commits found since last run. Exiting gracefully.");
    process.exit(0);
  }

  const commitText = rawCommits
    .map((c) => `[${c.date}] ${c.message}\n${c.body}`)
    .join("\n---\n");

  console.log(`Found ${rawCommits.length} commits. Synthesizing sequence...`);

  // 2. Synthesize using Google Gemini API
  const prompt = `
You are a Staff Software Engineer analyzing raw git commits from multiple concurrent repositories.
Your goal is to synthesize these commits into a single and authentic "Dev Log" entry following the "Silent Intensity" aesthetic. 

CRITICAL INSTRUCTIONS:
- These commits come from DIFFERENT, INDEPENDENT projects running in parallel (as denoted by the [repo] tag). 
- DO NOT claim that one project "pivoted" into another project. They are separate streams of work.
- DO NOT try to merge every single commit into the story.
- Find the single most interesting, complex, or high-impact technical theme/problem solved across this timeframe and focus the log entirely on that.
- Be highly technical, direct, and slightly cynical but professional. Avoid marketing fluff. Use Intelligent irony + resilient optimism of someone who fights alone.
- Output JSON matching the schema precisely.

RAW COMMITS:
${commitText}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const outputText = response.text;
    
    if (!outputText) {
        throw new Error("No text returned from Gemini");
    }

    const synthesizedLog = JSON.parse(outputText);

    // Add generated ID and today's Date
    const finalLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      ...synthesizedLog,
    };

    console.log("Generated Log Preview:");
    console.log(JSON.stringify(finalLog, null, 2));

    // 3. Append to existing log
    let existingLogs = [];
    try {
      const fileRaw = await fs.readFile(LOG_FILE, "utf-8");
      existingLogs = JSON.parse(fileRaw);
    } catch (e) {
      console.log("No existing devlog.json found, starting fresh.");
    }

    const updatedLogs = [finalLog, ...existingLogs];

    await fs.writeFile(LOG_FILE, JSON.stringify(updatedLogs, null, 2));
    
    // Save watermark
    const newestCommitDate = rawCommits[rawCommits.length - 1].date;
    await saveState(newestCommitDate);

    console.log(`\nSuccessfully appended to ${LOG_FILE}!`);
    console.log(`Updated high watermark to ${newestCommitDate}.`);
    console.log(`Run 'git add public/devlog.json scripts/.devlog-state.json' to version this update.`);
  } catch (error) {
    console.error("Error synthesizing branch:", error);
    process.exit(1);
  }
}

run();
