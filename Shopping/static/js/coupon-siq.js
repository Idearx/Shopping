window['couponsiq.js'] || (function (window, $, undefined) {
    window['couponsiq.js'] = true;
    // 处理优惠券的显示状态
    function handleCouponState(data) {
        var $target = $('.getCoupon[data-couponpicconfig=\'{"activityCode":"' + data.activityCode + '","batchCode":"' + data.batchCode + '"}\']');
        var className = '';

        if (data.receiveStates == -1) { // 已领完
            className = 'state-empty';
        } else if (data.receiveStates == 1) { // 正常状态不操作
            return false;
        } else if (data.receiveStates == 2) { // 已领取
            className = 'state-got';
        } else if (data.receiveStates == 3) { // 即将开始
            className = 'state-begin';
        } else if (data.receiveStates == 4) { // 已结束
            className = 'state-over';
        }

        $target.each(function () {
            $(this).attr('class', 'getCoupon ' + className);
        });
    }

    // 事件委托所有优惠券超链接的点击事件
    $('.mod-coupon-siq').on('click', '.getCoupon', function (event) {
        event.preventDefault();
        // 领券超链接对象
        var $target = $(this);
        // 模块配置
        var modConfig = $target.parents('.mod-coupon-siq').data('couponpicbgconfig');
        // 链接配置
        var anchorConfig = $target.data('couponpicconfig');
        // 正常状态或者没有上传状态图的情况下才调用领券接口
        if ($target.hasClass('state-normal')) {
            utils.getCoupon(anchorConfig, handleCouponState);
        } else {
            return false;
        }
    });

    var arrCouponParam = [];
    $('.mod-coupon-siq .getCoupon[data-couponpicconfig]').each(function (index, el) {
        arrCouponParam.push($(el).data('couponpicconfig'));
    });

    utils.queryCouponState(arrCouponParam, handleCouponState);
})(window, jQuery);
