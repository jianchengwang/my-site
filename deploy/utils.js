const fs = require('fs');
const path = require('path');

const travel = function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      callback(pathname)
    }
  })
},

const genRoutes = function (dir) {
  let asyncRoutes = [];
  travel(dir, function (pathname) {
    pathname = "'" + pathname.replace(dir, '').replace('\\', '/').replace('\\', '/').replace('.md', '') + "',";
    console.info(pathname);
    asyncRoutes.push(pathname);
    // console.log("'" + pathname.replace('c:\\workspace\\node\\my-site\\content', '').replace('\\', '/').replace('\\', '/').replace('.md', '') + "',")
  })
  return asyncRoutes;
}
// genRoutes('D:\\workspace\\node\\my-site\\content')

const utils = {
  travel,
  genRoutes
}

module.exports = utils