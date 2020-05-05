/*
 * @Author: your name
 * @Date: 2020-04-28 19:16:54
 * @LastEditTime: 2020-05-02 17:47:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \007\pages\index\index.js
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    playlist: [{
        id: 1,
        title: 'Take Me Hand',
        singer: 'DAISHI DANCE、Cecile Corbel',
        src: 'http://ycyang.cn/wxdev/mymusic/music/DAISHI DANCE、Cecile Corbel - Take Me Hand.mp3',
        coverImgUrl: 'http://ycyang.cn/wxdev/mymusic/images/bg-TakeMeHang.jpg'
      },
      {
        id: 2,
        title: '小小恋歌',
        singer: '高桥李依',
        src: 'http://ycyang.cn/wxdev/mymusic/music/小小恋歌.mp3',
        coverImgUrl: 'https://p3fx.kgimg.com/stdmusic/20180327/20180327115035567866.jpg'
      },
      {
        id: 3,
        title: '星空下的咖啡馆',
        singer: '潘佳杰',
        src: 'http://ycyang.cn/wxdev/mymusic/music/潘佳杰 - 星空下的咖啡馆 (钢琴曲).mp3',
        coverImgUrl: 'http://ycyang.cn/wxdev/mymusic/images/bg-星空下的咖啡馆.jpg'
      }, {
        id: 4,
        title: 'G.E.M.邓紫棋 - 画',
        singer: '邓紫棋',
        src: 'http://ycyang.cn/wxdev/mymusic/music/G.E.M.邓紫棋 - 画.mp3',
        coverImgUrl: 'http://ycyang.cn/wxdev/mymusic/images/bg-画.jpg'
      }
    ],
    state: 'paused',
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '123',
      singer: '12321',
      coverImgUrl: 'https://p3fx.kgimg.com/stdmusic/20180327/20180327115035567866.jpg'
    }
  },
  audioCtx: null,
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  changePage: function (e) {
    this.setData({
      item: e.target.dataset.page
    })
  },
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },
  sliderChange: function (e) {
    var second = e.detail.value * this.audioCtx.duration / 100
    console.log(second)
    this.audioCtx.seek(second)
    this.setData({
      'play.currentTime': this.formatTime(this.audioCtx.currentTime),
    })
  },
  // 格式化时间
  formatTime: function (time) {
    var minute = Math.floor(time / 60) % 60
    var second = Math.floor(time) % 60
    return (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
  },
  change: function (e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createInnerAudioContext();
    var that = this;
    this.audioCtx.onError(function () {
      console.log("播放失败: " + that.audioCtx.src)
    })
    // 播放完成自动下一曲
    this.audioCtx.onEnded(function () {
      that.next();
    })
    // 自动更新播放进度
    this.audioCtx.onTimeUpdate(function () {
      that.setData({
        'play.duration': that.formatTime(that.audioCtx.duration),
        'play.currentTime': that.formatTime(that.audioCtx.currentTime),
        'play.parcent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
    this.setMusic(0)
  },
  setMusic: function (index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
  },
  play: function () {
    this.audioCtx.play()
    this.setData({
      state: 'running'
    })
  },
  pause: function () {
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })

  },
  next: function () {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.setMusic(index)
    if (this.data.state === 'running') {
      this.play()
    }
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