	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<#--/${json_config.project_name_common}-->
	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
	
    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/indent.css">
	<style>
		.show1{
			display:  inline-block !important;
		}
	</style>
</head>
<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
	<div>
		<!--导航栏-->
		<header class="weui-navbar header-container">
			<nav class="header-content weui-flex">
				<a class="weui-navbar__item header-unchecked pad-all4 cancle" ng-class="{'header-checked':a_choose==0}" ng-click="choseStatus(0)" href="#tab0">
					全部
				</a>
				<a class="weui-navbar__item header-unchecked pad-all4 cancle"  ng-class="{'header-checked':a_choose==1}" ng-click="choseStatus(1)" href="#tab2">
					已接单
				</a>
				<a class="weui-navbar__item header-unchecked pad-all4 cancle"  ng-class="{'header-checked':a_choose==2}" ng-click="choseStatus(2)" href="#tab3">
					服务中
				</a>
				<a class="weui-navbar__item header-unchecked pad-all4 cancle" ng-class="{'header-checked':a_choose==3}" ng-click="choseStatus(3)" href="#tab4">
					已完成
				</a>
				<a class="weui-navbar__item header-unchecked pad-all4 cancle" ng-class="{'header-checked':a_choose==4}" ng-click="choseStatus(4)" href="#tab6">
					已取消
				</a>
				
			</nav>
		</header>
		<!--没有订单-->
		<aside id="nothing_order" class=" hide" ng-class="{'show':json.orders.length==0}">
			<div class="weui-msg" id="nothing">
				<div class="obl-un mar-b5" id="nothing_un">
					<div class="icon-list"></div>
				</div>
				<div class="weui-msg__text-area">
					<h2 class="weui-msg__title">您还没有相关的订单</h2>
					<p class="weui-msg__desc">去看看大家都在使用什么吧</p>
				</div>
			</div>
		</aside>
		<section class="section-pos" name="con" ng-class="{'show':json.orders.length!=0}">
			<!--一个article为一个订单-->
			<article class="bg-white mar-b2" id="1" ng-repeat="item in json.orders">
				<div class="order-top weui-flex">
					<div style="width: 68%;" id="order_topL">
						<div class="weui-cells mar-t0 cancle">
						  <div class="weui-cell pad-r0 pad-t0 pad-b0">
						    <div class="weui-cell__bd">
						      <p class="order-top text-font3" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" ng-bind="'订单编号:'+item.order_sn"></p>
						    </div>
						  </div>
						</div>
					</div>
					<div class="weui-flex__item text-r text-font2 pad-r3 sc-text-warning" id="order_topR"  ng-bind="paystatus(item.service_status,item.pay_status)"><span></span></div>
				</div>
				<!--列表模块-->
				<div class="weui-cells s-dow mar-t0 cancle">
					<!---->
					<div class="weui-cells weui-cells-access bg-garyf5" style="margin-top:0">
						<a href="info.do?order_sn={{item.order_sn}}"
							class="weui-cell weui-media-box weui-media-box_appmsg weui-media-box-trange main-header-c pad-t2 pad-b2">
							<div class="weui-cell__bd weui-cell__hd flex_item3 pad-l4 pad-t1 pad-b1">
								<p class="text-font3 text-family-hei text-astrict showLine-1 text-font5 sc-text-tab" ng-bind="item.deal_name"></p>
								<p class="text-font2 sc-text-tab mar-t1" ng-bind="'服务时间：'+item.service_time"></p>
								<p class="text-font2 sc-text-tab mar-t1" ng-bind="'地址：'+item.address"></p>
							</div>
							<div class="weui-cell__bd weui-cell__ft">
								<p class="text-font3 mar-t1">￥<b ng-bind="item.price"></b></p>
								<p class="text-font2 mar-t1">x<b ng-bind="item.number"></b></p>
								<p class="text-font5 text-weight3 pad-l2 bc-text mar-t2" ng-bind="'￥'+(item.price*item.number+item.value_added_real_price)"></p>
							</div>
						</a>
					</div>
					<!--<div class="weui-cell">
					</div>-->
					<div class="weui-flex pad-t3 pad-b2 order-zj-borT">
						<!--<div class="weui-flex__item">
							<div class="text-font4 text-weight3 pad-l4" ng-bind="'￥'+item.total_price"></div>
							<div class="text-font2 sc-text-tab pad-l4 hide" ng-class="{'show':item.is_value_added==1}" ng-bind="'增值服务：￥'+item.value_add"></div>
						</div>-->
						<div class="weui-flex__item flex_item2 text-r pad-r1">
							<!--<a  class="weui-btn weui-btn_mini btn-t text-font2 bg-waring mar-r2 mar-t0 hide"
								ng-click="orderMaster(item.order_sn,'grab',5)" ng-class="{'show1':(item.service_status==0&&item.is_release==1)}">	抢单</a>
							<a  class="weui-btn weui-btn_mini btn-t text-font2 bg-waring mar-r2 mar-t0 hide"
								ng-click="orderMaster(item.order_sn,'receive',5)" ng-class="{'show1':(item.service_status==0&&item.is_release==0)}">	接单</a>-->
							<a name="Cancel" class="weui-btn weui-btn_default weui-btn_mini text-font2 mar-r2 mar-t0 hide" 
								ng-click="delOrder(item.order_sn)" ng-class="{'show1':(item.service_status==3||item.service_status==4)}">删除订单</a>
							<a ng-click="pick_time(item.order_sn)" name="Cancel" class="weui-btn weui-btn_default weui-btn_mini text-font2 mar-r2 mar-t0 hide" id="picker-time"
								 ng-class="{'show1':(item.service_status==1&&(item.pay_status==1||item.pay_status==2))&&item.master_cancel==0}">取消订单</a>
							<a href="javascript:;" name="Cancel" class="weui-btn weui-btn_default weui-btn_mini text-font2 mar-r2 mar-t0 hide" 
								 ng-class="{'show1':(item.service_status==1&&(item.pay_status==1||item.pay_status==2))&&item.master_cancel==2}">等待客户取消订单</a>
							<a ng-href="evaluation.do?order_sn={{item.order_sn}}" class="weui-btn weui-btn_default weui-btn_mini btn-t text-font2 mar-r2 mar-t0 hide"
								ng-class="{'show1':item.pay_status==2&&item.service_status==3}">查看评价</a>
							<a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini btn-t text-font2 mar-r2 mar-t0 hide" ng-click="pickerTime(item.order_sn)"
								ng-class="{'show1':item.service_status==1&&item.master_cancel==0}" >更改时间</a>
							<a ng-click="orderMaster(item.order_sn,'startService',1)" class="weui-btn weui-btn_mini btn-t text-font2 bg-waring mar-r2 mar-t0 hide"
								ng-class="{'show1':item.service_status==1&&item.master_cancel==0}">开始服务</a>
							<a ng-click="addOrder(item.order_sn,10)" class="weui-btn weui-btn_mini btn-t text-font2 bg-waring mar-r2 mar-t0 hide"
								ng-class="{'show1':(item.service_status==2&&(item.pay_status==2)&&item.master_confirm==0&&item.is_value_added==0)}">增值服务</a>
							<a ng-click="orderMaster(item.order_sn,'endService',2)" class="weui-btn weui-btn_default weui-btn_mini btn-t text-font2 mar-r2 mar-t0 hide"
								ng-class="{'show1':(item.service_status==2&&(item.pay_status==2)&&item.master_confirm==0)}">完成服务</a>
							<p  class="weui-btn weui-btn_default weui-btn_mini btn-t text-font2 mar-r2 mar-t0 hide"
								ng-class="{'show1':(item.service_status==2&&(item.pay_status==2)&&item.master_confirm==1)}">等待客户确认完成</p>
						</div>
					</div>
				</div>
				
			</article>
			
		    <div class="weui-loadmore loadMore hide" style="margin-bottom:4rem;">
		        <i class="weui-loading"></i>
		        <span class="weui-loadmore__tips">正在加载</span>
		    </div>
		    <div class="weui-loadmore" ng-hide="false" style="margin-bottom:4rem;">
		        <span class="weui-loadmore__tips">没有更多记录</span>
		    </div>
			
			<!--取消弹出框-->
				<div>
				    <div class="weui-mask1" id="iosMask" style="display:none;"></div>
				    
				    <div class="time_box" id="time_box">
				        <div id="picker-container">
				            <div class="time-border"><input class="weui-input" id="inline" type="text" value="" readonly=""></div>
				        </div>
				        <div class="weui-flex bg-white text-c">
				            <div class="weui-flex__item time-cancel-btn" id="cancel">取消</div>
				            <div class="weui-flex__item time-sure-btn"  id="sure">确认</div>
				        </div>
				    </div>
				    
				</div>
				<!--时间弹出框-->
				<div>
				    <div class="weui-mask1" id="serIosMask" style="display:none;"></div>
				    <div class="time_box" id="time_ser">
				        <div id="ser-container">
				            <div class="time-border"><input class="weui-input" id="time-format" type="text" value="" readonly=""></div>
				        </div>
				        <div class="weui-flex bg-white text-c">
				            <div class="weui-flex__item time-cancel-btn" id="serCancel">取消</div>
				            <div class="weui-flex__item time-sure-btn"  id="serSure">确认</div>
				        </div>
				    </div>
				</div>
			
		</section>
		
		<footer class="weui-tabbar" id="footer">
	        <div class="weui-tabbar" name="footer">
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/masterOrder/masterHome.do">
	                <!--<span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;">8</span>-->
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_home.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2">首页</p>
	            </a>
	            <a  class="weui-tabbar__item " href="${json_config.project_url}/masterOrder/list.do">
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_classify1.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2 sc-text-blue">订单</p>
	            </a>
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/master/center.do">
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_user.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2">我</p>
	            </a>
	        </div>
	    </footer>
	</div>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/userOrder_xr.js?ver=135487845655" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	$('nav.header-content a').each(function(){
        $(this).click(function(){
            var base=$(this).data('base');
            $(this).addClass('header-checked').siblings().removeClass('header-checked');
            $('#'+base).removeClass('hide').siblings("article").addClass('hide');

	});
});
	
</script>