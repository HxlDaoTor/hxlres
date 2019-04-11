// pages/exchangeGoods/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuccessful:false,    //弹窗
    isOpenSet:false,    //授权地址弹窗
    addressTxt:'',
    detailedData:{},
    goods_id:null,
    luckIcon:0           //幸运币
  },
  closePop:function(){
    this.setData({
      isSuccessful:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;

    if (options.goodsId){
          wx.request({
            url: index_url + '/lucky_coin/goods_particulars',
            method: 'POST',
            data: {
              goods_id: options.goodsId
            },
            header: {
              'content-type': 'application/json',// 默认值
              'openid': openid
            },
            success: function (res) {
              console.log(res)
              that.setData({
                detailedData:res.data,
                goods_id: options.goodsId,    //保存商品id
                luckIcon: res.data.lucky_amount
              })
            }
          })
    }

  },
  /**
   * 立即兑换
   */
  goExchange:function(){
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var site = this.data.addressTxt;
    var goods_id = this.data.goods_id;
    var lucky_amount = this.data.detailedData.lucky_amount;  //我的幸运币
    var conversion_luckycoin = this.data.detailedData.conversion_luckycoin;   //兑换商品所需幸运币
    if (lucky_amount >= conversion_luckycoin){
      if (site == ''){
          wx.showToast({   //无图标弹窗
            title: '请填写收货地址',
            icon: 'none',
            duration: 2000
          })          
        }else{
            wx.showLoading({
              title: '请稍后',
              mask: true
            })
            wx.request({
              url: index_url + '/lucky_coin/lucky_coin_use',
              method: 'POST',
              data: {
                goods_id: goods_id,
                site: site
              },
              header: {
                'content-type': 'application/json',// 默认值
                'openid': openid
              },
              success: function (res) {
                console.log(res)
                wx.hideLoading()
                if (res.data.statuscode === 200){
                  that.setData({
                    isSuccessful:true,
                    luckIcon: res.data.lucky_amount
                  })
                }

              }
            })
        }

    }else{
      wx.showToast({   //无图标弹窗
        title: '幸运币不足',
        icon: 'none',
        duration: 2000
      })      
    }
    
  },
 /**
  * 获取地址

  */
  writeAddress: function () {
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
   * 成功后跳转
   * 
   */
  jumpLuckHome:function(){   
    wx.redirectTo({
      url: '../luckCenter/index?frm_qiandao=0'
    })
    wx.navigateBack({  //返回上一页
      delta: 1
    })
  },
  settCallback: function (e) {
    this.setData({
      isOpenSet: false
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