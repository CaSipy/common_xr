<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->	
		
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/Place.css">
		<!--
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/Place.css">
		-->

	</head>
	<body ng-controller="ctrl" ng-app="app" class="bg-wechat">
		<div>
			<!--头部-->
			<header class="back-header weui-flex  bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" ng-click="goBack()">返回</span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue">地址管理</h1>
				<a class="flex_item1 header-right sc-text-blue"></a>
			</header>
			<!--主体部分-->
			<div class="fix_containner">
                <section>
                    <article class="rP-cont-mes bc-head-white mar-b3 bg-white" ng-repeat="item in json.list" >
                        <div ng-click="shopCart(item.id)">
	                        <div class="rP-cont-mes-top pad-b1">
	                            <span class="text-font4 fl p-fColor" ng-bind="item.receiver_name"></span>
	                            <span class="text-font4 fr p-fColor" ng-bind="item.receiver_phone"></span>
	                        </div>
	                        <div class="rP-cont-mes-center">
	                            <p class="text-font3 p-fColor" ng-bind="item.province_name+''+item.city_name+''+item.village_name+''+item.address"></p>
	                        </div>
                        </div>
                        <div class="rP-cont-mes-footer">
                            <div class="weui-cells weui-cells_checkbox mar-t1">

                                <label class="mar-t1 weui-cell weui-check__label pad-t1 pad-b1 fl pad-l2" for="{{item.id}}">
                                    <div class="weui-cell__hd pad-r0" >
                                        <input type="radio" class="weui-check" name="checkbox1" id="{{item.id}}" ng-checked="item.isDefault==1" ng-click="setDefault(item.id)">
                                        <i class="weui-icon-checked" ></i>
                                    </div>

                                    <div class="weui-cell__bd">
                                        <p class="text-font2" name="rP-defa">默认地址</p>
                                    </div>
                                </label>
                                <div class="weui-cell fr pad-l2 pad-r2 pad-t3">
                                    <a href="#" class="rP-cont">
                                        <div class="weui-cell__hd fl pad-r0 icon-trash picon p-imgColor">
                                            <i class="text-font2" ng-click="del(item.id,$index)">删除</i>
                                        </div>
                                    </a>
                                </div>
                                <div class="weui-cell fr pad-l2 pad-r2 pad-t3">
                                    <a href="" id="editPlace">
                                        <div class="weui-cell__hd fl pad-r0 icon-file-alt picon p-imgColor">
                                            <i class="text-font2" ng-click="editer(item.id)">编辑</i>
                                        </div>
                                    </a>
                                </div>

                            </div>

                        </div>
                    </article>
                </section>
		</div>
			<div class="rP-btn text-c pad-all2 bg-qblue">
				<a id="addPlace" href="" class="text-font3 pad-all2" ng-click="add()">
					添加新地址
				</a>
			</div>
		</div>
	</body>
</html>
	
		
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/Place.js?ver=201707051220" type="text/javascript" charset="utf-8"></script>
<!--
<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/Place.js" type="text/javascript" charset="utf-8"></script>
-->
<#include "../inc/foot.ftl"/>