/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // เผื่อไว้ใช้รูปจริงจาก Unsplash
      },
    ],
  },
};

export default nextConfig;