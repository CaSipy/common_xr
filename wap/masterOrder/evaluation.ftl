<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<#--/${json_config.project_name_common}-->
	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/userOrder.css">
</head>
	<body ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">查看评价</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<aside class="weui-panel weui-panel_access fix_containner mar-b0">
			<div class="weui-panel__bd">
				<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
					<div class="weui-media-box__hd u-radius eva_img">
						<img class="weui-media-box__thumb weui-media-box__hd u-radius eva_img" src="{{ user_url }}">
					</div>
					<div class="weui-media-box__bd">
						<h4 class="weui-media-box__title text-font5" ng-bind="user_name"></h4>
						<p class="weui-media-box__desc text-font2" ng-bind="mobile"></p>
					</div>
				</a>
			</div>
		</aside>
		<section class="bg-white">
			<header id="starEva" class="starEva">
				<span class="icon-star eva_star" ng-class="{'eva_active':estimate_level>=1}"></span>
				<span class="icon-star eva_star" ng-class="{'eva_active':estimate_level>=2}"></span>
				<span class="icon-star eva_star" ng-class="{'eva_active':estimate_level>=3}"></span>
				<span class="icon-star eva_star" ng-class="{'eva_active':estimate_level>=4}"></span>
				<span class="icon-star eva_star" ng-class="{'eva_active':estimate_level>=5}"></span>
			</header>
			<figure class="eva_figure">
				<div class="weui-cells weui-cells_form eva_trea_M pad-all2 text-font3" ng-bind="content">
					
					
				</div>
			</figure>
		</section>
		<a href="javascript:window.history.go(-1);" class="weui-btn margin-auto weui-btn_primary eva_btn bg-qblue width90">确定</a>
<#include "../inc/foot.ftl"/>
	<script src="http://common.huibaoming.cn/jquery/jquery.js"></script>
	<script src="http://common.huibaoming.cn/jquery-weui/js/jquery-weui.js"></script>
	<script src="http://common.huibaoming.cn/jquery-weui/js/city-picker.js"></script>
	<script src="http://common.huibaoming.cn/swiper/js/swiper.js"></script>
	
	<script type="text/javascript">
		var order_sn="${order_sn}";
		function calculate(obj){
			
			if($(obj).val().length>$(".eva_num_all").html()){
				$.toast("文字超过限制","forbidden");
				
				$(obj).val($(obj).val().substring(0,$(".eva_num_all").html()));
			}else{
				$('#eva_num').html($(obj).val().length);
			}
		}
		
	</script>
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/evaluation.js"></script>
