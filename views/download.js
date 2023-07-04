window.addEventListener('load',()=>{
    document.getElementById("myComboBox").addEventListener("change", () => {
    });
    let downloadButton = document.getElementById("downloadBtn");
    downloadButton.addEventListener('click', () => {
        let selected = document.getElementById("myComboBox").value;
        let formData1 = new FormData();
        formData1.append("selected",selected);
        $.ajax({
            url:"/download",
            method:"post",
            contentType:false,
            processData:false,
            data:formData1,
            success:function(res){   
              window.location.href = response.fileUrl;
            },
            error:function(xhr, status, error){
              let response = JSON.parse(xhr.responseText);
              console.log(response.error);
              alert(response.error);         
            }
        })
        
      });
})

    
