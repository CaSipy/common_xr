 <#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/userMoney_transfer.js?ver=201705151603"></script>
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/userMoney.css?ver=2017051705">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">

</head>
<body ng-app="app" ng-controller="ctrl" class="bg-wechat">
	<!--头部-->
		<header class="back-header weui-flex">
			<span class="back-header-icon icon-chevron-left flex_item1" onclick="javascript:window.history.go(-1);">返回</span>
			<h1 class="back-header-h1 flex_item4" ng-bind="json.nav_title"></h1>
			<a class="flex_item1 header-right"></a>
		</header>
		
		<!--提现到银行卡-->
		<div class="fix_containner">
			<div class="  account-contain box-top">
				<div>
					<span>对方账户</span><input type="text" placeholder="账号ID" ng-model="user_name">
				</div>
			</div>
			<div class="star-con margin-auto bg-white pad-b3">
				<div class="msg-pad1 pad-t4" ng-show="is_user_payment_id">
					<span class="text-font2" ng-bind="json.nav_title+'方式'"></span>
					<span class="text-font2 bank-textColor mar-l4"  ng-click="submit()" ng-bind="pay_type"></span>
				</div>
				
				<!--输入价钱-->
				<div class=" bg-white pad-b1 pad-t1 pad-l2">
					<div class="weui-cells__title cancle mar-all0 pad-t4 text-font2" ng-bind="json.nav_title+'币数'"></div>
					<div class="weui-cells cancle mar-t2" ng-show="is_input_money">
						<div class="weui-cell">
							<div class="weui-cell__bd text-font5 bank-inputBrb" ng-click="keyboard()">
								<input class="weui-input hx-abr-none width90 input-size" id="money" type="text" disabled ng-model="money">个
							</div>
						</div>
					</div>
				</div>
				
				<div class="weui-cells__title cancle mar-all0 pad-t1 pad-b1 text-font2">
					全部币数:<b class="text-weight" ng-bind="json.user_finance[class_name+'1']"></b>,
					可转账币数:<b class="text-weight" ng-bind="json.user_finance[class_name]"></b>
				</div>
			</div>
			<a href="javascript:;" class="weui-btn weui-btn_primary mar-t3 bank-btn text-font3 mar-b3" ng-click="createOrder()" ng-bind="json.nav_title"><!--下一步--></a>

		</div>
		<!--键盘弹出框-->
		<div id="keyboard" class="weui-popup__container popup-bottom">
        			<div class="weui-popup__overlay"></div>
        			<div class="weui-popup__modal" style="overflow:inherit;background:#F8F8F8">
        				<div class="weui-grids bg-white">
        					<div class="close_keyboard" ng-click="closePopup()"><sapn class="icon icon-angle-down text-font5 close-popup"></sapn></div>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">1</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">2</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">3</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">4</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">5</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">6</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">7</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">8</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">9</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3 backspace" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">.</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
        						<p class="weui-grid__label text-weight3 calculat_font">0</p>
        					</a>
        					<a href="#" class="weui-grid js_grid pad-t3 pad-b3 backspace" id="backspace">
        						<p class="weui-grid__label text-weight3 calculat_font">x</p>
        					</a>
        				</div>
        			</div>
        		</div>
		<!--弹出框-->
		<div id="about" class="weui-popup__container  popup-bottom" ng-show="is_user_payment_id">
			<div class="weui-popup__overlay weui-popup-overlay"></div>
			<div class="weui-popup__modal" style="overflow:inherit;background:#F8F8F8">
				<!--关闭按钮-->
				<span class="toclose close-popup">关闭</span>
				<!--头部区域-->
				<div class="popup-title">
					<span  ng-bind="'选择'+json.nav_title+'方式'"></span>
				</div>
				<!--选择区域,可垂直滚动-->
				<article class="weui-cells weui-cells_radio mar-t5">
					<label class="weui-cell weui-check__label" for="x1{{$index}}"  ng-repeat="item in json.payments">
						<div class="weui-cell__hd"><img src="{{json_config.oss_common_url}}/{{item.logo}}" style="width:1.5rem; height:1.5rem;"></div>
						<div class="weui-cell__bd">
							<p ng-bind="item.name"></p >
						</div>
						<div class="weui-cell__ft">
							<input type="radio" class="weui-check" name="radio1" id="x1{{$index}}" ng-click="chose(item.name,item.id)">
							<span class="weui-icon-checked"></span>
						</div>
					</label>
				</article>
				<!--底部按钮区域-->
				<div class="footer-fixed"> 
					<div class="btn-sure bg-green bc-text-header close-popup">确认</div>
				</div>
			</div>

		</div>
<#include "../inc/foot.ftl"/>