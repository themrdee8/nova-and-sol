import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      new URL(
        "https://bopazqvhcdgycpxmlbei.supabase.co/storage/v1/object/public/images/**"
      ),
    ],
  },
};

export default nextConfig;
