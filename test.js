const fs = require("fs")
// const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(dirPath+'/'+file)
    }
  })
  return arrayOfFiles
}
var stream = fs.createWriteStream("assfiles.md", {'flags': 'a'});
stream.once('open', function(fd) {
  stream.write("'"+getAllFiles('assets', [])+"'"+"\r\n");
});