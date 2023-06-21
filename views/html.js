window.addEventListener('load',()=>{
    let submitButton = document.getElementById("upload")
    submitButton.addEventListener('click', () => {
        let formData = new FormData(document.getElementById("form"));
        $.ajax({
            url:"/uploads",
            method:"post",
            contentType:false,
            processData:false,
            data:formData,
            success:function(res){
                alert("upload success");
            },
            error:function(res){
            }
        })
        
      });
})

    
