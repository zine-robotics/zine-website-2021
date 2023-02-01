/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: "./", //commnet it out when running on dev
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
