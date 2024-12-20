

/**
 * Run build or dev with SKIP_ENV_VALIDATION to skip env validation. This is especially useful
 * for Docker builds.
 */
import type { NextConfig } from "next";

/** @type {import("next").NextConfig} */
const config = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    distDir: 'build',

};

export default config;