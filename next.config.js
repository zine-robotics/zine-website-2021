/** @type {import('next').NextConfig} */
module.exports = {
  // assetPrefix: "./", //uncommnet it out when running on dev
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname:
          "preview.redd.it",
      },
      {
        protocol: "https",
        hostname:
          "i.redd.it",
      },
      {
        protocol: "https",
        hostname:
          "www.reddit.com",
      },
      {
        protocol: "https",
        hostname:
          "*",
      },
    ],
  },
};
