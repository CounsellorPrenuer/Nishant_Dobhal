import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  transpilePackages: ["next-sanity", "sanity"],
};

export default nextConfig;
