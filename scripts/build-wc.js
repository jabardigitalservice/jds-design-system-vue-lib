const shell = require('shelljs')

const args = process.argv.slice(2)
const watch = args.includes('--watch')
shell.exec(`
  npx vue-cli-service build \
  --mode production \
  --target wc \
  --name jds \
  --dest publish/wc \
  'src/components/**/*.vue' \
  ${watch ? '--watch' : ''}
`);
shell.rm('publish/wc/demo.html')
