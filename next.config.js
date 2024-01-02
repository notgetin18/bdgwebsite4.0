/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // basePath: '/beta',
  // assetPrefix: '/beta',
  // publicRuntimeConfig: {
  //   baseURL: '/beta',
  // },
  env: {
    // baseUrl: "https://bdgapi.testingphases.in",
    baseUrl: "https://api.brightdigigold.com",
    // baseUrl: "https://api.brightdigigold.com",
<<<<<<< HEAD
=======
    baseUrl: "https://api.brightdigigold.com",
>>>>>>> f80a769b2d904ed971b76b98cc0a69429616adba
    // baseUrl: "https://devapi.brightdigigold.com",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
