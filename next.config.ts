import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  transpilePackages: ["next-sanity", "sanity"],
};

export default nextConfig;
