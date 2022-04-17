// const fs = require("fs")
// // const path = require("path")

// const getAllFiles = function(dirPath, arrayOfFiles) {
//   files = fs.readdirSync(dirPath)
//   arrayOfFiles = arrayOfFiles || []
//   files.forEach(function(file) {
//     if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//       arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
//     } else {
//       arrayOfFiles.push(dirPath+'/'+file)
//     }
//   })
//   return arrayOfFiles
// }
// var stream = fs.createWriteStream("assfiles.md", {'flags': 'a'});
// stream.once('open', function(fd) {
//     getAllFiles('D:\\Technologies\\Lang\\frontend\\thenullsoft', []).forEach(element => {
//         stream.write("'"+element+"',"+"\r\n");
//     });
// });

import filespaths from './files.js'

console.log(filespaths);



// let currUrl = new URL(event.request.url)
// const cache = await caches.open(CACHE_NAME);
// if(!filespaths.includes(currUrl.pathname)){
//     const cachedResponse = await cache.match(OFFLINE_URL);
//     return cachedResponse;
// } else {
//     const cachresp = await cache.match(event.request);
//     return cachresp;
// }