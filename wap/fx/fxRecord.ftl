<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->	
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/fxReward.css">
    
<!--     <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css"> -->
<!-- 	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"> -->
<!--     <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/fxReward.css"> -->
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
    <div class="fix_containner record_list" >
        <section id="record_list">
            <div class="search text-font3 text-r ">
            <span class="mar-r5 open-popup" data-target="#half">
                筛选&nbsp;/&nbsp;<i class="icon-filter sc-text-blue"></i>
            </span>
            </div>
            <article class="bg-white mar-b2" id="1"  ng-repeat="item in json.vo">
	            <div class="record_box">
	                <div class="record_explain">
	                    分销金额：<span class="text-font5 text-weight3">￥<b ng-bind="item.fx_salary"></b></span>
	                </div>
	                <div class="record_status color_status">
	                  <b ng-if="item.fx_status==0"> 待发放</b>
	                  <b ng-if="item.fx_status==1"> 已发放</b>
	                </div>
	            </div>
            </article>
        </section>
        <div class="weui-loadmore loadMore hide">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore" ng-hide="has_data">
            <span class="weui-loadmore__tips">没有更多奖励记录了哦</span>
        </div>
    </div>
    <!--底部弹出筛选框-->
    <div id="half" class="weui-popup__container popup-bottom ">
        <div class="weui-popup__overlay weui-popup-overlay"></div>
        <div class="weui-popup__modal">
            <div class="toolbar">
                <div class="toolbar-inner">
                    <a href="javascript:;" class="picker-button close-popup sc-text-blue">关闭</a>
                    <h1 class="title">筛选发放状态</h1>
                </div>
            </div>
            <div class="modal-content demos-content-padded mar-t5 mar-b5">
            	<a href="javascript:;" class="weui-btn bg-qblue width90" ng-click="getFxStatus(-1)">全部</a>
                <a href="javascript:;" class="weui-btn bg-qblue width90" ng-click="getFxStatus(1)">已发放</a>
                <a href="javascript:;" class="weui-btn weui-btn_default width90" ng-click="getFxStatus(0)">未发放</a>
            </div>
        </div>
    </div>
<#include "../inc/foot.ftl"/>
<!--  <script src="${json_config.domain_url}/${json_config.folder_name}/src/js/fxRecord.js?ver=20170707"></script> -->
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/fxRecord.js?ver=20170707"></script>