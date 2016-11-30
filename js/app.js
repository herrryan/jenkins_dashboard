var apiURL = 'http://192.168.10.224:8080/job/Controller_pipeline/build'
var statusURL = 'http://192.168.10.224:8080/job/Controller_pipeline/lastBuild/api/json'
var app = new Vue({
    el: '#app',
    data: {
      btnText: 'Success',
      isSuccess: true,
      isRunning: false,
      isFailed: false
    },
    methods: {
      reboot: function () {
        this.changeToRunning();
        this.$http.post(apiURL, function () {
            var status = this.checkStatus();
            if (status != null) {
              this.changeToSuccess();
            }
        }).error(function (data, status, request) {
            this.changeToFail();
        })
      },
      checkStatus: function() {
        this.$http.get(statusURL, function (response) {
            console.log(response['result'])
        }).error(function (data, status, request) {
            this.changeToFail();
        })
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
