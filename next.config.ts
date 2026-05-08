import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  basePath: "/Nishant_Dobhal",
  assetPrefix: "/Nishant_Dobhal/",
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  transpilePackages: ["next-sanity", "sanity"],
};

export default nextConfig;
