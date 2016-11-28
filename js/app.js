var apiURL = 'http://localhost:8080/job/Controller_pipeline/build'
var app = new Vue({
    el: '#app',
    data: {
      btnText: 'Success',
      isSuccess: true,
      isRunning: false,
      isFailed: false
    },
    methods: {
      reboot: function (changeToSuccess, changeToFail) {
        this.changeToRunning();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4 ){
           if(xhr.status == 200){
              //console.log(JSON.parse(xhr.responseText).title);
              changeToSuccess();
            } else {
              changeToFail();
            }
          }
        };
        xhr.onerror = function (e) {
          changeToFail();
        };
        xhr.open('POST', apiURL);
        xhr.send();
      },
      changeToSuccess: function() {
        this.isSuccess = true;
        this.isFailed = false;
        this.isRunning = false;
        this.btnText = 'Success';
      },
      changeToRunning: function() {
        this.isSuccess = false;
        this.isFailed = false;
        this.isRunning = true;
        this.btnText = 'Running';
      },
      changeToFail: function() {
        this.isSuccess = false;
        this.isFailed = true;
        this.isRunning = false;
        this.btnText = 'Failed';
      }
    }
})
