//app.js
App({
  onLaunch: function (options) {
    this.checkNewVersion()
    wx.hideTabBar({});
    var that = this;
    // console.log(options)
    // console.log('fffffffff')
    var arr = ['https://liao.koo4.cn', 'https://liao.koo4.cn', 'https://liao.koo4.cn'];
    var index = Math.floor((Math.random() * arr.length));  //随机数
    var index_url = arr[index];  //随机url
    if (options.query.share_id) {   //转发过来的id
      this.globalData.shareId = options.query.share_id;
    }
    wx.login({   //登录注册
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log('code:' + res.code)
          wx.request({
            url: index_url +'/itemsapp/get_openid',
            method:'POST',
            data: {
              code: res.code,
              fenxiang_openid: that.globalData.shareId
            },
            header: {
              'content-type': 'application/json' ,// 默认值
              'openid':''
            },
            success: function (ress) {     
              console.log(ress)
              that.globalData.isUserInfo = ress.data.userinfo;  //是否有头像
              that.globalData.openId = ress.data.openid;
              wx.setStorageSync("openId", ress.data.openid)
            },
            fail:function(err){
              console.log(err)
            }
          })

        } else {
            console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });


  },

  //小程序从后台进入前台
  onShow: function (options) {
    wx.hideTabBar({});
  },
  //监听小程序隐藏的时候
  onHide: function () {

  },
  //检查版本更新
  checkNewVersion:function(){

    if (wx.canIUse("getUpdateManager")) {            // 获取小程序更新机制兼容
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
            });
          });
        }
      });
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }

  },
   // 自定义函数 获取用户信息
  getUserInfo: function (cb) { 
    var that = this
    for (var i in this) {
      console.log(i)
    }
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else { 
      wx.login({
        success: function (e) {
          //  console.log(e)
          wx.getUserInfo({
            success: function (res) {
              // console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {       //自定义对象  
    isUserInfo: null,  //是否授权过用户信息 1 是 0 否
    openId:null,      //
    shareId:'',     //转发过来的id
    url_a:'https://liao.koo4.cn', //随机服务器地址1
    url_b: 'https://liao.koo4.cn', //随机服务器地址2   https://liao.koo4.cn
    url_c: 'https://liao.koo4.cn' //二维码固定地址  https://liao.koo4.cn
  }
})