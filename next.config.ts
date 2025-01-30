import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images:{
 domains:['images.unsplash.com']
},
env:{
    NEXT_PUBLIC_SPEECH_KEY:process.env.SPEECH_KEY,
    NEXT_PUBLIC_REGION:process.env.SPEECH_REGION,
    NEXT_PUBLIC_API:process.env.FINNHUB_API
}
};

export default nextConfig;
