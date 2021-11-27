#!/usr/bin/env node
import 'dotenv/config'
import fs from 'fs'
import { fileURLToPath } from 'url'
import esbuild from 'esbuild'

/**@type {import("esbuild").BuildOptions} */
const buildOptions = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  incremental: true,
  platform: 'node',
  sourcemap: false,
  outdir: 'build',
  logLevel: 'info',
  target: 'node14',
  define: {
    'process.env.PRIVATE_KEY': `'${process.env.PRIVATE_KEY}'`,
    'process.env.HARDHAT_PRIVATE_KEY': `'${process.env.HARDHAT_PRIVATE_KEY}'`,
    'process.env.ROPSTEN_URL': `'${process.env.ROPSTEN_URL}'`,
    'process.env.RINKEBY_URL': `'${process.env.RINKEBY_URL}'`,
    'process.env.KOVAN_URL': `'${process.env.KOVAN_URL}'`,
  },
  format: 'esm',
  external: Object.keys(
    JSON.parse(
      fs.readFileSync(
        fileURLToPath(new URL('../package.json', import.meta.url)),
        'utf-8',
      ),
    ).dependencies,
  ).filter((dep) => !dep.startsWith('@cryptogifts')),
}

function start(args) {
  const watch = args.includes('--watch')
  esbuild
    .build({
      ...buildOptions,
      watch,
    })
    .then(() => !watch && process.exit(0))
    .catch(() => process.exit(1))
}
start(process.argv.slice(2))
