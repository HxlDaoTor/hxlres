import weCropper from '../../dist/weCropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight   //

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 320) / 2,
        y: (height - 160) / 2,
        width: 320,
        height: 160
      },
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
    console.log(this)
    console.log(112233)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {

     this.wecropper.getCropperImage((src) => {

      if (src) {
        console.log(src)        
        wx.redirectTo({
          url: '../initiate/initiate?cjurl=' + src,
          success: function () {
          }
        })
        
        wx.getImageInfo({
          src: src,
          success: function (res) {
            console.log(res)
            console.log('图片信息')
          }
        })

        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src] // 需要预览的图片http链接列表
        // })
        
      } else {

        wx.showToast({
          title: '微信版本不支持',
          icon: '',
          image: '../../resources/shibai.png',
          duration: 2000
        })
        wx.navigateBack({
          delta: 1
        })
        
        console.log('获取截图地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {  //取消

    // const self = this
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success(res) {
    //     const src = res.tempFilePaths[0]
    //     //  获取裁剪图片资源后，给data添加src属性及其值
    //     console.log(src)
    //     self.wecropper.pushOrign(src)
    //   }
    // })

    wx.navigateBack({
      delta: 1
    })
  },
  onLoad(option) {

    var src;
    if (option.imgurl){
        src = option.imgurl;
        console.log(option.imgurl)

    }else{
        wx.showToast({
          title: '获取相册图片地址失败',
          icon: 'loading',
          duration: 20000
        })
        wx.navigateBack({
          delta: 1
        })
        console.log('获取相册图片地址失败')
    }
    
  
    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .pushOrign(src)  //图片上传画布
      // .updateCanvas()
  },
  onShow: function () {
    // console.log(this.wecropper)
    // console.log('22222222')
    // var src = this.data.src
    // this.wecropper.pushOrign(src)
  },
})
