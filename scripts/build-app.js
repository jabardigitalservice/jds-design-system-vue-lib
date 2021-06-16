const shell = require('shelljs')

shell.exec(`
  export VUE_CLI_SERVICE_BUILD_TARGET=app && \
  npx vue-cli-service build \
  --mode production \
  --target app \
  --dest dist \
  --report
`)
