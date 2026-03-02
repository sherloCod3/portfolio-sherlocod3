# SherloCod3 — Engineering Logbook

The personal portfolio and engineering log of **Alexandre Cavalari**, Full Stack Engineer.

Built with an **Industrial Slate** aesthetic, this portfolio favors high-contrast typography, interactive technical dossiers, and deep system breakdowns over generic template cards to highlight actual engineering impact.

**Live:** [sherlocod3.dev](https://sherlocod3.dev) _(Replace with actual URL if different)_

---

## 🏗 Architecture & Tech Stack

This project is built for maximum client-side performance, accessibility, and visual consistency without heavy bundles.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (with strict `prefers-reduced-motion` adherence)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) (UI) & [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (Code/Technical)
- **Language**: TypeScript (Strict Mode)

## ✨ Key Features

- **Technical Dossier Pattern**: Projects are displayed as expandable dossiers outlining the _Challenge_, _Solution_, and a pure-CSS syntax-highlighted _CodeSnippet_ rather than relying solely on UI screenshots.
- **Advanced Filtering**: Instant, animated `<AnimatePresence>` filtering of projects by type (`Backend`, `Full Stack`, `Frontend`) and Dev Logs by category (`SQL`, `Async`, etc.).
- **CSS-Only Syntax Highlighting**: A custom `<CodeSnippet />` component that tokenizes and colors TypeScript and SQL using pure React/CSS, eliminating the need for heavy runtime libraries like Prism or Highlight.js.
- **Accessibility First**: Fully responsive layouts, semantic section wrappers, contrast-compliant "Industrial Slate" themes, and global hooks to respect OS-level reduced motion preferences.
- **SEO Ready**: Pre-configured dynamic `og:image` and `twitter:card` tags for professional preview unfurling on platforms like LinkedIn and Twitter.

## 🚀 Local Setup

To run this project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/sherlocod3/portfolio-sherlocod3.git
   cd portfolio-sherlocod3
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application. Building for production can be done with `npm run build`.

## 🎨 Branding (Silent Intensity)

The project adheres strictly to the `branding-identidade-visual.md` specification rules found in the repository root.

- **Theme**: Deep petroleum blue/slate baseline (`#0D1117`), cyan highlights (`#38BDF8`).
- **Voice**: Direct, technical, omitting subjective marketing fluff in favor of measured impact.

## 📝 License

Contributions and forks for learning architectural patterns are welcome. However, please do not directly copy the personal identity, dev logs, or exact visual styling for your own portfolio.
