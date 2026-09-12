/** Deterministic per-title color/width, so a spine looks the same every
 * build without needing a manually-set color field or real cover art. */
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

const DARK_TEXT: [number, number, number] = [0x21, 0x1d, 0x16];
const LIGHT_TEXT: [number, number, number] = [0xf2, 0xed, 0xe1];
const MIN_CONTRAST = 4.5;

export interface SpineStyle {
  background: string;
  color: string;
  width: number;
}

export function spineStyle(title: string): SpineStyle {
  const hash = hashString(title);
  const hue = hash % 360;
  const saturation = 30 + (hash % 25);
  let lightness = 28 + ((hash >> 4) % 30);

  // HSL lightness doesn't track perceptual luminance closely enough for
  // WCAG contrast math — especially for high-luminance hues like green/
  // yellow, a "dark" 43% lightness can still read as too bright for light
  // text. Compute real contrast and push lightness toward whichever
  // extreme the winning text color needs until it clears 4.5:1, instead of
  // trusting a fixed lightness threshold.
  let rgb = hslToRgb(hue, saturation, lightness);
  let darkContrast = contrastRatio(rgb, DARK_TEXT);
  let lightContrast = contrastRatio(rgb, LIGHT_TEXT);

  for (let i = 0; i < 20 && Math.max(darkContrast, lightContrast) < MIN_CONTRAST; i++) {
    if (darkContrast > lightContrast) {
      lightness = Math.min(96, lightness + 3);
    } else {
      lightness = Math.max(4, lightness - 3);
    }
    rgb = hslToRgb(hue, saturation, lightness);
    darkContrast = contrastRatio(rgb, DARK_TEXT);
    lightContrast = contrastRatio(rgb, LIGHT_TEXT);
  }

  const width = 42 + (hash % 6) * 7;
  return {
    background: `hsl(${hue} ${saturation}% ${lightness}%)`,
    color: darkContrast >= lightContrast ? "#211d16" : "#f2ede1",
    width,
  };
}
