window['siqmbfproscroll3d.js'] || (function(window, $, undefined) {
    window['siqmbfproscroll3d.js']=true;
    function Proscroll3d($el) {
        this.click = false;
        this.init($el);
        this.bindEvent();
    }

    // 原型方法
    Proscroll3d.prototype = {
        constructor: Proscroll3d,
        init: function($el) {
            if(typeof Swiper == 'undefined')
                var t = setInterval(function(){
                    if(typeof Swiper != 'undefined'){
                        clearInterval(t);
                        (new Proscroll3d($el)).play();
                    }
                },500);
            else
                this.play($el);
        },
        play: function($el) {
            var mySwiper2 = new Swiper('.mod-siqmbfproscroll3d .inview-new-main', {
                autoplay: 6000,
                speed:500,
                loop: true,
                effect : 'coverflow',
                nextButton: '.hotmod-button-next',
                prevButton: '.hotmod-button-prev',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                preventClicks: false,
                coverflow: {
                    rotate: 50,
                    stretch: 92,
                    slideShadows : true
                }
            });
        },
        bindEvent: function(){
            var objthis = this;
            $(".mod-siqmbfproscroll3d .add-cart a").click(function(e){
                var that = this;
                if(objthis.click == false){
                    objthis.click = true;
                }else{
                    return false;
                }

                var car_num = 0;//购物车商品数量

                var itemCode = $(that).attr("data-sbomcode");
                cartjson=JSON.stringify({"itemCode":itemCode,"itemType":"S0","qty":1});


                utils.ajaxOpenAPI({
                    type: 'POST',
                    url: "/cart/v1/add.json",
                    data: {
                        'mainItem': cartjson
                    },
                    success:function(data){
                        if(data.resultCode!='200000'){
                            objthis.click = false;
                            Tool.pcTipShow('<s></s>', '购物车繁忙，您可以选择立即购买', 'dialog-button-yes', '确定');
                            return false;
                        }


                        scrollTop = $(document).scrollTop();
                        var offset = $(that).parent().parent().offset();
                        if($(".mod-cart #buy-car-end").length > 0){
                            offset = $(".mod-cart #buy-car-end").offset();
                        }

                        var addcar = $(that);
                        var img = addcar.parent().parent().parent().find('a .item-img img').attr('src');

                        var flyer = $('<img style="z-index: 99999999;border-radius: 50%; width: 40px" src="'+img+'">'); //抛物体对象
                        flyer.fly({
                            start: {
                                left: e.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                                top: e.pageY-scrollTop-50 //开始位置（必填）
                            },
                            end: {
                                left: offset.left, //结束位置（必填）
                                top: offset.top-scrollTop, //结束位置（必填）
                                width: 0, //结束时宽度
                                height: 0 //结束时高度
                            },
                            onEnd: function(){ //结束回调
                                // 请求购物车查询接口
                                utils.ajaxOpenAPI({
                                    type: 'GET',
                                    url: '/cart/v1/getTotalNum.json',
                                    data: {},
                                    success: function(json) {
                                        if($(".mod-cart #buy-car-end").length > 0){
                                            $(".mod-cart #buy-car-end").text(json.data);
                                        }
                                    }
                                });

                                this.destory(); //移除dom
                                objthis.click = false;
                            }
                        });
                    },
                    error:function(data){
                        objthis.click = false;
                        Tool.pcTipShow('<s></s>', '购物车繁忙，您可以选择立即购买', 'dialog-button-yes', '确定');
                    }
                });
            })
        }
    };

    // 遍历页面组件
    DC.defineModule('siqmbfproscroll3d', new Proscroll3d($('.mod-siqmbfproscroll3d .swiper-container')));

})(window, jQuery);
