#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const readJSON = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'))
const rootPackageJsonPath = path.resolve('./package.json')

const packages = {
  app: 'packages/app',
  ethereum: 'packages/ethereum',
  functions: 'packages/functions',
}

const joinedScripts = Object.keys(packages)
  .map((name) => ({
    name,
    path: path.join(packages[name]),
  }))
  .reduce((acc, cur) => {
    const { scripts } = readJSON(path.resolve(cur.path, 'package.json'))

    const s = Object.keys(scripts || {}).reduce(
      (a, script) => ({
        ...a,
        [`${cur.name}:${script}`]: `pnpm -C ${cur.path} ${script}`,
      }),
      {},
    )

    return {
      ...acc,
      ...s,
    }
  }, {})

const rootPackage = readJSON(rootPackageJsonPath)

Object.assign(rootPackage.scripts, joinedScripts)

fs.writeFileSync(
  rootPackageJsonPath,
  JSON.stringify(rootPackage, null, 2) + '\n',
  'utf-8',
)
