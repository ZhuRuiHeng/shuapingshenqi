// pages/star/star.js
var common = require('../../common.js');
var app = getApp();
modules: [];//模板
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //回调
    var that = this;
    // that.setData({
    //   sign: common.getSign
    // })
    console.log('commonsign:', that.data.sign);
    common.getSign(function () {
      let sign = wx.getStorageSync('sign');
      console.log('commonsign:', sign);
      that.setData({
        sign: sign
      })
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '../index/index',
      })
    }, 2500)
  },


  onReady: function () {
    
  },

  
  
  
  onShow: function () {
   
  },

})