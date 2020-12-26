const app = require('express')();
const shell = require('shelljs');

app.get('/downgit', (req, res) => {
  let query = req.query
  const gitrep = query.gitrep
  targetFilePath = "${gitrep#*${branch}/}"
  const downloadLink = shell.exec(`tail -n 2 $(/root/_sh/downgit/downgit.sh '${gitrep}')#*downloadLink:`)
  res.send(downloadLink)
})

module.exports = {
  path: 'api',
  handler: app
}
