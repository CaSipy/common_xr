		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
	    <link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/order.css?ver=11">
	</head>
	<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
			<!--头部-->
			<header class="back-header weui-flex bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue">下单</h1>
				<a class="flex_item1 header-right  sc-text-blue"></a>
			</header>
			<address class="fix_containner mar-b0">
				<div class="weui-cells cancle mar-t0" style="border-bottom:.2rem solid #666666">
					<a class="weui-cell weui-cell_access" href="javascript:;" style="height:3.5rem" ng-click="jumpToAddress()">
						<div class="weui-cell__hd mar-r2">
							<img src="http://common.huibaoming.cn/wap/images/location.png" alt="" style="width:20px;margin-right:0rem;margin-left:.15rem;display:block">
							<p class="text-font2 mar-t1" style="font-style: normal;">地址</p>
						</div>
						<div class="weui-cell__bd mar-l2">
							<p class="text-font5">
							<p class="text-font5">
								<!--用户名-->
								<span class="text-weight2 mar-r2" ng-bind="user_name"></span>
								<!--用户手机号码-->
								<span class="text-font4" ng-bind="phone"></span></p>
								<!--用户地址-->
							<p class="text-font3 sc-text-tab text-astrict showLine-2 mar-t1" ng-bind="address"></p>
						</div>
						<div class="weui-cell__ft mar-l4"></div>
					</a>
				</div>
			</address>
			<section class="section_padB">
				<!--选择时间-->
				<article class="weui-cell bg-white con_time">
			        <div class="weui-cell__hd">
			        	<label for="time-format" class="weui-label text-font4">
			        		<i class="fa fa-clock-o time_i"></i>
			        		服务日期
			        	</label>
			        </div>
					<div class="weui-cell__bd">
						<input class="weui-input text-r sc-text-tab" id="time-format" type="text"  ng-model="service_time">
					</div>
			    </article>
			    <!--商品块--><!-- 请后台人员自己加上这一块ng-的绑定-->
			    <article>
					<figure class="weui-panel__bd bg-white">
					    <div class="weui-cell weui-flex">
							<div class="weui-cell__bd flex_item3">
								<p class="text-font4">
									<span ng-bind="title"></span>
								</p>
							</div>
							<div class="weui-cell__ft text-font3 sc-text-gray bc-text mar-r2 text-l flex_item1 text-astrict" >x<span ng-bind="number"></span></div>
							<!--点击数量-->
						    <div class="gw_num flex_item3">
								<span class="jian" ng-click="reduce()">-</span>
								<input type="number" value="1" class="num" oninput="control_length(this)" ng-model="number" ng-change="control_num(this)" >
								<span class="add" ng-click="add()">+</span>
							</div>
							<div class="weui-cell__ft text-font3 bc-text flex_item2">￥<span ng-bind="price"></span></div>
						</div>
					</figure>
					<!--抵扣券-->
					<figure class="weui-cells mar-t0 figure" ng-click="showCoupon()">
				         <a class="weui-cell weui-cell_access pad-t0 pad-b0" href="javascript:;">
							<div class="weui-cell__bd text-font3">
								<p>抵扣券</p>
							</div>
							<div class="weui-cell__ft text-font2"><span  ng-bind="deduction"></span>&nbsp;
								有<span ng-bind="deduction_num">一</span>张券可用</div>
						</a>
					</figure>
					<!--积分抵扣-->
					<figure class="weui-cells mar-t0 figure">
				        <div class="weui-cell pad-t0 pad-b0">
							<div class="weui-cell__hd text-font3">
								<p>积分抵扣</p>
							</div>
							<div class="weui-cell__bd">
								<input type="number" class="weui-input text-r text-font3 input_num Score" placeholder="请输入数值" ng-model="score" ng-keyup="control_score(Score)" />
							</div>
							<div class="weui-cell__ft bc-text text-font2 mar-l3">积分</div>
						</div>
					</figure>
					<!--积分抵扣-->
					<figure class="weui-cells mar-t0 figure">
				        <div class="weui-cell pad-t0 pad-b0">
							<div class="weui-cell__hd text-font3">
								<p>余额抵扣</p>
							</div>
							<div class="weui-cell__bd">
								<input type="number" class="weui-input text-r text-font3 input_num balance" placeholder="请输入数值" ng-model="balance" ng-keyup="control_balance(balance)" />
							</div>
							<!--<div class="weui-cell__ft bc-text text-font2 mar-l3 sc-text-blue" ng-click="allIn()">全部</div>-->
						</div>
					</figure>
					<!--订单价格-->
					<figure class="weui-cells mar-t0 figure">
						<div class="weui-cell pad-t0 pad-b0">
							<div class="weui-cell__bd">
								<p class="text-font4 sc-text-gray " >
									<span>订单￥<b ng-bind="serve_func_order"></b></span>
									<span class="text-font3">优惠￥<b ng-bind="cheap"></b></span>
								</p>
							</div>
							<div class="weui-cell__ft text-font3 bc-text mar-r2">待支付</div>
							<div class="weui-cell__ft text-font3 bc-text sc-text-warning">￥<span ng-bind="payment_money"></span></div>
						</div>
					</figure>
				</article>
				<!--选择支付方式-->
				<article class="weui-cells weui-cells_radio mar-t5">
					<!--循环支付方式-->
					<label class="weui-cell weui-check__label" for="x{{$index}}" ng-repeat="payitem in payments_list" >
						<div class="weui-cell__hd"><img ng-src="${json_config.oss_common_url}/{{payitem.logo}}" style="width:1.5rem; height:1.5rem;"></div>
						<div class="weui-cell__bd">
							<p ng-bind="payitem.name"></p>
						</div>
						<div class="weui-cell__ft">
							<input type="radio" class="weui-check" name="radio1" id="x{{$index}}"  ng-checked="$index==0" ng-click="gainID($index)">
							<span class="weui-icon-checked"></span>
						</div>
					</label>
				</article>
				<!--上传图片-->
				<article class="weui-cells weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__hd">
							<p class="weui-uploader__title text-font4">上传图片</p>
						</div>
						<div class="weui-flex">
							<div class="text-c flex_item1 margin-auto">
								<ul class="weui-uploader__files idCardImg" ng-if="pic1" style="position: relative;">
									<!--预览图-->
									<div style="background: url({{pic1}}) center no-repeat; background-size: cover;" class="img_item"></div>
                       				<div ng-click="pic1_del()" class="del_icon icon-remove" style="cursor:pointer"></div>
           						</ul>
								<div class="weui-uploader__input-box idCardImg" id="heads_div" style="width: 94%;margin-left: 3%;">
									<input id="heads" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().pic1_upload(this.files)">
								</div>
							</div>
							<div class="text-c flex_item1 margin-auto">
								<ul class="weui-uploader__files idCardImg" ng-if="pic2"style="position: relative;">
           							<!--预览图-->
           							<div style="background: url({{pic2}}) center no-repeat; background-size: cover;" class="img_item"></div>
                       				<div ng-click="pic2_del()" class="del_icon icon-remove" style="cursor:pointer"></div>
           						</ul>	
								<div class="weui-uploader__input-box idCardImg" id="tails_div" style="width: 94%;margin-left: 3%;">
									<input id="tails" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().pic2_upload(this.files)">
								</div>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</article>
				<!--文本域-->
				<article class="weui-cells weui-cells_form pad-b3">
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<div class="weui-uploader">
								<div class="weui-uploader__hd">
									<p class="weui-uploader__title">文字说明</p>
								</div>
								<div class="weui-cell hx-abr  eva_trea ">
									<div class="weui-cell__bd">
										<textarea class="weui-textarea text-font3" placeholder="请输入文本" rows="3" onkeyup="calculate(this)" ng-model="desc"></textarea>
										<div class="weui-textarea-counter text-font3"><span id="eva_num">0</span>/<span class="eva_num_all" ng-bind="zishu"></span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</article>
				<aside class="idCAside">
					<input type="checkbox" name="" id="" value="服务协议" ng-model="agreement" class="ng-pristine ng-untouched ng-valid ng-empty">
					<a ng-click="showDetail()" class="text-font2 sc-text-blue mar-l2">服务协议</a>
				</aside>
				<!--弹出框-->
				<article id="popup_detail" class="weui-popup__container" style="z-index: 10000;top: 0;">
					<header class="back-header weui-flex bg-white header_bBor">
						<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue close-popup" ng-click="closePop()">关闭</span>
						<h1 class="back-header-h1 flex_item4 sc-text-blue">服务协议</h1>
						<a class="flex_item1 header-right  sc-text-blue"></a>
					</header>
  					<div class="weui-popup__modal">
  						<div class="fix_containner">
						    <div class="agreement_name">
						        <p class="text-font5"><span class="icon icon-info-sign active mar-r2" style="font-size:1.5rem;vertical-align: middle;"></span><b class="text-font5">用户条款详情</b></p>
						    </div>
						    <!--正文内容-->
						    <div class="agreement_contain">
						        <section>
						            <div class="agr_title" id="msg" style="padding-left:5%;padding-right:5%;width:100%;box-sizing: border-box;" ></div>
						        </section>
						        
						    </div>
						    <a href="javascript:;" class="weui-btn weui-btn_default close-popup detail_btn width90" style="margin-bottom: 1rem;">关闭</a>
						</div>
  					</div>
  				</article>
			</section>
			<!--卡券弹出层-->
			<section id="popup_agreement" class="weui-popup__container bg-white" style="z-index:1000;">
				<div class="weui-popup__overlay"></div>
				
 				<div class="weui-popup__modal" id="x1">
 					<header class="back-header weui-flex bg-white header_bBor">
						<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue close-popup" ng-click="closeCoupon()">关闭</span>
						<h1 class="back-header-h1 flex_item4 theme_sc close-popup sc-text-blue">优惠券</h1>
						<a href="javascript:;" class="flex_item1 header-right sc-text-blue"></a>
					</header>	
					<nav class="" style="margin-top: 2.7rem">
						<div class="classify_nav1">
							<ul class="bg-white weui-flex">
								<li class="flex_item1" ng-repeat="item in type_list" ng-bind="item.nav_name" ng-class="{'nav_li_checked':choose==$index}" ng-click="changeCouponList($index)"></li>
							</ul>
						</div>
					</nav>
					<aside class="cpS_sec bg-white">
						<figure class="cp_figNew weui-flex fig_active" ng-repeat="item in coupon_list"  ng-class="{fig_unuser:item.check_status!='SUCCESS',fig_active:item.user_status!='user'}" ng-click="exchange($index)" >
							<div class="flex_item3 text-c figS_Lsize">
								<p class="mar-t0">￥{{item.money}}</p>
								<b class="text-font3">剩余使用次数:
									<i class="text-font4">{{item.times}}次</i>
								</b>
							</div>
							<div class="flex_item4 fig_Rsize">
								<header class="text-c">{{item.title}}</header>
								<article class="fig_RartNew">
									<p>{{item.begin_day}}至{{item.end_day}}</p>
								</article>
							</div>
						</figure>
						<div class="weui-loadmore loadMore hide">
							<i class="weui-loading"></i>
							<span class="weui-loadmore__tips">正在加载</span>
						</div>
						<div class="weui-loadmore" ng-hide="has_data">
							<span class="weui-loadmore__tips">没有更多卡券了哦</span>
						</div>
					</aside>
				</div>
				
			</section>
			<footer id="goods_lan" class="weui-flex con_footer">
	            <div class="flex_item3 text-l">
	               <p class="mar-l5  bc-text-header"> 
	               		<span class="text-rfont035">待支付: </span>
	               		<span class="text-rfont04">￥<b ng-bind="payment_money"></b></span>
	               </p>
	            </div>
	            <div class="flex_item2 text-c">
	                <p class="bc-text-header text-rfont04 footer_btn1" ng-click="submit_choose()">选择师傅</p>
	            </div>
	            <div class="flex_item2 text-c">
	                <p class="bg-qblue bc-text-header text-rfont04" style="height:3rem; line-height:3rem;" ng-click="submit()">提交发布</p>
	            </div>
	       </footer>   
		</div>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/order.js?ver=201706466666" type="text/javascript" charset="utf-8"></script>

