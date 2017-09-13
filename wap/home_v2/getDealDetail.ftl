<#include "../inc/head_base.ftl"/>
<#include "../inc/head_jq.ftl"/>
<#include "../inc/head_weui.ftl"/>
	
<#include "../inc/head_ng.ftl"/>
<#include "../inc/head_var.ftl"/>
<!--/${json_config.project_name_common}-->
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/getDealDetail.css?version=321332438">
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
<!-- <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css"> -->
<!-- <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/getDealDetail.css?version=321332432"> -->
<!-- <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"> -->

<script src="http://common.huibaoming.cn/swiper/js/swiper.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/MD5.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/getDealDetail.js?ver=201705166666669"></script>
<!-- <script src="${json_config.domain_url}/${json_config.folder_name}/src/js/haivitDeal_getDealDetail.js?ver=20170516661666"></script> -->
<!-- <script src="${json_config.domain_url}/${json_config.folder_name}/src/js/MD5.js"></script> -->
<script src="http://common.huibaoming.cn/angular/angular-sku.js"></script>

</head>
<body ng-app="app" ng-controller="ctrl">
	<!--header-->
    <!--头部-->
    <!--<header class="back-header weui-flex">-->
        <!--<span class="back-header-icon icon-chevron-left flex_item1" onclick="javascript:window.history.go(-1);">返回</span>-->
        <!--<h1 class="back-header-h1 flex_item4">商品详情</h1>-->
        <!--<a class="flex_item1 header-right"></a>-->
    <!--</header>-->
    <!--内容区-->
    <div  class="fix_containner" style="margin-top:0">
        <div class="swiper-container" style="width:100%;margin-top:0;height:20rem"><!--swiper容器[可以随意更改该容器的样式-->
            <div class="swiper-wrapper">
                <div class="swiper-slide" ng-repeat="item in json.carousel_pics">
                	<img src="{{item.img}}" style="width:100%;"/>
                </div>
            </div>
        </div>
        <div class="bg-white" style="padding:10px;">
            <div class="weui-row">
                <div class="weui-col-100 text-font2">
                    <p ng-bind="json.detail.name"></p>
                </div>
                <!--<div class="weui-col-20 text-c" style="border-left:1px solid #EEE">-->
                <!--<img src="http://common.huibaoming.cn/wap/src/images/icon/login1.png" alt="" style="width:24px">-->
                <!--<p class="text-font1">分享</p>-->
                <!--</div>-->
            </div>
            <span class="sc-text-active" ng-bind="'￥' + json.detail.price"></span>
            <span class="fr sc-text-gray text-font2" ng-bind="'库存：' + json.detail.number"></span>
        </div>
        <!--说明-->
        <#--<div class="bg-white explain">
            <li class="icon-ok-circle"><span>七天无忧退换</span></li>
            <li class="icon-ok-circle"><span>先行赔付</span></li>
            <li class="icon-ok-circle"><span>超时赔偿</span></li>
            <li class="icon-ok-circle"><span>顺丰包邮</span></li>
        </div>-->
        <#--<div class="bg-white explain" ng-click="pop()" ng-if="json.attr_list.length != 0">
            <p ng-bind="attribute_value"></p>
        </div>-->
        <div class="bg-white pad-all2 text-c" style="margin-top:20px">
            <div class="weui-flex">
                <div class="weui-flex__item">
                    <div class="split_line fr"></div>
                </div>
                <div style="padding:0 0.5rem;">图文详情</div>
                <div class="weui-flex__item">
                    <div class="split_line fl"></div>
                </div>
            </div>
        </div>
        <!--图文详情-->
        <div class="goods-detail" id="app">
        	<dl id="desciption"  style="min-height:480px;"></dl>
        </div>
    </div>

    <!--弹出框-->
    <div id="about" class="weui-popup__container  popup-bottom">
        <div class="weui-popup__overlay weui-popup-overlay" onclick="close(this)"></div>
        <div class="weui-popup__modal" style="overflow:inherit;background:white">
            <!--关闭按钮-->
            <p class="toclose close-popup">关闭</p>
            <!--头部区域-->
            <div class="weui-flex pad-b5">
                <div class="flex_item1 text-c" style="position:relative"><img src="{{json.detail.icon}}" alt="" class="popup-img"></div>
                <div class="flex_item2 pad-l3 pad-t3 text-font3">
                    <b class="sc-text-warning" ng-bind="'￥' + price"></b>
                    <p class="sc-text-gray " ng-bind="'库存:' + number"></p>
                </div>
            </div>
            <!--选择区域,可垂直滚动-->
            <div class="shop_number">
                <div class="weui-flex">
                    <div class="weui-flex__item text-font2 chose-number">购买数量</div>
                    <div class="weui-flex__item text-r">
                        <span class="calculate add" ng-click="pre()">-</span>
                        <span class="calculate" ng-bind="num"></span>
                        <span class="calculate minus" ng-click="add()">+</span>
                    </div>
                </div>
            </div>
            <!--底部按钮区域-->
            <div class="footer-fixed">
                <div class="weui-flex text-c">
                    <div class="weui-flex__item footer-fixed-height add"  ng-click="shop('inner')"><p class="btn-operate">加入购物车</p></div>
                    <div class="weui-flex__item footer-fixed-height buy"  ng-click="buy('inner')"><p>立即购买</p></div>
                </div>
            </div>
        </div>
    </div>

    <!--购买导航导航栏-->
    <div class="footer-fixed " id="footer">
        <div class="weui-flex text-c">
            <div class="weui-flex__item">
                <div class="footer-operate" onclick="location=project_url+'/'+module+'/index.do';"> <img src="http://common.huibaoming.cn/wap/images/icon/home.png" alt="" style="width:20px"><p>首页</p></div>
                <div class="footer-operate" onclick="location=project_url+'/haivitShopCart/index.do';"><img src="http://common.huibaoming.cn/wap/images/icon/search.png" alt="" style="width:20px"><p>购物车</p><span class="shopcar_num" ng-bind="shopcar_num"></span></div>
            </div>
            <#-- 若想让用户选择完属性之后，点击这两个按钮可直接加入购物车或购买，将点击事件换成shop()和buy() -->
            <div class="weui-flex__item footer-fixed-height add" ng-click="pop()"><p class="btn-operate">加入购物车</p></div>
            <div class="weui-flex__item footer-fixed-height buy" ng-click="pop()"><p>立即购买</p></div>
        </div>
    </div>
    <div class="back_top" ng-click="back_top()">
        <img src="http://common.huibaoming.cn/wap/images/haivit/backtop.png" alt="" style="width:140%;margin-top:-0.5rem;margin-left:-0.5rem;">
    </div>
</body>
<script>
$(function(){
	var mySwiper = new Swiper(".swiper-container", {
		direction : "horizontal",/* 横向滑动 */
		loop : true,/* 形成环路（即：可以从最后一张图跳转到第一张图 */
		pagination : ".swiper-pagination",/* 分页器 */
		prevButton : ".swiper-button-prev",/* 前进按钮 */
		nextButton : ".swiper-button-next",/* 后退按钮 */
		autoplay : 3000
	/* 每隔3秒自动播放 */
	});
});
</script>
<#include "../inc/foot.ftl"/>