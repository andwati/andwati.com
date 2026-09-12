// Desktop form-factor pass — same pages/config as lighthouserc.cjs, but
// Lighthouse's default (and PageSpeed Insights' default) is mobile: throttled
// CPU/network and a narrow viewport. Auditing desktop too means neither form
// factor's numbers are a blind spot.
const mobileConfig = require("./lighthouserc.cjs");

module.exports = {
  ci: {
    ...mobileConfig.ci,
    collect: {
      ...mobileConfig.ci.collect,
      settings: { preset: "desktop" },
    },
  },
};
