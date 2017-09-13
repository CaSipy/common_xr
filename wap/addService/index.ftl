		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		<!--${json_config.project_name_common}-->
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/addSer.css">
	</head>
	<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
		 <!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">增值服务</h1>
			<a class="flex_item1 header-right sc-text-blue" onclick="submit()"></a>
		</header>
		<!--提现到银行卡-->
		<div class="fix_containner">
			<div class="star-con width92 margin-auto bg-white pad-b3 box-top pad-b5">
				<!--<div class="msg-pad1 pad-t4">
					<span class="text-font2">到账银行卡</span>
					<span class="text-font2 bank-textColor mar-l4" id="bank_name" name="bank_name">建设银行(8328)</span>
				</div>-->
				<!--输入价钱-->
				<div class=" bg-white pad-b1 pad-t1 pad-l2">
					<div class="weui-cells__title cancle mar-all0 pad-t4 text-font2">增值服务金额</div>
					<div class="weui-cells cancle mar-t2">
						<div class="weui-cell">
							<div class="weui-cell__bd text-font5 bank-inputBrb" onclick="keyboard()" >
								￥<input class="weui-input hx-abr-none width90 input-size" id="money" type="text" disabled="disabled" ng-model="payment_money">
							</div>
						</div>
					</div>
					
				</div>
				
				<!--<a href="javascript:;" class="weui-btn weui-btn_disabled weui-btn_primary bank-btn hide">不在提现时间内</a>-->
				<!--<div class="msg-pad text-font2 mar-t1 sc-text-tab">本月还可以提现 <b class="bank-time text-weight text-font2" id="bank_time">100</b> 次</div>-->

			</div>
			<article class="weui-cells weui-cells_form pad-b3 width92" style="margin: 1rem auto 1.7rem;">
				<div class="weui-cell">
					<div class="weui-cell__bd">
						<div class="weui-uploader">
							<div class="weui-uploader__hd">
								<p class="weui-uploader__title text-font4">增值说明</p>
							</div>
							<div class="weui-cell addS_bor eva_trea ">
								<div class="weui-cell__bd">
									<textarea class="weui-textarea text-font3" placeholder="请输入文本" rows="3" ng-keyup="calculate(this)" ng-model="desc"></textarea>
									<div class="weui-textarea-counter text-font3"><span id="eva_num" ng-bind="num1">0</span>/<span class="eva_num_all" ng-bind="num2">200</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
			<article class="weui-cells weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__hd">
							<p class="weui-uploader__title text-font4">上传图片</p>
						</div>
						<div class="weui-flex">
							<div class="text-c flex_item1 margin-auto" style="text-align:center;">
								<ul class="weui-uploader__files idCardImg" style="" ng-if="pic1">
									<!--预览图-->
									<img ng-src="{{pic1}}" style="height:77px;width:100px;"/><br />
                       				<span ng-click="pic1_del()" style="cursor:pointer">删除</span>
           						</ul>
								<div class="weui-uploader__input-box idCardImg" id="heads_div" style="width: 94%;margin-left: 3%;">
									<input id="heads" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().pic1_upload(this.files)">
								</div>
							</div>
							<div class="text-c flex_item1 margin-auto" style="width:50%;text-align:center;">
								<ul class="weui-uploader__files idCardImg" ng-if="pic2">
           							<!--预览图-->
           							<img ng-src="{{pic2}}" style="height:77px;width:100px;"/><br />
                       				<span ng-click="pic2_del()" style="cursor:pointer">删除</span>
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
			<a href="javascript:;" class="weui-btn weui-btn_primary mar-t5 bank-btn text-font4 bg-qblue width92" ng-click="increment()">确认增值</a>
		</div>
		<!--键盘弹出框-->
		<div id="keyboard" class="weui-popup__container popup-bottom">
			<div class="weui-popup__overlay"></div>
			<div class="weui-popup__modal" style="overflow:inherit;background:#F8F8F8">
				<div class="weui-grids bg-white">
					<div class="close_keyboard text-c" onclick="closeKeyboard()"><sapn class="icon icon-angle-down text-font5 close-popup"></sapn></div>
					<a class="weui-grid js_grid pad-t3 pad-b3" name="btn_num">
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

	</body>
	<script src="${json_config.oss_common_url}/jquery/jquery.js"></script>
	<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
	<!--<script src="../src/js/userMoney_com.js" type="text/javascript" charset="utf-8"></script>-->
	<!--Start==add src-->
	<script src="${json_config.oss_common_url}/angular/angular.js"></script>
	<script type="text/javascript" src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/addser.js?ver=201706085555" charset="utf-8"></script>
	<!--Stop==add src-->
</html>


