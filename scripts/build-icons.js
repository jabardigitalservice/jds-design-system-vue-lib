
'use strict';
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const mkdir = promisify(fs.mkdir)
const exists = promisify(fs.exists)
const readDir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const toSFC = require('svg-to-vue-component/index')
const dest = path.resolve(process.cwd(), 'publish/icons')

async function main() {
  const isExist = await exists(dest)
  if (!isExist) {
    await mkdir(dest, {
      recursive: true
    })
  }

  const iconFolder = path.resolve(process.cwd(), 'src/assets/icons')
  const svgFileNames = await readDir(iconFolder, {
    encoding: 'utf-8'
  })

  for (const filename of svgFileNames) {
    const template = await readFile(path.join(iconFolder, filename), {
      encoding: 'utf-8'
    })
    const componentName = filename.replace(/\.svg$/g, '') + '.vue'
    const { component: SFC } = await toSFC(template)

    await writeFile(path.join(dest, componentName), SFC, {
      encoding: 'utf-8', 
    })
  }
}

main()
