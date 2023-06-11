const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const path = require("path");

const port = 3000;
const ip = "127.0.0.1";
const express = require('express');
const multer = require('multer');
const app = express();

let a = 0;
const { exec, spawn } = require("child_process");

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
},
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})
const upload = multer({ 
  storage: storage,
 });
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('html'));
app.get('', (req, res) =>{
  res.sendFile(path.join(__dirname,'html','TTC.html'));
});

app.post('/uploads', upload.fields([{name:'file'},{name:"key"}]), (req, res) => {
  // 文件上传后的处理逻辑
  try{
    const uploadedFiles = req.files.file;
    const key = req.files.key;
  
    //console.log('上傳的文件数量：', uploadedFiles.length);
    console.log('file message:',uploadedFiles);
    console.log('key:',key);
    res.send("GCI"); /*JSON.stringify({
      name: uploadedFiles.originalname,
      size: uploadedFiles.size,
    })*/
    console.log("file success upload");
    a = 1;
  }catch(error){
    console.error(error);
  }
  
  //sudo LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./uploads/server -e
 
 });
 if(a == 1)
 {
  exec("LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./server -e",(error,stdout,stderr)=>{

    //const child = spawn("./server -e"); //where a is the exe file generated on compiling the code.
    //child.stdin.write("4 5");
    //child.stdin.end();
   // child.stdout.on("data", (data) => {
     // console.log(`child stdout:\n${data}`);
   // });
    if(error){
      console.error(`error: ${error}`);
    return;
  }
    console.log(`stdout:${stdout}`);
    console.error(`stderr:${stderr}`);
  });
 }
 app.get('/download', (req, res)=>{
  res.download(path.join(__dirname, 'data.csv'))
})


app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
