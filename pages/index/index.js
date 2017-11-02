//index.js
//获取应用实例
var common = require('../../common.js');
var app = getApp();
modules: [];//模板
var sign = wx.getStorageSync('sign');
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
    content:[],
    type : 'img'
  },
  //事件处理函数
  tapKeyWorld:function(e){
    var sign = wx.getStorageSync('sign');
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
      //
      url: "https://what-test.playonwechat.com/rush/get-images?sign=" + sign + '&operator_id=' + app.data.kid,
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
      tabList: tabList,
      type: type
    })
    wx.hideLoading()
  },
  onLoad: function () {
    var that = this;
    var sign = wx.getStorageSync('sign');
    that.setData({
      sign: sign
    })
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
      console.log('commonsign:', sign);
      that.setData({
        sign: sign
      })
    })
    
  },
  // 显示数据
  onShow: function () {
    var sign = wx.getStorageSync('sign');
    console.log("sign:",sign);
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    // 列表
    common.getSign(function () {
       var sign = wx.getStorageSync("sign");
        wx.request({
          //?sign=" + that.data.sign + '&operator_id=' + that.data.operator_id,
          url: "https://what-test.playonwechat.com/rush/get-images?sign=" + sign + '&operator_id=' + app.data.kid,
          data: {
            type: that.data.type
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
        wx.hideLoading()
    })
    
  },

  
    //设置分享
  onShareAppMessage: function (e) {
    console.log(e);
    var that = this;
    var type = e.target.dataset.type;
    var gid  = e.target.dataset.gid;
    var title = e.target.dataset.title;
    var image = e.target.dataset.image;
    if (type == 'spoof') {
        return {
          title: title,
          imageUrl: image,
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
