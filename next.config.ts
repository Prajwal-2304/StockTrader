import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images:{
 domains:['images.unsplash.com']
},
env:{
    NEXT_PUBLIC_API:process.env.FINNHUB_API
}
};

export default nextConfig;
