/**
 * Lighthouse CI — runs the same audits PageSpeed Insights reports on
 * (performance, accessibility, best-practices, SEO) against the built site,
 * so results can be tracked over time / per-commit without depending on the
 * hosted PSI API. `staticDistDir` lets lhci serve `dist/` itself, no dev
 * server juggling needed. Reporting only for now — no `assert` thresholds,
 * so a regression shows up in the report without failing the build.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "/index.html",
        "/writings/index.html",
        "/writings/from-c-to-machine-code/index.html",
        "/archive/index.html",
        "/portfolio/index.html",
        "/bookshelf/index.html",
        "/tags/index.html",
        "/about/index.html",
      ],
      numberOfRuns: 3,
    },
    upload: {
      // Free, no account/server needed — each run prints a shareable report
      // link (expires after 7 days). Point this at a real LHCI server later
      // if longer-lived historical tracking is wanted.
      target: "temporary-public-storage",
    },
  },
};
