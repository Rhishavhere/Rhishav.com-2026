/**
 * Is the user's OS "reduce motion" preference enabled?
 * Used to reduce or disable heavy animations for visitors with vestibular sensitivity.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
