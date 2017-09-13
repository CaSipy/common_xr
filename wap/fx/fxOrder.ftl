<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用	-->
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/fxOrder.css">
    
<!--     <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css"> -->
<!-- 	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"> -->
<!--     <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/fxOrder.css"> -->
</head>
<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
    <nav class="classify_nav">
        <ul class="weui-flex">
            <!-- ngRepeat: item in json.type_list -->
           <li data-base="1" ng-repeat="item in json.type" ng-click="nav_click($index)" class="weui-flex__item" ng-class="{nav_li_checked:tab==$index}">
                <span class="nav_msg " ng-bind="item.title" ng-class="{active:tab==$index}"></span>
            </li>
            <!-- end ngRepeat: item in json.type_list -->
        </ul>
    </nav>
    <div class="fix_containner con">
        <div class="search text-font3 text-r ">
            <span class="mar-r5 open-popup" data-target="#half">
                筛选&nbsp;/&nbsp;<i class="icon-filter sc-text-blue"></i>
            </span>
        </div>
        <section class="pro_lists mar-t5">
        <article class="bg-white mar-b2" id="1"  ng-repeat="item in json.vo">
            <ul id="pro_list">
                <li>
                    <p class="top_info text-r ">
                        订单状态：
                        <span>
							<b ng-if="item.order_status==0"> 未完成</b>
	                  		<b ng-if="item.order_status==1"> 已完成</b>
						</span>
                    </p>
                    <div class="list_con" >
                        <div class="des_item text-font3 mar-t4 mar-b4">
                           <b ng-bind="item.name"></b>
                        </div>
                        <div class="price fr mar-t4 mar-b4 text-r text-weight3">
                            ￥<b ng-bind="item.real_price"></b>
                        </div>
                    </div>
                    <p class="operate">
                        <span class="fl text-font3">
                            购买者：<b ng-bind="item.user_name"></b>
                        </span>
                        <span class="fr text-r">
                            x<b ng-bind="item.number"></b>
                        </span>
                    </p>
                </li>

            </ul>
      </article>
        <div class="weui-loadmore loadMore hide">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore" ng-hide="has_data">
            <span class="weui-loadmore__tips">没有更多订单了哦</span>
        </div>
        </section>
        <!--底部弹出筛选框-->
        <div id="half" class="weui-popup__container popup-bottom ">
            <div class="weui-popup__overlay weui-popup-overlay"></div>
            <div class="weui-popup__modal">
                <div class="toolbar">
                    <div class="toolbar-inner">
                        <a href="javascript:;" class="picker-button close-popup sc-text-blue">关闭</a>
                        <h1 class="title">订单状态筛选</h1>
                    </div>
                </div>
                <div class="modal-content demos-content-padded mar-t5 mar-b5">
                	<a href="javascript:;" class="weui-btn width90 bg-qblue" ng-click="getOrderStatus(-1)">全部订单</a>
                    <a href="javascript:;" class="weui-btn width90 bg-qblue" ng-click="getOrderStatus(1)">已支付</a>
                    <a href="javascript:;" class="weui-btn weui-btn_default width90" ng-click="getOrderStatus(0)">未支付</a>
                </div>
            </div>
        </div>
    </div>
<#include "../inc/foot.ftl"/>
<!--  <script src="${json_config.domain_url}/${json_config.folder_name}/src/js/fxOrder.js?ver=2001"></script> -->
  <script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/fxOrder.js?ver=2001"></script>