 <#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
		<#-- ${json_config.project_name_common}/ -->
		<!--当前项目样式引用 -->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/join.css">
	    
	    <script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>
	    <script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
		<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
	    <script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/enterInfo.js?ver=1222555" type="text/javascript" charset="utf-8"></script>
	    
	    <script>
	    	json = {};
	    </script>
	    
</head>
	<body ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">填写认证资料</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<div class="weui-cells weui-cells_form bg-wechat fix_containner mar-b0">
			<!--姓名-->
			<div class="weui-cell bg-white mar-t3 cancle">
				<div class="weui-cell__hd"><label class="weui-label text-font4">姓名</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" placeholder="请输入您的真实姓名" id="name" type="text"  ng-model="en_name"/>
				</div>
			</div>
			<!--手机号码-->
			<div class="weui-cell bg-white text-font4">
				<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" id="phone" type="number" placeholder="请输入手机号码" required="required" ng-model="en_phone"/>
				</div>
			</div>
			<!--身份证-->
			<div class="weui-cell bg-white">
				<div class="weui-cell__hd"><label class="weui-label text-font4">身份证号</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" id="yzm" type="text" placeholder="请输入您的身份证" required="required" ng-model="en_idCard"/>
				</div>
			</div>
		
			<!--银行卡号-->
			<div class="weui-cell bg-white mar-t3 cancle">
				<div class="weui-cell__hd"><label for="name" class="weui-label text-font4">银行卡号</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" type="text" placeholder="请输入您的银行卡号" ng-model="en_bankNum"/>
				</div>
			</div>
			<!--持卡人姓名-->
			<div class="weui-cell bg-white">
				<div class="weui-cell__hd"><label for="name" class="weui-label text-font4">持卡人姓名</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" type="text" placeholder="请输入您的持卡人姓名" ng-model="en_bankName"/>
				</div>
			</div>
			
			<!--身份证-->
			<div class="weui-cell bg-white">
				<div class="weui-cell__hd"><label class="weui-label text-font4">保险单号</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" type="text" placeholder="请输入您的保险单号（选填）" ng-model="en_insurance">
				</div>
			</div>
			
			<!--专业领域-->
			<div class="weui-cell bg-white mar-t3 cancle">
				<div class="weui-cell__hd"><label class="weui-label text-font4">专业领域</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3"  id='picker' type="text" placeholder="请选择专业领域" readonly="readonly" ng-model="en_selProfessional">
				</div>
			</div>
			<div class="weui-cell bg-white">
				<div class="weui-cell__hd"><label class="weui-label text-font4">专业领域</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input text-font3" type="text" placeholder="请填写详细专业领域(选填)" ng-model="en_writeProfessional">
				</div>
			</div>
			<!--服务区域-->
			<div class="weui-cell bg-white mar-t3 ">
				<div class="weui-cell__hd"><label class="weui-label text-font4">服务区域</label></div>
			</div>
			<div class="weui-cell bg-white ">
				<div class="weui-cell__hd"><label class="weui-label text-font3">省</label></div>
				<div class="weui-cell__bd">
					<input id="province" class="weui-input text-r text-font3 sc-text-gray" type="text"  value="" placeholder="请选择省"  ng-model="province" readonly="">
				</div>
			</div>
			<div class="weui-cell bg-white ">
				<div class="weui-cell__hd"><label class="weui-label text-font4">市</label></div>
				<div class="weui-cell__bd">
					<input id="city" class="weui-input text-r text-font3 sc-text-gray" type="text" placeholder="请选择市"   value=""  ng-model="city" readonly="">
				</div>
			</div>
			<div class="weui-cell bg-white">
				<div class="weui-cell__hd"><label for="name" class="weui-label text-font3">地区</label></div>
				<div class="weui-cell__bd">														
					<input id="area" class="weui-input text-r text-font3 sc-text-gray" type="text"  value="" placeholder="请选择服务地区"  ng-model="area" readonly="">
					<iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></div>
			</div>
		</div>
		<!--上传图片-->
		<article class="weui-cells weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__hd">
							<p class="weui-uploader__title text-font4">上传身份证（必传）</p>
						</div>
						<div class="weui-flex">
							<div class="text-c flex_item1 margin-auto">
								<ul class="weui-uploader__files idCardImg" style="position: relative;" ng-if="positive_idCard">
									<!--预览图-->
									<div style="background: url({{positive_idCard}}) center no-repeat; background-size: cover;" class="img_item"></div>
                       				<div ng-click="positive_idCard_del()" class="del_icon icon-remove" style="cursor:pointer"></div>
           						</ul>
								<div class="weui-uploader__input-box idCardImg" id="heads_div">
									<input id="heads" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().positive_idCard_upload(this.files)">
								</div>
								<p class="idCardP">上传正面照</p>
							</div>
							<div class="text-c flex_item1 margin-auto">
								<ul class="weui-uploader__files idCardImg" style="position: relative;" ng-if="reverse_idCard">
           							<!--预览图-->
           							<div style="background: url({{reverse_idCard}}) center no-repeat; background-size: cover;" class="img_item"></div>
           							
                       				<div ng-click="reverse_idCard_del()" class="del_icon icon-remove" style="cursor:pointer"></div>
           						</ul>	
								<div class="weui-uploader__input-box idCardImg" id="tails_div">
									<input id="tails" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().reverse_idCard_upload(this.files)">
								</div>
								<p class="idCardP">上传反面照</p>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</article>
		<!--上传证件-->
			<article class="weui-cells weui-cells_form" style="margin-top: .6rem;">
				<div class="weui-cell">
					<div class="weui-cell__bd">
						<div class="weui-uploader">
							<div class="weui-uploader__hd">
								<p class="weui-uploader__title text-font4">上传相关证件照（选传）</p>
								<!--<div class="weui-uploader__info"><b>1</b>/3</div>-->
							</div>
							<div class="weui-uploader__bd">
								<ul class="weui-uploader__files addS_img" style="position: relative; margin-top: .5rem;" ng-if="others_card">
           							<!--预览图-->
           							<div style="background: url({{others_card}}) center no-repeat; background-size: cover;" class="img_item1 margin-auto"></div>
           							
                       				<div ng-click="others_card_del()" class="del_icon1 icon-remove" style="cursor:pointer"></div>
           						
           						</ul>
								<div class="weui-uploader__input-box addS_img" id="other_div">
									<input id="others" class="weui-uploader__input" type="file" accept="image/*" multiple="" capture="camera" file-model="images" onchange="angular.element(this).scope().others_card_upload(this.files)">
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		<aside class="idCAside">
			<input type="checkbox" name="" id="" value="服务协议" ng-model="agreement" /><b class="open-popup" style="color:#008cd7;" ng-click="showAgreement()">服务协议</b>
		</aside>
		<a class="weui-btn weui-btn_primary width90 mar-t3 mar-b5 bg-qblue"  ng-click="save()" >提交</a>
	
		
		
		<section id="popup_agreement" class="weui-popup__container" style="z-index:1000;">
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
					            <div class="agr_title" id="msg" style="padding-left:5%;padding-right:5%;width:100%;box-sizing: border-box;"></div>
					        </section>
					    </div>
					    <a  class="weui-btn weui-btn_default close-popup detail_btn" style="margin-bottom: 1rem;">关闭</a>
					</div>
			</div>
		</section>
		
<#include "../inc/foot.ftl"/>