const app = require('express')();
const shell = require('shelljs');

app.get('/downgit', (req, res) => {
  let query = req.query
  const gitrep = query.gitrep
  targetFilePath = "${gitrep#*${branch}/}"
  const downloadLink = shell.exec(`$(/root/_sh/downgit/downgit.sh '${gitrep}') | awk 'END {print}'`)
  res.send(downloadLink)
})

module.exports = {
  path: 'api',
  handler: app
}
