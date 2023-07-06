window.addEventListener('load',()=>{
    document.getElementById("myComboBox").addEventListener("change", () => {
      });
    let submitButton = document.getElementById("upload");
    let downloadButton = document.getElementById("downloadBtn");
    submitButton.disabled = true;
    downloadButton.disabled = true;
    submitButton.addEventListener('click', () => {
        let selectedValue = document.getElementById("myComboBox").value;
        let downloadBtn = document.getElementById("downloadBtn")
        let formData = new FormData(document.getElementById("form"));
        formData.append("select",selectedValue);
        $.ajax({
            url:"/uploads",
            method:"post",
            contentType:false,
            processData:false,
            data:formData,
            success:function(res){
              alert(res.message);
              downloadBtn.disabled = false;
              if(selectedValue == "insert")
              {
                downloadBtn.disabled = true;
              }
             
            },
            error:function(xhr, status, error){
              let response = JSON.parse(xhr.responseText);
              alert(response.error);
              downloadBtn.disabled = true;
            }
        })
        
      });
      
      // downloadButton.addEventListener('click', () => {
      //     let selected = document.getElementById("myComboBox").value;
      //     let formData1 = new FormData();
      //     formData1.append("selected",selected);
      //     $.ajax({
      //         url:"/download",
      //         method:"post",
      //         contentType:false,
      //         processData:false,
      //         data:formData1,
      //         success:function(res){   
      //           window.location.href = response.fileUrl;
      //         },
      //         error:function(xhr, status, error){
      //           let response = JSON.parse(xhr.responseText);
      //           console.log(response.error);
      //           alert(response.error);         
      //         }
      //     })
          
      //   });
})

    
