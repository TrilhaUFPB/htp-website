import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (the live site and /harry) leave no single layout for
    // a 404; app/global-not-found.tsx serves unmatched URLs instead.
    globalNotFound: true,
  },
  // PostHog's ingestion API uses trailing slashes (/e/), which Next would
  // otherwise redirect away.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    // Static assets and remote config come from the asset host; the catch-all
    // must stay last or it swallows both.
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
