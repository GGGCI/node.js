const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const path = require("path");

const port = 3000;
const ip = "127.0.0.1";
const express = require('express');
const multer = require('multer');
const app = express();

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

app.post('/uploads', upload.fields([{name:'key'},{name:"CC"},{name:"cts"}]), (req, res) => {
  // 文件上传后的处理逻辑
  try{
    const uploadedFiles = req.files.CC;
    const key = req.files.key;
    const cts = req.files.cts; 
  
    //console.log('上傳的文件数量：', uploadedFiles.length);
    console.log('CC message:',uploadedFiles);
    console.log('key:',key);
    console.log('cts:',cts);
    res.send(JSON.stringify({
      name: uploadedFiles.originalname,
      size: uploadedFiles.size,
    }));
    console.log("file success upload");
  }catch(error){
    console.error(error);
  }
  console.log("prepare to query");
  exec("cd uploads/ && LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./server -q",(error,stdout,stderr)=>{
    if(error){
      console.error(`error: ${error}`);
    return;
  }
    //console.log(`stdout:${stdout}`);
    //console.error(`stderr:${stderr}`);
    /*exec("LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./server -q",(error,stdout,stderr)=>{
      if(error){
        console.error(`error: ${error}`);
      return;
    }
      //console.log(`stdout:${stdout}`);
      console.log("query success uploaded");
      //console.error(`stderr:${stderr}`);
    });*/
  });
  console.log("query success uploaded");
  //sudo LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./uploads/server -e
 });
  

  
 app.get('/download', (req, res)=>{
  res.download(path.join(__dirname,'uploads', 'data.csv'))
})


app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
