let app = new Vue({
    el: '#main',
    data:
        {
            username: '',
            password: '',
        },
    methods:
        {
            test()
            {
                // console.log(document.cookie)

                MY_AJAX({
                    type: 'get',
                    url: 'users/logout',
                    data: {},
                    success: function (response)
                    {
                        delCookie('EXAM')
                        console.log('log out')
                    },
                    error: function (response)
                    {
                        console.log('登录失败')
                    }
                })
            },
            sign_in()
            {
                let that = this;

                console.log(this.username, this.password)

                if (that.username === '' || that.password === '')
                {
                    alert('Please complete all information')
                } else
                {
                    MY_AJAX({
                        type: 'post',
                        url: 'users/login',
                        data:
                            {
                                username: this.username,
                                password: this.password
                            },
                        header:
                            {
                                'Content-Type': 'application/json'
                            },
                        success: function (response)
                        {
                            console.log(response)

                            if (response.status === 1)
                            {
                                console.log('login success')

                                alert(`login success, welcome ${that.username}`)

                                that.username = ''
                                that.password = ''
                            } else
                            {
                                console.log('login failed')

                                alert('password error,login failed')
                            }
                        },
                        error: function (response)
                        {
                            console.log('登录失败')
                        }
                    })
                }
            }
        }
})