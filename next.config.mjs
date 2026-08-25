/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
  allowedDevOrigins: ['192.168.1.38', '127.0.0.1', 'localhost'],
};

export default nextConfig;
