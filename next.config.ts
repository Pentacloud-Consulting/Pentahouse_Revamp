import type { NextConfig } from "next";

const WP_SERVER_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://admin.pentahouse.in";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/wp-admin/:path*",
        destination: `${WP_SERVER_URL}/wp-admin/:path*`,
      },
      {
        source: "/wp-login.php",
        destination: `${WP_SERVER_URL}/wp-login.php`,
      },
      {
        source: "/wp-json/:path*",
        destination: `${WP_SERVER_URL}/wp-json/:path*`,
      },
    ];
  },
};

export default nextConfig;
