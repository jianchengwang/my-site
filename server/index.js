const app = require('express')();
const shell = require('shelljs');

app.get('/downgit', (req, res) => {
  let query = req.query
  const gitrep = query.gitrep
  const downloadLink = shell.exec("${$(/root/_sh / downgit / downgit.sh '" + gitrep + "')#downloadLink:}")
  res.send(downloadLink)
})

module.exports = {
  path: 'api',
  handler: app
}
