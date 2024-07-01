/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    env: {
      EMAIL: process.env.EMAIL,
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    },
  };
  