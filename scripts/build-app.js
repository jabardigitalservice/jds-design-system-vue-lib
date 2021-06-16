const shell = require('shelljs')

shell.exec(`
  npx vue-cli-service build \
  --mode production \
  --target app \
  --dest dist \
  --report
`)
