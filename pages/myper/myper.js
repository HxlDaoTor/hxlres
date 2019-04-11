const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:'',
    nickName:'',
    participateNum:0,   
    initiateNum:0,     
    winnNum:0 ,
    luckyNum:0,
    isOpenSet:false    //设置授权弹窗

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    wx.request({
      url: index_url + '/itemsapp/show_user_particulars',
      method: 'POST',
      data:{},
      header: {
        'content-type': 'application/json',// 默认值
        'openid': openid
      },
      success: function (res) {
        console.log(res)
          var data ={
                headImg: res.data.hea_img,
                nickName: res.data.wxnick,
                participateNum: res.data.participation_lucky_draw_count,
                initiateNum: res.data.sponsor_lucky_draw_count,
                winnNum: res.data.bingo_lucky_draw_count,
                luckyNum: res.data.Lucky_count            
              };
          that.setData(data)
      }
    })

  },
  luckNum:function(e){
    console.log(e.currentTarget.dataset.key) //0参与抽奖  1发起抽奖 2中奖纪录
    var code = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../luckList/index?code=' + code
    })
  },
  /**
   * 同步微信资料
   */
  onGotUserInfo:function(ev){
    var that = this;
    var index_url = app.globalData.url_a;
    var openid = app.globalData.openId;
    var nickName='';
    var avatarUrl='';
    console.log(ev)
    if (ev.detail.userInfo) {
      nickName = ev.detail.userInfo.nickName;
      avatarUrl = ev.detail.userInfo.avatarUrl;
    } 

    wx.getSetting({  //检查是否授权
      success(res) {
        if (res.authSetting['scope.userInfo']) {  //已授权
          wx.showToast({   //无图标弹窗
            title: '需要一点点时间，请稍后',
            icon: 'none',
            duration: 2000
          })
          wx.request({                      //提交头像昵称
            url: index_url + '/itemsapp/get_headportrait',
            method: 'POST',
            data: {
              wxnick: nickName,
              head_img: avatarUrl
            },
            header: {
              'content-type': 'application/json',
              'openid': openid
            },
            success: function (ress) {
              //console.log(ress)
              wx.showToast({   //无图标弹窗
                title: '同步成功',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                headImg: avatarUrl,
                nickName: nickName
              })
              app.globalData.isUserInfo = 1;  //更改全局是否有头像数据 已有
            }
          }) 
        }
      }
    })    
  },
  closePoup: function () {
    this.setData({
      isOpenSet: false
    })
  },
  settCallback: function (e) {
    this.setData({
      isOpenSet: false
    })
  },
  //同步收货地址
  writeAddress: function () {
    var that = this;
    var index_url = app.globalData.url_a;
    var openid = app.globalData.openId;
    wx.authorize({
      scope: 'scope.address',
      success() {
        // 用户已经同意小程序使用通讯地址功能，后续调用 wx.chooseAddress 接口不会弹窗询问
        wx.chooseAddress({
          success(res) {
           var addressTxt = res.userName + ',' + res.telNumber + ',' + res.provinceName + res.cityName + res.countyName + res.detailInfo;
            wx.request({
              url: index_url + '/itemsapp/get_site',
              method: 'POST',
              data: {
                site: addressTxt
              },
              header: {
                'content-type': 'application/json',// 默认值
                'openid': openid
              },
              success: function (res) {
                  console.log(res)
                wx.navigateBack({  //返回上一页
                  delta: 1
                })
              }

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