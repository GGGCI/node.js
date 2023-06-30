window.addEventListener('load',()=>{
    document.getElementById("myComboBox").addEventListener("change", () => {
      });
    let submitButton = document.getElementById("upload");
    submitButton.addEventListener('click', () => {
        let selectedValue = document.getElementById("myComboBox").value;
        let formData = new FormData(document.getElementById("form"));
        formData.append("select",selectedValue);
        $.ajax({
            url:"/uploads",
            method:"post",
            contentType:false,
            processData:false,
            data:formData,
            success:function(res){
                alert("upload success");
                alert(selectedValue);
            },
            error:function(res){
            }
        })
        
      });
})

    
