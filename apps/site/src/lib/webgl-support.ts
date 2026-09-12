// Split out from constellation-scene.ts so checking WebGL support doesn't
// require fetching/evaluating the three.js bundle it lives alongside —
// Constellation.astro checks this before dynamically importing that module.
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
