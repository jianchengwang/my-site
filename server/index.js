const app = require('express')();
const shell = require('shelljs');

app.get('/hello', (req, res) => {
  res.send(shell.pwd())
})

app.get('/downgit', (req, res) => {
  let params = req.params
  const gitrep = params.gitrep
  const downloadLink = shell.exec(`/root/_sh/downgit/downgit.sh ${gitrep}`)
  res.send(downloadLink)
})

module.exports = {
  path: 'api',
  handler: app
}
