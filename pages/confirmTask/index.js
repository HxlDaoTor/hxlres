// pages/confirmTask/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     subData:{},
    isSuccessful:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.subData){
      var data = JSON.parse(options.subData)
      console.log(data)
       this.setData({
         subData: data
       })

    }
  },
/**
 * 提交表单
 */
subFormData:function(e){
  console.log(e)
  var that = this;
  var openid = app.globalData.openId;
  var index_url = app.globalData.url_a;
  var data = this.data.subData; 
  var objArr = Object.keys(data) ;  // 将对象转换为数组 判断对象是否为空
 // console.log(objArr)
  if (objArr.length > 0){
          wx.showLoading({
            title: '提交中...',
            mask: true
          })
          wx.request({
            url: index_url + '/itemsapp/sponsor_luckydraw_task',
            method: 'POST',
            data: data,
            header: {
              'content-type': 'application/json',// 默认值
              'openid': openid
            },
            success: function (ress) {
              wx.hideLoading()
              console.log(ress)
              var relea_id = ress.data.relea_id;
              if (ress.data.statuscode === 200){
                // wx.redirectTo({
                //   url: '../homDetails/index?relea_id=' + relea_id
                // })
                that.setData({
                  isSuccessful:true
                })
              }

            }
          })
  }
},
  closePop:function(){
    // this.setData({
    //   isSuccessful:false
    // })
    wx.redirectTo({
      url: '../luckList/index?code=2'
    })

  },
  callBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  copyContxt:function(){
    var copyTxt = 'yizhuan188';
    wx.setClipboardData({
      data: copyTxt,
      success(res) {
        wx.showToast({   //无图标弹窗
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
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

  }
})