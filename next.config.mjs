/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/flowday",
  assetPrefix: "/flowday/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
