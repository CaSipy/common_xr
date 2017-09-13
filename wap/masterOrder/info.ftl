	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<#--/${json_config.project_name_common}-->
	<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/userOrder.css?ver=1">
    
</head>
<body ng-app="app" ng-controller="ctrl">
	<!--头部-->
	<header class="back-header weui-flex bg-white header_bBor">
		<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
		<h1 class="back-header-h1 flex_item4 sc-text-blue">订单详情</h1>
		<a class="flex_item1 header-right sc-text-blue"></a>
	</header>
	<div class="fix_containner mar-b0">
		<section>
			<header class="cIndex-header bg-qblue weui-flex">
				<div class="weui-cell weui-check__label pad-t0 pad-b0 width100">
			
					<div class="weui-panel__bd commodity pad-t0 pad-b0">
						<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-all0 weui-flex commodity">
							
							<!--完成状态-->
							<div class="commodity_showHei flex_item2 pad-l4" style="padding-top: 2rem;">
								<h4 class="text-weight text-font4 bc-text-header" ng-bind="paystatus(item.pay_status,item.service_status)"></h4>
								<p class="weui-media-box__desc text-font2 bc-text-header mar-t1 mar-b2">
									<span>服务时间：<i ng-bind="json.orders.service_time"></i></span>
								</p>
							</div>
							<div class="weui-media-box__hd commodity_img flex_item1">
								<img class="weui-media-box__thumb commodity_img" src="${json_config.oss_common_url}/wap/images/xr/order.png">
							</div>	
						</a>
					</div>
				</div>
			</header>
			<section>
				
				<article>
					<!--个人信息-->
					<figure>
						<div class="weui-cells cancle mar-t0" style="border-bottom:.05rem solid #F4F4F4">
							<div class="weui-cell weui-cell_access pad-t1 pad-b1 cIndex-figure" href="javascript:;">
								<div class="weui-cell__hd"><img src="${json_config.oss_common_url}/wap/images/location.png" alt="" style="width:20px;margin-right:.5rem;display:block"></div>
								<div class="weui-cell__bd mar-l2">
									<p class="text-font3 weui-flex">
										<span class=" mar-r2 flex_item3">客户：<b class="text-font4" ng-bind="json.orders.contact_name"></b></span>
										<a href="tel:{{json.orders.mobile}}" class="text-font3 flex_item2 text-r" ng-bind="json.orders.mobile"></a></p>
									<p class="text-font2 sc-text-tab mar-t1">服务地址 :
										<span ng-bind="json.orders.address"></span>
									</p>
								</div>
							</div>
						</div>
					</figure>
				</article>
				<!--子单列表-->
				<article class="mar-t4">
					
					<!--商品块-->
					<div class="weui-cells weui-cells_checkbox mar-t0 cancle  bg-wechat">
					    <!--第一块-->
					    <figure class="" name="details">
					    	<div class="weui-cell__hd bg-white pad-l5 text-font3 pad-t2 pad-b2">
							        单号:<span ng-bind="json.orders.order_sn"></span>
							</div>
						    <div class="weui-cell weui-check__label commodity_bg pad-r3 pad-t1 pad-b1 ">
							    
							    <div class="weui-panel__bd commodity">
									<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-all1 pad-r0">
										<div class="weui-media-box__hd commodity_img">
											<img class="weui-media-box__thumb" ng-src="{{json.deal.icon}}">
										</div>
										<!--完成状态-->
										<div class="weui-media-box__bd" name="accomplish">
											<h4 class="text-weight text-font2 text-astrict showLine-2" ng-bind="json.orders.deal_name"></h4>
										
											<p class="weui-media-box__desc text-font2 mar-t2">
												<span class="bc-text" name="price">￥:<i class="text-font3" ng-bind="json.orders.price"></i></span>
											</p>
											<p class="text-font3 text-r width100 commodity_num">x<b ng-bind="json.orders.number">1</b></p>
										</div>
									</a>
								</div>
						    </div>
					    </figure>
				</article>
				<!--上传图片-->
				<article class="weui-cells weui-cells_form mar-t0">
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<div class="weui-uploader">
								<div class="weui-uploader__hd">
									<p class="weui-uploader__title text-font4">上传图片</p>
								</div>
								<div class="weui-uploader__bd">
									<ul class="weui-uploader__files" id="uploaderFiles">
										<li class="weui-uploader__file" style="background-image:url({{json.orders.pic1}})"></li>
										<li class="weui-uploader__file" style="background-image:url({{json.orders.pic2}})"></li>
										<li class="weui-uploader__file" style="background-image:url({{json.orders.pic3}})"></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</article>
				<article class="weui-panel weui-panel_access mar-t0">
					<div class="weui-panel__bd">
						<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
							<div class="weui-media-box__hd userSimg1">
								<img class="weui-media-box__thumb userSimg1" src="${json_config.oss_common_url}/wap/images/xr/mes.png">
							</div>
							<div class="weui-media-box__bd">
								<h4 class="weui-media-box__title text-font4">订单备注</h4>
								<p class="weui-media-box__desc text-font2" ng-bind="json.orders.remark"></p>
							</div>
						</a>
					</div>
				</article>
				<article class="mar-t3 pad-b5">
					<div class="text-font2 pad-l5 pad-r5 pad-t2 pad-b2 bg-white">
						<p class="weui-flex sc-text-tab">
							<span class="flex_item1 text-l">订单单价</span>
							<span class="flex_item1 text-r" ng-bind="'￥'+json.orders.price"></span>
						</p>
						<p class="weui-flex sc-text-tab">
							<span class="flex_item1 text-l">订单数量</span>
							<span class="flex_item1 text-r" ng-bind="json.orders.number"></span>
						</p>
						<p class="weui-flex sc-text-tab">
							<span class="flex_item1 text-l">订单发布时间</span>
							<span class="flex_item1 text-r" ng-bind="json.orders.create_time"></span>
						</p>
						<p class="weui-flex sc-text-tab">
							<span class="flex_item1 text-l">订单完成时间</span>
							<span class="flex_item1 text-r" ng-bind="json.orders.end_time"></span>
						</p>
						<aside id="nothing_order" class=" hide" ng-class="{'show':json.orders.is_value_added==1}">
						<p class="weui-flex sc-text-tab">
							<span class="flex_item1 text-l">增值服务费</span>
							<span class="flex_item1 text-r" ng-bind="'￥'+json.value_added.payment_money"></span>
						</p>
						</aside>
						<p class="weui-flex text-font3">
							<span class="flex_item1 text-l">订单总价</span>
							<span class="flex_item1 text-r sc-text-warning text-font2 text-weight3">￥<b class="text-font4" ng-bind="json.orders.price*json.orders.number+json.value_added.payment_money"></b></span>
						</p>
						<p></p>
					</div>
				</article>
				<!--增值服务-->
				<aside ng-show="json.value_added.pay_status==2">
					<header class="weui-uploader__hd">
						<p class="weui-uploader__title text-c text-font4">增值服务</p>
					</header>
					<article class="weui-cells weui-cells_form mar-t0">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<div class="weui-uploader">
									<div class="weui-uploader__hd">
										<p class="weui-uploader__title text-font3">增值图片</p>
									</div>
									<div class="weui-uploader__bd">
										<ul class="weui-uploader__files" id="uploaderFiles">
											<li class="weui-uploader__file" style="background-image:url({{json.value_added.pic1}})"></li>
											<li class="weui-uploader__file" style="background-image:url({{json.value_added.pic2}})"></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</article>
					<article class="weui-panel weui-panel_access mar-t0">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
								<div class="weui-media-box__hd userSimg1">
									<img class="weui-media-box__thumb userSimg1" src="${json_config.oss_common_url}/wap/images/xr/mes.png" style="width:20px;margin-right:.5rem;display:block">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title text-font3">增值备注</h4>
									<p class="weui-media-box__desc text-font2" ng-bind="json.value_added.value_added_service"></p>
								</div>
							</a>
						</div>
					</article>
				</aside>
				<!--申请售后-->
				<aside ng-show="json.after_service!=null">
					<header class="weui-uploader__hd">
						<p class="weui-uploader__title text-c text-font4">售后服务</p>
					</header>
					<article class="weui-cells weui-cells_form mar-t0">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<div class="weui-uploader">
									<div class="weui-uploader__hd">
										<p class="weui-uploader__title text-font3">售后图片</p>
									</div>
									<div class="weui-uploader__bd">
										<ul class="weui-uploader__files" id="uploaderFiles">
											<li class="weui-uploader__file" style="background-image:url({{json.after_service.after_pic1}})"></li>
											<li class="weui-uploader__file" style="background-image:url({{json.after_service.after_pic2}})"></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</article>
					<article class="weui-panel weui-panel_access mar-t0">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
								<div class="weui-media-box__hd userSimg1">
									<img class="weui-media-box__thumb userSimg1" src="${json_config.oss_common_url}/wap/images/xr/mes.png">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title text-font3">售后备注</h4>
									<p class="weui-media-box__desc text-font2" ng-bind="json.after_service.after_desc"></p>
								</div>
							</a>
						</div>
					</article>
				</aside>
			</section>
		</section>
	</div>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/getorderinfo_xr.js?ver=1" type="text/javascript" charset="utf-8"></script>
