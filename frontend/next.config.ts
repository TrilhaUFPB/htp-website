import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (the live site and /harry) leave no single layout for
    // a 404; app/global-not-found.tsx serves unmatched URLs instead.
    globalNotFound: true,
  },
};

export default nextConfig;
