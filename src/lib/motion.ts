/**
 * Motion utility that respects prefers-reduced-motion OS setting.
 * Import `motionProps` instead of passing motion values directly
 * to any framer-motion component.
 */

export const reducedMotionTransition = { duration: 0, delay: 0 };

/** Primary fade-up for section entries */
export const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

/** Side fade for left/right reveals */
export const fadeLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export const fadeRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

/** Expandable height reveals (used in Dossier) */
export const expandHeight = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
};

/** Shared viewport config for scroll-triggered animations */
export const defaultViewport = { once: true, margin: "-80px" };
