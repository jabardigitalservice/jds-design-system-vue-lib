const shell = require('shelljs')

shell.exec(`
  concurrently \
  "npm run build:css:watch" \
  "npm run build:wc -- --watch" \
  "npm run playground:html"
`)
