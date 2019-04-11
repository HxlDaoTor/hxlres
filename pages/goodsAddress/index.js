// pages/goodsAddress/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpenSet:false,
    addressTxt:'',
    isChange:false            //是否改变了旧地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showModal({

    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  closePoup:function(){
    this.setData({
      isOpenSet:false
    })
  },
  settCallback:function(e){
    this.setData({
      isOpenSet: false
    })
  },
  /**
   * 保存地址
   */
  saveAddress:function(){
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var site = this.data.addressTxt;
    var isChange = this.data.isChange;
    if (site === ''){
      wx.showToast({   //无图标弹窗
        title: '收货地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!isChange){
      wx.showToast({   
        title: '请选择收货地址',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: index_url + '/itemsapp/get_site',
      method: 'POST',
      data: {
        site: site
      },
      header: {
        'content-type': 'application/json',// 默认值
        'openid': openid
      },
      success: function (res) { 
          //  console.log(res)
          wx.navigateBack({  //返回上一页
            delta: 1
          })
      }
      
    })
  },
  writeAddress:function(){
    var that = this;
    wx.authorize({
      scope: 'scope.address',
      success() {
        // 用户已经同意小程序使用通讯地址功能，后续调用 wx.chooseAddress 接口不会弹窗询问
        wx.chooseAddress({
          success(res) {
          //  console.log(res)
            that.setData({
              addressTxt: res.userName + '，' + res.telNumber + '，' + res.provinceName + res.cityName + res.countyName + res.detailInfo,
              isChange:true
            })
          }
        })
      },
      fail(e) {
     //   console.log('调用失败' + e)
        that.setData({
          isOpenSet: true
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