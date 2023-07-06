const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const path = require("path");
const unzipper = require('unzipper');
const port = 3000;
const ip = "127.0.0.1";
const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
let count = 0;

const { exec, spawn } = require("child_process");

app.use(bodyParser.urlencoded({ extended: true }));

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
app.use(express.static('views'));
app.get('', (req, res) =>{
  res.sendFile(path.join(__dirname,'views','TTC.html'));
});

app.post('/uploads', upload.fields([{name:'key'},{name:"CC"},{name:"encData"},{name:"cts"}]), (req, res) => {
  // 文件上传后的处理逻辑
  try{
    const uploadedFiles = req.files.CC;
    const key = req.files.key;
    const cts = req.files.cts; 
    const encData = req.files.encData;
    let selectedValue = "query";
    selectedValue = req.body.select;
    

    //console.log('上傳的文件数量：', uploadedFiles.length);
    console.log('CC message:',uploadedFiles);
    console.log('key:',key);
    console.log('cts:',cts);
    console.log('encData:',encData);
    fs.createReadStream('uploads/cts.zip')
    .pipe(unzipper.Extract({ path: 'uploads' }))
    .on('error', (err) => {
      console.error('cts解壓縮失败:', err);
    })
    .on('finish', () => {
      console.log('cts解壓縮完成');
      
    });
    fs.createReadStream('uploads/encData.zip')
    .pipe(unzipper.Extract({ path: 'uploads' }))
    .on('error', (err) => {
      console.error('encData解壓縮失败:', err);
    })
    .on('finish', () => {
      console.log('encData解壓縮完成');
      
    });
    // exec("unzip encData.zip",(error,stdout,stderr)=>{
    //   if (error) 
    //   {
    //     res.status(500).json({error:error.message});
    //     console.log(error.message);
    //   } else 
    //   {
    //     //res.status(200).json({message:"insert success"});
    //   }
    // });

    console.log("file success upload");
    if(selectedValue == "query")
    {
      res.send();
      
    }
    else if(selectedValue == "count")
    {
    }
    else
    {
      // exec("cd uploads/ && ./server -a",(error,stdout,stderr)=>{
      //   if (error) 
      //   {
      //     res.status(500).json({error:error.message});
      //     console.log(error.message);
      //   } else 
      //   {
      //     res.status(200).json({message:"insert success"});
      //   }
      // });
      res.send();
    }
  }catch(error){
    console.error(error);
  }
  console.log("prepare to query");
  /*exec("cd uploads/ && ./server -e",(error,stdout,stderr)=>{
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
  //});
 
  console.log("query success uploaded");
  //sudo LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./uploads/server -e
 });
  

  
//  app.post('/download', (req, res)=>{
//   let selectedValue = "query";
//   selectedValue = req.body.selected;
//   console.log(selectedValue);
//   if(selectedValue == "query")
//   {
//     let fileUrl1 = path.join(__dirname,'uploads', 'data.csv')
//     res.json({ fileUrl: 'fileUrl1' });
//   }
//   else if(selectedValue == "count")
//   {

//   }
//   else
//   {

//   }
//})


app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
