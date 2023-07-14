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
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);


//const { exec, spawn, execSync } = require("child_process");

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
app.use(express.static('views'));
app.get('', (req, res) =>{
  res.sendFile(path.join(__dirname,'views','TTC.html'));
});

app.post('/uploads', upload.fields([{name:"CC"},{name:'key'},{name:"encData.zip"},{name:"cts.zip"}]), async (req, res) => {
  try{
    const uploadedFiles = req.files.CC;
    const key = req.files.key;
    const encData = req.files["encData.zip"];
    const cts = req.files["cts.zip"]; 

    let selectedValue = "query";
    selectedValue = req.body.select;
    is_fileinput3 = req.body.is_fileinput3;
    console.log(is_fileinput3);
    if(is_fileinput3 == "true")
    {
      const { stdout, stderr } = await exec("cd uploads/ && rm -rf encData");
      console.log('stdout:', stdout);
      console.error('encData:', stderr);
      const { stdout1, stderr1 } = await exec("cd uploads/ && unzip encData.zip");
      console.log('stdout:', stdout1);
      console.error('encData.zip:', stderr1);
    }
    console.log('CC message:',uploadedFiles);
    console.log('key:',key);
    console.log('encData:',encData);
    console.log('cts:',cts);

    console.log("file success upload");
    if(selectedValue == "query")
    {
      const { stdout:stdout, stderr:stderr, error: error } = await exec("cd uploads/ && rm -rf queryData && rm -rf queryData.zip && rm -rf cts");
      //console.log('stdout:', stdout);
      console.error('query_output:', stderr);
      const { stdout:stdout1, stderr:stderr1, error: error1 } = await exec("cd uploads/ && ./server -q");
      console.log('stdout:', stdout1);
      console.error('encData:', stderr1);
      if (error1) 
      {
        res.status(500).json({error:error.message});
        console.log(error.message);
      } 
      else 
      {
        res.status(200).json({message:"query success"});
        const { stdout:stdout2, stderr:stderr2, error: error2 } = await exec("cd uploads/ && zip queryData queryData/*");
        //console.log('stdout:', stdout2);
        console.error('zip:', stderr2);
      }
    }
    else if(selectedValue == "count")
    {
      const { stdout:stdout, stderr:stderr, error: error } = await exec("cd uploads/ && rm -rf countResult.zip && rm -rf countResult && rm -rf cts");
      //console.log('stdout:', stdout);
      console.error('count_output:', stderr);
      const { stdout:stdout1, stderr:stderr1, error: error1 } = await exec("cd uploads/ && ./server -c");
      console.log('stdout:', stdout1);
      console.error('count:', stderr1);
      if (error1) 
      {
        res.status(500).json({error:error.message});
        console.log(error.message);
      } else 
      {
        res.status(200).json({message:"count success"});
      }
    }
    else
    {
      const { stdout:stdout, stderr:stderr, error: error } = await exec("cd uploads/ && rm -rf insert && rm -rf encData.zip");
      //console.log('stdout:', stdout);
      console.error('insert_output:', stderr);
      const { stdout:stdout1, stderr:stderr1, error: error1 } = await exec("cd uploads/ && ./server -a");
      console.log('stdout:', stdout1);
      console.error('insert:', stderr1);
      if (error1) 
      {
        res.status(500).json({error:error.message});
        console.log(error.message);
      } else 
      {
        res.status(200).json({message:"insert success"});
      }
    }
  }catch(error){
    console.error(error);
  }
  console.log("prepare to query"); 
  console.log("query success uploaded");
  //sudo LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/llvm-14/lib/ ./uploads/server -e
 });
  
app.get('/downloadquery', (req, res)=>{
  res.download(path.join(__dirname,'uploads', 'queryData.zip'))
})
app.get('/downloadcount', (req, res)=>{
  res.download(path.join(__dirname,'uploads', 'countResult.zip'))
})

app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
app.on("error",function(e){
  console.log(e);
})
