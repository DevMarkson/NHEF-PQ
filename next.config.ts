import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mdv1bzkkj9z23omg.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nhefpq.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
