const outputType = process.env.NEXT_PUBLIC_PROMPTFOO_BUILD_STANDALONE_SERVER
  ? 'standalone'
  : 'export';
console.log('**************************************************');
console.log(`Building next.js in ${outputType} mode`);
console.log('**************************************************');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: outputType,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_PROMPTFOO_URL_PREFIX,
  webpack: (config, { isServer }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
      fsevents: 'require("fsevents")',
      'better-sqlite3': 'commonjs better-sqlite3',
    });

    if (!isServer) {
      config.resolve.fallback = {
        child_process: false,
        fs: false,
        module: false,
        net: false,
        os: false,
        path: false,
        tls: false,
      };
    }

    return config;
  },
  env: {
    PROMPTFOO_VERSION: require('../../../package.json').version,
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.promptfoo.dev',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'abc123',
    PROMPTFOO_BASE_URL: process.env.NEXT_PUBLIC_PROMPTFOO_URL_PREFIX
  },
};

module.exports = nextConfig;
