const app = getApp()
let   isShowOnload = true         //onshow 开关
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfarelist:[],            //每日福利列表
    _welfarelist:[] ,       //自助福利列表
    luckyAmount:0  ,
    loadIsShow:true,
    is_qiandao:1 ,               //默认未签到
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({});
    var that = this;
    var openid;
    var index_url = app.globalData.url_a;
    isShowOnload = false;
    if ( app.globalData.openId ){     //如果openid已拿到
        openid = app.globalData.openId;
        wx.request({
          url: index_url + '/itemsapp/show_luckydraw_index',
          header: {
            'content-type': 'application/json',// 默认值
            'openid': openid
          },
          success: function (res) {

           console.log(res)
            if (res.data.statuscode) {
              that.setData({             //获取列表
                welfarelist: res.data.data,
                _welfarelist: res.data.little_data,
                luckyAmount: res.data.lucky_amount,
                is_qiandao: res.data.is_qiandao,
                loadIsShow: false
              })
            }

          }
        })       
    } else if (wx.getStorageSync('openId')){  //看缓存里面有没有
        openid = wx.getStorageSync('openId');   
        wx.request({
          url: index_url + '/itemsapp/show_luckydraw_index',
          header: {
            'content-type': 'application/json',// 默认值
            'openid': openid
          },
          success: function (res) {

           console.log(res)
            if (res.data.statuscode) {
              that.setData({             //获取列表
                welfarelist: res.data.data,
                _welfarelist: res.data.little_data,
                luckyAmount: res.data.lucky_amount,
                is_qiandao: res.data.is_qiandao,
                loadIsShow: false
              })
            }

          }
        }) 
       // console.log('openid没拿到')
      //   console.log(openid)

    }else{

          wx.login({   
            success: function (resss) {
              if (resss.code){
                    wx.request({         //登陆获取openid
                      url: index_url + '/itemsapp/get_openid',
                      method: 'POST',
                      data: {
                        code: resss.code,
                        wxnick: "",
                        head_img: "",
                        site: ""
                      },
                      header: {
                        'content-type': 'application/json',
                        'openid': ''
                      },
                      success: function (ress) {
                        openid = ress.data.openid;
                        wx.request({
                          url: index_url + '/itemsapp/show_luckydraw_index',
                          header: {
                            'content-type': 'application/json',// 默认值
                            'openid': openid
                          },
                          success: function (res) {

                             console.log(res)
                            if (res.data.statuscode){
                                that.setData({             //获取列表
                                  welfarelist: res.data.data,
                                  _welfarelist: res.data.little_data,
                                  luckyAmount: res.data.lucky_amount,
                                  is_qiandao: res.data.is_qiandao,
                                  loadIsShow: false
                                })
                            }
                          }
                        })
                      }

                    })
              }
            }

          })


    }


  },
  switchPag:function(){
    wx.navigateTo({ url:'../initiate/initiate' })
  },
  tiaoshi: function () {  //调试
    wx.navigateTo({ url: '../confirmTask/index' })
  },
  signIn:function(){
    var isqiandao = this.data.is_qiandao;
    wx.navigateTo({ url: '../luckCenter/index?frm_qiandao=' + isqiandao })
  },
  exchangeMall:function(){
    wx.navigateTo({ url: '../luckCenter/index?frm_qiandao=0' })   
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
    wx.hideTabBar({});
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var that = this;
    if (isShowOnload){
      wx.request({
        url: index_url + '/itemsapp/show_luckydraw_index',
        header: {
          'content-type': 'application/json',// 默认值
          'openid': openid
        },
        success: function (res) {

          console.log(res)
          if (res.data.statuscode) {
            that.setData({             //获取列表
              welfarelist: res.data.data,
              _welfarelist: res.data.little_data,
              luckyAmount: res.data.lucky_amount,
              is_qiandao: res.data.is_qiandao,

              // loadIsShow: false
            })
          }

        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    isShowOnload = true
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
    var openid = app.globalData.openId;
    var title = '一秒参与抽奖，免费商品带回家,百鱼抽奖，海量商品免费送';
    var imageUrl = 'https://i.loli.net/2019/04/03/5ca4450284dd4.png';
    return {
      title: title,
      path: '/pages/index/index', // '/pages/index/index?share_id=' + openid
      imageUrl: imageUrl
    }
   
  }
})
