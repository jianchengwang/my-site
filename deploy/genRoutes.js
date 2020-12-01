const fs = require('fs');
const path = require('path');
function travel(dir,callback){
    fs.readdirSync(dir).forEach((file)=>{
        var pathname=path.join(dir,file)
        if(fs.statSync(pathname).isDirectory()){
            travel(pathname,callback)
        }else{
            callback(pathname)
        }
    })
}
travel('c:/workspace/node/my-site/content',function(pathname){
    console.log("'" + pathname.replace('c:\\workspace\\node\\my-site\\content', '').replace('\\', '/').replace('\\', '/').replace('.md', '') + "',")
})
