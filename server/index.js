const app = require('express')();
const shell = require('shelljs');

app.get('/hello', (req, res) => {
  res.send(shell.pwd())
})

app.get('/downgit', (req, res) => {
  let query = req.query
  const gitrep = query.gitrep
  // const downloadLink = shell.exec(`tail -n 1 $(/root/_sh/downgit/downgit.sh ${gitrep})`)
  const downloadLink = 'https://tmp.jianchengwang.info/jianchengwang.data.main.ml.zip'
  console.info(downloadLink)
  res.send(downloadLink)
})

module.exports = {
  path: 'api',
  handler: app
}
