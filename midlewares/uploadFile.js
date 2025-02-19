//multer enreg une copie du photo
const multer = require('multer');
const path = require('path');
// file system
const fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
},
filename: function (req, file, cb) {
    const uploadPath = 'public/files';
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    let fileName = originalName;

    //verification 
    const  fileIndex = 1;
    while (fs.existsSync(path.join(uploadPath, fileName))) {
      const baseName = path.basename(originalName, fileExtension);
      fileName = `${baseName}_${fileIndex}${fileExtension}`;
      fileIndex++;
    }
    cb(null, fileName);
  }
})
//export
var uploadfile = multer({ storage: storage });
module.exports = uploadfile;
//nb : kolo copie coller dima ma yetbadel ken esm l files ctt 