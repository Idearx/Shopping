/**
 * PC帮助中心
 * 修复：登录状态改变问题{"version":"1.2.16","time":"2018.03.07 16:15:56","author":"Ling"}
 */
(function (window, $, undefined) {

    //判断国内查询登录的用户名信息
    if (window.pageConfig.areaCode === 'CN') {  // 国内
        var data = {
            'portal': "1",
            'lang': 'zh-CN',
            'country': 'CN'
        };
        // 请求接口判断用户是否登录TOOD国内app端
        utils.ajaxOpenAPI({
            type: 'GET',
            url: '/mcp/queryUserInfo',
            data: data,
            success: function (data) {
                if (data && data.success) {
                    if (window.shopdcmode != "DESIGN"){
                        $('.unlogin').hide();
                        $('.login').show();
                        //修改用户名  
                        var userName = data.userInfo.nickName;
                        $('.loginName').text(userName);
                    }
                }
            }
        });
    } else {
        var uid = Tool.cookie.get('uid');
        var dispalyName = Tool.cookie.get('displayName') || Tool.cookie.get('name') || Tool.cookie.get('user') || Tool.cookie.get('ac_lmi');

        //在装修系统下，不改变状态
        if (window.shopdcmode == "DESIGN") {
            uid = null;
        }

        //读取缓存，获取用户名
        if (uid !== null) {
            $('.unlogin').hide();
            $('.login').show();
            $('.loginName').text(dispalyName);
        } else {
            $('.unlogin').show();
            $('.login').hide();
            $('.loginName').text('');
        }
    }

    //退出登录
    $('.signout').click(function () {
        window.location.href = domainMain + "/account/logout";
    });
})(window, jQuery);

