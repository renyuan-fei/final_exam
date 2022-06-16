//写cookies
function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//读取cookies
function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

//删除cookies
function delCookie(name)
{
    console.log(111)
    var exp = new Date();
    exp.setTime(exp.getTime() - 100);
    var cval=getCookie(name);
    console.log(cval)
    if(cval!=null)
    {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}