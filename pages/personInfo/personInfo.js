Page({
    data: {
        cells: []
    },
    onLoad(options) {
        wx.getStorage({
            key: 'person_info',
            success: res => {
                const data = res.data;
                this.setData({
                    cells: [
                        [{
                                title: '姓名',
                                text: data.name == '' ? '未填写' : data.name,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '昵称',
                                text: data.nickName == '' ? '未填写' : data.nickName,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '性别',
                                text: data.gender == '' ? '未填写' : data.gender,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '年龄',
                                text: data.age == '' ? '未填写' : data.age,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '生日',
                                text: data.birthday == '' ? '未填写' : data.birthday,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '星座',
                                text: data.constellation == '' ? '未填写' : data.constellation,
                                access: false,
                                fn: ''
                            }
                        ],
                        [{
                                title: '公司',
                                text: data.company == '' ? '未填写' : data.company,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '学校',
                                text: data.school == '' ? '未填写' : data.school,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '手机号码',
                                text: data.tel == '' ? '未填写' : data.tel,
                                access: false,
                                fn: ''
                            },
                            {
                                title: '邮箱',
                                text: data.email == '' ? '未填写' : data.email,
                                access: false,
                                fn: ''
                            }
                        ],
                        [{
                            title: '个性签名',
                            text: data.intro == '' ? '未填写' : data.intro,
                            access: false,
                            fn: ''
                        }]
                    ]
                })
            }
        });
    }
});