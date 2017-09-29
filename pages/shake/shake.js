const config = require('../../comm/script/config');
const douban = require('../../comm/script/fetch');
//首先定义一下，全局变量
let lastTime = 0; //此变量用来记录上次摇动的时间
let x = 0,
    y = 0,
    z = 0,
    lastX = 0,
    lastY = 0,
    lastZ = 0; //此组变量分别记录对应x、y、z三轴的数值和上次的数值
const shakeSpeed = 200; //设置阈值
Page({
    data: {
        res: '',
        x: 0,
        y: 0,
        z: 0,
        films: [], // 全部电影列表
        film: [], // 摇中的电影
        showFilm: false, // 是否显示摇中的
        loaded: false, //数据是否载入完成，没有完成不可以摇
        shakeSoundUrl: config.shakeSound.startUrl,
        shakeCompleteSoundUrl: config.shakeSound.completeUrl,
        shakeWelcomeImg: config.shakeWelcomeImg,
        hasMore: true,
        debug: false //显示debug数据
    },
    onLoad() {
        wx.getStorage({
            key: 'shakeFilmList',
            success: res => {
                if (res.data.length == 0) {
                    // 如果缓存内无数据，则请求数据
                    this.getData();
                } else {
                    // 如果缓存内有数据，则获取数据
                    this.setData({
                        films: res.data,
                        loaded: true
                    })
                }
                this.shake() //开启监听重力感应
            },
            fail: res => {
                console.log(res);
            }
        })
    },
    shake() {
        this.shakeSound = wx.createAudioContext('shakeSound');
        this.shakeCompleteSound = wx.createAudioContext('shakeCompleteSound');
        let flag = true;
        if (flag) {
            flag = false;
            wx.onAccelerometerChange(res => {
                this.setData({
                    x: res.x,
                    y: res.y,
                    z: res.z
                });
                x = res.x;
                y = res.y;
                z = res.z;
                if (Math.abs(x - lastX) >= 2 || Math.abs(y - lastY) >= 2 || Math.abs(z - lastZ) >= 2) {
                    if (this.data.loaded) {
                        this.getFilm();
                    }
                }
                lastX = x;
                lastY = y;
                lastZ = z;
                setTimeout(() => {
                    flag = true;
                }, 5000);
                // const curTime = new Date().getTime();
                // if ((curTime - lastTime) > 100) {
                    // const diffTime = curTime - lastTime;
                    // lastTime = curTime;
                    // x = res.x;
                    // y = res.y;
                    // z = res.z;
                    // 计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
                    // const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
                    // if (speed > shakeSpeed) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
                        // 判断数据是否载入和是否在允许的时间（5秒每次间隔）
                        // if (this.data.loaded) {
                            // this.shakeSound.play();
                            // 随机获取电影
                            // this.getFilm();
                            // setTimeout(() => {
                                // wx.vibrateLong();
                                // this.shakeCompleteSound.play();
                                // wx.stopAccelerometer();
                            // }, 800);
                            // flag = false;
                            // setTimeout(() => {
                            //     flag = true;
                            // }, 5000);
                        // }
                    // }
                    // lastX = x;
                    // lastY = y;
                    // lastZ = z;
                // }
            });
        }
    },
    getData() {
        const getPopular = () => {
            // 获取热映列表
            douban.fetchFilms.call(this, config.apiList.popular, start, count, () => {
                getComming();
            }, done)
        }

        const getComming = () => {
            // 获取待映列表
            douban.fetchFilms.call(this, config.apiList.coming, start, count, done, done)
        }

        const done = () => {
            this.setData({
                loaded: true
            })
            wx.hideToast();
            this.saveData(this.data.films);
        }

        const start = 0;
        const count = 250;
        getPopular();
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 10000
        });
        // 超过10秒关闭载入动画并保存
        setTimeout(() => {
            done();
        }, 10000);
    },
    saveData(data) {
        wx.setStorage({
            key: 'shakeFilmList',
            data
        })
    },
    getFilm() {
        const length = this.data.films.length;
        const index = this.getRandomNum(0, length - 1);
        console.log(2222222222222222);
        this.setData({
            film: this.data.films[index],
            showFilm: true
        })
        console.log(this.data.showFilm);
    },
    getRandomNum(min, max) {
        const range = max - min;
        const rand = Math.random();
        const num = min + Math.round(rand * range); //四舍五入
        return num;
    },
    viewFilmDetail(e) {
        wx.redirectTo({
            url: `../filmDetail/filmDetail?id=${e.currentTarget.dataset.id}`
        })
    },
    play() {
        this.shakeSound.play();
        wx.vibrateLong();
    }
});