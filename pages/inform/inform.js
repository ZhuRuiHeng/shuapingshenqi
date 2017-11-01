// pages/inform/inform.js
var common = require('../../common.js');
var app = getApp();
var sign = wx.getStorageSync('sign');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      id: options.id,
      type: options.type
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    // common.getSign(function () {
        var sign = wx.getStorageSync('sign');
        var that = this;
        var id = that.data.id;
        
        // 列表
        wx.request({
          url: "http://what-test.playonwechat.com/rush/get-image-detail?sign=" + sign + '&operator_id=' + app.data.kid,
          data:{
              id:id
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log(res);
            console.log(res.data.data);
            that.setData({
              content: res.data.data
            })
          }
        })
        wx.hideLoading()
    // })
  },
  back:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.data.content.title,
      imageUrl: that.data.content.image,
      path: '/pages/inform/inform?id=' + that.data.id,
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  },
  
})