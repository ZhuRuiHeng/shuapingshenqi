//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabList:[
      {
        text: "图片",
        icon: "0",
        active: true,
        type:'img'
      },
      {
        text: "文字",
        icon: "1",
        active: false,
        type: 'text'
      },
      {
        text: "恶搞",
        icon: "2",
        active: false,
        type:'spoof'
      }
    ],
    content:[]
  },
  //事件处理函数
  tapKeyWorld:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var type = e.currentTarget.dataset.type;
    //console.log(type);
    var current = e.currentTarget.dataset.current;
    var active1 = e.currentTarget.dataset.active;         // 获取当前商品的选中状态
    var tabList = that.data.tabList;
    for (var j = 0; j < tabList.length; j++) {
        tabList[j].active = false;;
        if (current == tabList[j].icon) {
          tabList[j].active = true;
        }
    }
    wx.request({
      //?sign=" + that.data.sign + '&operator_id=' + that.data.operator_id,
      url: "http://what-test.playonwechat.com/rush/get-images?sign=1ba9e27ead62643818245316f4fb5530&operator_id=190",
      data:{
        type: type
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          content: res.data.data,
        })
      }
    })
    that.setData({
      tabList: tabList
    })
    wx.hideLoading()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 显示数据
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    // 列表
    wx.request({
      //?sign=" + that.data.sign + '&operator_id=' + that.data.operator_id,
      url: "http://what-test.playonwechat.com/rush/get-images?sign=1ba9e27ead62643818245316f4fb5530&operator_id=190",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          content: res.data.data,
        })
      }
    })
    wx.hideLoading()
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
    //设置分享
  onShareAppMessage: function (e) {
    console.log(e);
    var that = this;
    var type = e.target.dataset.type;
    var gid = e.target.dataset.gid;
    console.log(type);
    if (type == 'spoof') {
        return {
          title: '刷屏神器',
          path: '/pages/inform/inform?id=' + gid,
          success: function (res) {
            console.log(res);
            // 转发成功
          },
          fail: function (res) {
            console.log(res);
            // 转发失败
          }
        }
    }else{
      return {
        title: '刷屏神器',
        path: '/pages/index/index',
        success: function (res) {
          console.log(res);
          // 转发成功
        },
        fail: function (res) {
          console.log(res);
          // 转发失败
        }
      }
    }
   
  }
})
