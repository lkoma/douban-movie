module.exports = {
    show(cfg) {
        this.setData({
            message: {
                content: cfg.content,
                icon: cfg.icon,
                visiable: true
            }
        })
        if (cfg.duration) {
            setTimeout(() => {
                this.setData({
                    message: {
                        visiable: false
                    }
                })
            }, cfg.duration)
        }
    },
    hide() {
        this.setData({
            message: {
                visiable: false
            }
        })
    }
}