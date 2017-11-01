//app.js
App({
  data: {
    loginData: null,
    sign: "",
    mobile: "",
    wx_name: "",
    mid: "",
    sharecode: "",
    authStatic: false,
    loginStatic: false,
    authSuccess: false,
    kid: ''
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    that.data.kid = extConfig.kid;
    console.log(extConfig);
    that.data.kid = 188; 
    wx.setStorageSync('kid', that.data.kid); //that.data.kid
    // 登录
    wx.login({
      success: function (res) {
        console.log(res);
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //发起网络请求
        if (res.code) {
          wx.request({
            url: 'http://what-test.playonwechat.com/api/auth-by-three?code=' + res.code + '&operator_id=' + that.data.kid,
            method: 'GET',
            success: function (res) {
              console.log(res);
              console.log(res.data.data.sign);
              that.data.sign = res.data.data.sign;
              that.data.mid = res.data.data.mid;
              try {
                wx.setStorageSync('mid', res.data.data.mid);
                wx.setStorageSync('sign', res.data.data.sign);
                that.data.mid = res.data.data.mid;
                wx.getUserInfo({
                  success: function (res) {
                    // 保存用户信息
                    wx.request({
                      url: 'http://what-test.playonwechat.com/api/save-user-info?sign=' + that.data.sign + '&operator_id=' + that.data.kid,
                      method: 'POST',
                      success: function (res) {
                        console.log(res);

                        setTimeout(function () {
                          wx.hideLoading()
                        }, 500)
                      }
                    })
                  },
                  fail: function () {
                    console.log("用户拒绝授权");
                    wx.showModal({
                      title: '警告',
                      content: '您点击了拒绝授权，将无法正常使用体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定');
                        }
                      }
                    })
                    wx.openSetting({
                      success: (res) => {
                        console.log(res);
                      }
                    })
                  },
                })
              } catch (e) {
                console.log("回话异常：" + e);
              }
            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})