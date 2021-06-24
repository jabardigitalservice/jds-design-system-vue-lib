const shell = require('shelljs')

shell.exec('concurrently "npm run build:css:watch" "npm run build:esm -- --watch" "npm run playground:vue"')
