import type { NextConfig } from 'next';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'map-draw-demo';

const nextConfig: NextConfig = {
	output: 'export',
	basePath: process.env.NODE_ENV === 'production' ? `/${repo}` : '',
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
