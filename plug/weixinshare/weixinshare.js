var pri = {
    weixinShare: function () {
        var config = pri.config;
            //weixin = weixinshareinfo.weixin;
            //alert('微信参数' + weixinshareinfo.appId);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: weixinshareinfo.appId, // 必填，公众号的唯一标识
            timestamp: weixinshareinfo.timestamp, // 必填，生成签名的时间戳
            nonceStr: weixinshareinfo.nonceStr, // 必填，生成签名的随机串
            signature: weixinshareinfo.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            var shareData = {
                title: config.title, // 分享标题
                desc: config.desc, // 分享描述
                link: config.link, // 分享链接
                imgUrl: config.imgUrl, // 分享图标
                type: config.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                /*trigger: function (res) { //失败                    
                },
                cancel: function (res) { //取消
                    alert('已取消');
                },
                fail: function (res) {
                    //alert(JSON.stringify(res));
                },*/
                success: function (res) { //成功
                    //alert('已分享');
                    alert('分享成功111');
                    config.success();
                }
            };
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareWeibo(shareData);
            wx.onMenuShareAppMessage(shareData);
        });

        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            alert('当前网络不佳，请稍后重试！');
        });
    }

};

var pub = function (param) {
    // 默认配置
    pri.config = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        type: 'link',
        trigger: null,
        success: function(){
            alert('分享成功哈哈哈');
        },
        cancel: null,
        fail: null
    };
    $.extend(pri.config, param);
    pri.weixinShare();
};

// 对外入口
window.pub = pub;
