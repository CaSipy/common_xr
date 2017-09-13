		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/join.css"/>
	</head>
	<body ng-app="app" ng-controller="ctrl">
		<div>
			<!--头部-->
			<header class="back-header weui-flex bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue" >个人资料</h1>
				<a href="updateInfo.do" class="flex_item1 header-right sc-text-blue"></a>
			</header>
			<!--主体部分-->
			<section class="fix_containner">
				<article>
					<div class="weui-cells">
						<div class="weui-cell bg-white">
							<div class="weui-cell__hd"><label class="weui-label text-font4">姓名</label></div>
							<div class="weui-cell__bd">
								<input class="weui-input text-font3 text-r sc-text-gray" value="" type="text" ng-model="en_name">
							</div>
						</div>
						<div class="weui-cell bg-white">
							<div class="weui-cell__hd"><label class="weui-label text-font4">手机号</label></div>
							<div class="weui-cell__bd">
								<input class="weui-input text-font3 text-r sc-text-gray" value="" type="text" ng-model="en_phone">
							</div>
						</div>
						<div class="weui-cell bg-white">
							<div class="weui-cell__hd"><label class="weui-label text-font4">银行卡号</label></div>
							<div class="weui-cell__bd">
								<input class="weui-input text-font3 text-r sc-text-gray" value="" type="text" ng-model="en_bankNum">
							</div>
						</div>
						<div class="weui-cell bg-white">
							<div class="weui-cell__hd"><label class="weui-label text-font4">持卡人姓名</label></div>
							<div class="weui-cell__bd">
								<input class="weui-input text-font3 text-r sc-text-gray" value="" type="text" ng-model="en_bankName">
							</div>
						</div>
						<div class="weui-cell bg-white">
							<div class="weui-cell__hd"><label class="weui-label text-font4">保险单号</label></div>
							<div class="weui-cell__bd">
								<input class="weui-input text-font3 text-r sc-text-gray" value="" type="number" ng-model="en_insurance">
							</div>
						</div>
					</div>
				</article>
				<article>
					<!--专业领域-->
					<div class="weui-cell bg-white mar-t3 cancle">
						<div class="weui-cell__hd"><label class="weui-label text-font4">专业领域</label></div>
						<div class="weui-cell__bd">
							<input class="weui-input text-font3 text-r sc-text-gray"  id='picker' type="text" placeholder="请选择专业领域" readonly="readonly" ng-model="en_selProfessional">
						</div>
					</div>
					<div class="weui-cell bg-white">
						<div class="weui-cell__hd"><label class="weui-label text-font4">专业领域</label></div>
						<div class="weui-cell__bd">
							<input class="weui-input text-font3 text-r sc-text-gray" type="text" placeholder="请填写详细专业领域" ng-model="en_writeProfessional">
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
				</article>
				<!--上传证件-->
				<!--<article class="weui-cells weui-cells_form" style="margin-top: .6rem;">
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<div class="weui-uploader">
								<div class="weui-uploader__hd">
									<p class="weui-uploader__title text-font4">上传相关证件照</p>
									
								</div>
								<div class="weui-uploader__bd">
									
									<div class="weui-uploader__input-box addS_img">
										<input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" capture="camera" ng-src="other_card_imgs">
									</div>
								</div>
							</div>
						</div>
					</div>
				</article>-->
			</section>
			<a href="javascript:;" class="weui-btn weui-btn_primary width90 mar-t1 mar-b5 bg-qblue"  ng-click="save()">保存</a>
		</div>
	</body>
	<!--oss脚本接入-->
	<#include "../inc/foot.ftl"/>
	<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
	<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/masterInfo.js?ver=20170612261243" type="text/javascript" charset="utf-8"></script>
</html>
