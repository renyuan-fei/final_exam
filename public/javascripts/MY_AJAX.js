function MY_AJAX(options)
{
    //创建默认的参数
    const defaults = {
        type: 'get',
        url: '',
        data: {},
        header:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        success: function ()
        {
        },
        error: function ()
        {
        }
    };

    //用传入的参数options覆盖default，对所需的参数进行修改
    Object.assign(defaults,options);


    //创建ajax对象
    const xhr = new XMLHttpRequest();

    //------------------------------------------------------------------------------------------------------------------

    //获取参数
    let params = '';

    // attribute = 属性名 ， defaults.data[attribute] = 属性的值
    for (let attribute in defaults.data)
    {
        params += attribute + '=' + defaults.data[attribute] + '&';
    }

    //将末尾的&剪掉
    params = params.substring(0, params.length - 1);

    //------------------------------------------------------------------------------------------------------------------

    //判断请求方式
    if (defaults.type === 'get')
    {
        //拼接get请求的url
        defaults.url = defaults.url + '?' + params;
    }

    //------------------------------------------------------------------------------------------------------------------

    //配置ajax对象
    xhr.open(defaults.type, defaults.url);

    //------------------------------------------------------------------------------------------------------------------

    //发送请求
    //如果请求方式为post
    if (defaults.type === 'post')
    {
        //用户希望的向服务器端请求的 数据格式
        var content_type = defaults.header['Content-Type'];
        //设置请求参数格式的类型
        // console.log(content_type)
        xhr.setRequestHeader('Content-Type', defaults.header['Content-Type'])


        //json格式
        if (content_type === 'application/json')
        {
            //option.data本身就是一个json对象，所以这里只需要将他转换成json字符串就可以直接传输了
            xhr.send(JSON.stringify(defaults.data));
        }
        //x-www-form-urlencoded格式
        else
        {
            //普通格式需要转换成params
            xhr.send(params);
        }
    } else
    {
        xhr.send();
    }

    //------------------------------------------------------------------------------------------------------------------

    //返回的处理函数
    xhr.onload = function ()
    {
        //xhr.getResponseHeader()
        //获取响应头中的数据
        const content_type = xhr.getResponseHeader('Content-Type');
        console.log(content_type)

        let responseText = xhr.responseText;

        if (content_type !== null)
        {
            if (content_type.includes('application/json'))
            {
                //将json字符串转换成json对象
                responseText = JSON.parse(responseText);
            }
        }


        //打印返回结果
        console.log(responseText);

        //对于不同的状态码，返回不同的值
        if (xhr.status === 200 && xhr.readyState === 4)
        {
            //成功,对返回结果进行处理
            defaults.success(responseText, xhr);
        }
        else
        {
            //失败,对返回结果进行处理
            defaults.error(responseText, xhr);
        }
    }

    xhr.onerror = function ()
    {
        defaults.error();
    }
}

