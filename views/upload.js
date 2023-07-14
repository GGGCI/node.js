

window.addEventListener('load',()=>{
    document.getElementById("myComboBox").addEventListener("change", () => {
      });

    let selected = document.getElementById("myComboBox");
    selected.selectedIndex = 0;
    let submitButton = document.getElementById("upload");
    let downloadButton = document.getElementById("downloadBtn");
    submitButton.disabled = true;
    downloadButton.disabled = true;
    submitButton.addEventListener('click', () => {
        let selectedValue = document.getElementById("myComboBox").value;
        let downloadBtn = document.getElementById("downloadBtn")
        let downloadBtn1 = document.getElementById("downloadBtn1")
        let fileInput3 = document.getElementById("fileInput3");
        let is_fileinput3 = false;
        if(fileInput3.files.length > 0)
        {
          is_fileinput3 = true;
        }
        else
        {
          is_fileinput3 = false;
        }
        console.log(is_fileinput3);
        let formData = new FormData(document.getElementById("form"));
        formData.append("select",selectedValue);
        formData.append("is_fileinput3",is_fileinput3);
        $.ajax({
            url:"/uploads",
            method:"post",
            contentType:false,
            processData:false,
            data:formData,
            success:function(res){
              alert(res.message);
              downloadBtn.disabled = false;
              downloadBtn1.disabled = false;
              if(selectedValue != "query")
              {
                downloadBtn1.disabled = true;
              }
              if(selectedValue == "insert")
              {
                downloadBtn.disabled = true;
                downloadBtn1.disabled = true;
              }
              
            },
            error:function(xhr, status, error){
              let response = JSON.parse(xhr.responseText);
              console.log(xhr.responseText);
              alert(response.error);
              downloadBtn.disabled = true;
            }
        })
        
      });
})

    
