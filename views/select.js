window.addEventListener('load',()=>{
    var comboBox = document.getElementById('myComboBox');

    comboBox.addEventListener('change', function() {
      var selectedValue = comboBox.value;

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/your-endpoint', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(xhr.responseText); // 打印从Node.js服务器返回的数据
        }
      };
      xhr.send('value=' + encodeURIComponent(selectedValue));
    });
})