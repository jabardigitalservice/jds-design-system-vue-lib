const shell = require('shelljs')

const args = process.argv.slice(2)
const watch = args.includes('--watch')
shell.rm('-rf', 'publish/esm', 'publish/styles')
shell.cp('-r', 'styles/', 'publish/styles/')
shell.exec(`npx cross-env NODE_ENV=build_esm babel src --config-file ./babel.lib.config.js --out-dir publish/esm/  --copy-files ${watch ? '--watch' : ''}`)