import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { basename, dirname, extname, join, relative } from 'path'

import { MODULES, readRelativeFile, ROOT_DIR, SOURCE_DIR } from './common'

const MAIN_REGEX = new RegExp('%main%', 'g')
const TYPES_REGEX = new RegExp('%types%', 'g')
const MODULE_REGEX = new RegExp('%module%', 'g')

const PACKAGE_JSON_TEMPLATE = readRelativeFile(__dirname, 'package-template.json')
const TS_REGEX = /.tsx?$/g
const TEST_REGEX = /.test.tsx?$/g
const BROWSER_TEST_REGEX = /.browser-test.tsx?$/g

MODULES.forEach(createExportTemplate)

MODULES.forEach((name) =>
  readAllFiles(join(SOURCE_DIR, name)).forEach((file) =>
    createPackageFor(name.replace(TS_REGEX, ''), file),
  ),
)

function createExportTemplate(name: string) {
  const directory = join(ROOT_DIR, name).replace(TS_REGEX, '')

  mkdir(directory)

  const packageJsonPath = join(directory, 'package.json')
  const main = `../cjs/${name}/index.js`
  const types = `../cjs/${name}/index.d.ts`
  const module = `../esm/${name}/index.d.ts`
  const packageJsonContents = JSON.parse(createPkgJson(main, types, module))

  writeFileSync(packageJsonPath, JSON.stringify(packageJsonContents, null, 2) + '\n')
}

function readAllFiles(directoryOrFile: string): ReadonlyArray<string> {
  const isFile = statSync(directoryOrFile).isFile()

  if (isFile) {
    return [directoryOrFile]
  }

  const contents = readdirSync(directoryOrFile).map((n) => join(directoryOrFile, n))
  const fileNames = contents
    .filter((p) => statSync(p).isFile())
    .filter((p) => shouldCreatePackageFor(basename(p)))
  const directoryNames = contents.filter((p) => statSync(p).isDirectory())

  return [...fileNames, ...directoryNames.flatMap(readAllFiles)]
}

function createPackageFor(moduleName: string, filePath: string) {
  const name = basename(moduleName, extname(moduleName))
  const moduleDir = join(ROOT_DIR, name)
  const srcDir = join(SOURCE_DIR, name)
  const cjsDir = join(ROOT_DIR, 'cjs', name)
  const esmDir = join(ROOT_DIR, 'esm', name)
  const relativeSrcPath = relative(srcDir, filePath)
  const relativePath = relativeSrcPath.replace(TS_REGEX, '')
  const modulePath = join(moduleDir, relativePath).replace(TS_REGEX, '')
  const jsonPath = join(modulePath, 'package.json')
  const cjsPath = join(cjsDir, relativePath)
  const typesPath = join(cjsDir, relativePath)
  const esmPath = join(esmDir, relativePath)

  const main = relative(modulePath, cjsPath) + '.js'
  const types = relative(modulePath, typesPath) + '.d.ts'
  const module = relative(modulePath, esmPath) + '.js'

  const json = JSON.parse(createPkgJson(main, types, module))

  mkdir(modulePath)

  writeFileSync(jsonPath, JSON.stringify(json, null, 2) + '\n')
}

function mkdir(directory: string) {
  let parent = dirname(directory)
  const dirsToCreate: string[] = []

  if (!existsSync(parent)) {
    dirsToCreate.unshift(parent)

    parent = dirname(parent)
  }

  for (const dir of dirsToCreate) {
    mkdirIfNotExists(dir)
  }

  mkdirIfNotExists(directory)
}

function mkdirIfNotExists(directory: string) {
  if (!existsSync(directory)) {
    mkdirSync(directory)
  }
}

function shouldCreatePackageFor(fileName: string) {
  if (
    TEST_REGEX.test(fileName) ||
    BROWSER_TEST_REGEX.test(fileName) ||
    (fileName.startsWith('tsconfig.') && fileName.endsWith('.json'))
  ) {
    return false
  }

  return true
}

function createPkgJson(main: string, types: string, module: string): string {
  return PACKAGE_JSON_TEMPLATE.replace(MAIN_REGEX, main)
    .replace(TYPES_REGEX, types)
    .replace(MODULE_REGEX, module)
}
