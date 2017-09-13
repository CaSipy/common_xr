 <#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
	<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
	
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/userMoney_log.js?ver=${json_config.system_static_version}"></script>
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/userMoney.css?ver=${json_config.system_static_version}">
	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	
</head>
<body ng-app="app" ng-controller="ctrl">

<!--头部-->
<header class="back-header weui-flex bg-white header_bBor">
    <span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
    <h1 class="back-header-h1 flex_item4 sc-text-blue" ng-bind="getShowTitle()"></h1>
    <a class="flex_item1 header-right sc-text-blue" ng-click="submit()">筛选</a>
</header>
    <div class="weui-cell log_title">
        <div class="weui-cell__bd weui-cell_primary">
            <p ng-bind="year_month"><!--2017年2月--></p>
            <p class="text-font3 tip_c" ng-show="has_data" ng-bind="total_income_expenditure"><!--支出￥298.0 &nbsp; 收入￥i874--></p>
        </div>
        <div class="weui-cell__hd" id="showIOSActionSheet">
            <i class="icon-calendar" id="picker-name"></i>
            <div class="getNeW-title text-c mar-t3" id="ask" name="showIOSActionSheet">
                <b class="text-font3 sc-text-gray mar-t2 text-weight"></b>
            </div>
        </div>
    </div>
<div style="margin-top:5.6rem;">
    <div class="weui-cells " style="margin-top:0" id="con">
        <a class="weui-cell weui-cells_access" href="javascript:;" ng-repeat="item in logs">
            <div class="weui-cell__hd"><img ng-src="{{getShowPic(item.first_type,item.user_pic)}}" alt="icon" style="width:30px"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p class="text-font4" ng-bind="getShowLogDesc(item.first_type,item.log_info)"></p>
                <p class="text-font4 tip_c" ng-bind="item.create_time"></p>
            </div>
            <div class="weui-cell__bd text-r">
                <p class="hx_addc hx_fw" ng-bind="(item.is_income==1?'+':'-')+item.money"></p>
                <p class="text-font1 hx_abc" ng-bind="item.balance_money"></p>
            </div>
        </a>

    </div>
    <div class="weui-loadmore hide">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <div class="weui-loadmore"  ng-hide="has_data">
        <span class="weui-loadmore__tips">没有记录</span>
    </div>
</div>
<!--弹出框-->
<div id="about" class="weui-popup__container  popup-bottom">
    <div class="weui-popup__overlay weui-popup-overlay"></div>
    <div class="weui-popup__modal" style="overflow:inherit;background:#F8F8F8">
        <!--关闭按钮-->
        <span class="toclose close-popup" ng-click="closePopup()">关闭</span>
        <!--头部区域-->
        <div class="popup-title">
            <span>选择交易类型</span>
        </div>
        <!--选择区域,可垂直滚动-->
        <div class="popup-container text-font2">
            <div class="weui-grids pad-t4 pad-b4 ">
                <div class="weui_grid_add" ng-click="changeType(0)">
                    <div class="{{first_type==0 ? 'active' :  '' }} popup-item">全部</div>
                </div>
                <div class="weui_grid_add" ng-repeat="item in json.first_types"  ng-click="changeType(item.id)">
                    <div class="{{first_type==item.id ? 'active' :  '' }} popup-item" ng-bind="item.name"></div>
                </div>
            </div>
        </div>
    </div>

</div>

<!--弹出框-->
<div>
    <div class="weui-mask1" id="iosMask" style="display:none;"></div>
    <div class="time_box" id="time_box">
        <div id="picker-container">
            <div class="time-border"><input class="weui-input" id="inline" type="text" value="" readonly=""></div>
        </div>
        <div class="weui-flex bg-white text-c">
            <div class="weui-flex__item time-cancel-btn" ng-click="timeCancel()">取消</div>
            <div class="weui-flex__item time-sure-btn" ng-click="timeSure()">确认</div>
        </div>
    </div>
</div>

<#include "../inc/foot.ftl"/>