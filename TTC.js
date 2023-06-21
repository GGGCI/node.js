const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const path = require("path");

const port = 3000;
const ip = "127.0.0.1";
const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');

const { exec, spawn } = require("child_process");

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/your-endpoint', (req, res) => {
  const selectedValue = req.body.value;

  // 在这里处理ComboBox的值
  console.log(selectedValue);

  // 做其他操作...

  // 返回响应给前端
  res.send('Received the value: ' + selectedValue);
});
/*
app.get('/', (req, res) => {
  // 根据需要确定是否禁用<select>元素
  const isDisabled_CC = true;
  const isDisabled_key = true;
  const isDisabled_cts = true;
  const isDisabled_encData = true;
  // 渲染模板，并传递禁用状态给模板
  res.render('TTC', { isDisabled_CC ,isDisabled_cts,isDisabled_encData,isDisabled_key});
});
app.post('/your-endpoint', (req, res) => {
  const selectOption = req.body.value;
  console.log(selectOption);
  app.get('/', (req, res) => {
  const isDisabled_CC = true;
  const isDisabled_key = true;
  const isDisabled_cts = true;
  const isDisabled_encData = true;
  if(selectOption == "query")
  {
    isDisabled_CC = false;
    isDisabled_encData = false;
  }
  // 渲染模板，并传递禁用状态给模板
  res.render('TTC', { isDisabled_CC ,isDisabled_cts,isDisabled_encData,isDisabled_key});
  });
  
});*/
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

app.post('/uploads', upload.fields([{name:'key'},{name:"CC"},{name:"cts"},{name:"encData"}]), (req, res) => {
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
  exec("cd uploads/ && ./server -e",(error,stdout,stderr)=>{
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
