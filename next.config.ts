import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Fully static site: `next build` writes plain files to ./out for static-web-server.
  output: "export",
  // The site uses plain <img>, not next/image.
  images: { unoptimized: true },
};

export default nextConfig;
