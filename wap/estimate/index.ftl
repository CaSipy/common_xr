		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
	    <link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/estimate.css">
	</head>
	<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">评价师傅</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<aside class="weui-panel weui-panel_access fix_containner mar-b0">
			<div class="weui-panel__bd">
				<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
					<div class="weui-media-box__hd u-radius eva_img">
						<img class="weui-media-box__thumb weui-media-box__hd u-radius eva_img" src="http://common.huibaoming.cn/wap/images/banner1.jpg">
					</div>
					<div class="weui-media-box__bd">
						<h4 class="weui-media-box__title text-font5" ng-bind="master_name"></h4>
						<p class="weui-media-box__desc text-font2" ng-bind="'电话号码:'+master_mobile"></p>
					</div>
				</a>
			</div>
		</aside>
		<section class="bg-white">
			<article class="eva_say">
				
			</article>
			<header id="starEva" class="starEva">
				<span class="icon-star eva_star" ng-click="star(1);" ng-class="{'eva_active':1<=estimate_level}"></span>
				<span class="icon-star eva_star" ng-click="star(2);" ng-class="{'eva_active':2<=estimate_level}"></span>
				<span class="icon-star eva_star" ng-click="star(3);" ng-class="{'eva_active':3<=estimate_level}"></span>
				<span class="icon-star eva_star" ng-click="star(4);" ng-class="{'eva_active':4<=estimate_level}"></span>
				<span class="icon-star eva_star" ng-click="star(5);" ng-class="{'eva_active':5<=estimate_level}"></span>
			</header>
			<figure class="eva_figure">
				<div class="weui-cells weui-cells_form eva_trea">
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<textarea class="weui-textarea text-font4" placeholder="请输入文本" rows="3" onkeyup="calculate(this)" ng-model="content"></textarea>
							<div class="weui-textarea-counter text-font3"><span id="eva_num">0</span>/<span class="eva_num_all">200</span></div>
						</div>
					</div>
				</div>
			</figure>
		</section>
		<a href="javascript:;" class="weui-btn margin-auto weui-btn_primary eva_btn bg-qblue width90" ng-click="save();">提交</a>
	</body>
	<script type="text/javascript">
		window.onload=function(){
			var idiv=document.getElementById("starEva");
			var isp=idiv.getElementsByTagName("span");
			var odiv=document.getElementsByTagName("article")[0];
			var oD=['"很差"','"较差"','"一般"','"还好"','"推荐"'];
			for(var i=0;i<isp.length;i++){
				isp[i].index=i;
				isp[i].onclick=function(){
					odiv.style.display='block';
					odiv.innerHTML=oD[this.index];
					for(var i=0;i<isp.length;i++){
						isp[i].className='icon-star eva_star';
						for(var j=0;j<=this.index;j++){
						isp[j].className='icon-star eva_star';
						isp[j].className='icon-star eva_star eva_active';
						}
					}
					
					
				}
//				isp[i].onclick=function (){
//					odiv.style.display='none';
//					for(var i=0;i<isp.length;i++){
//						isp[i].className='';
//					}
//				}
				
			}
			
	}
		function calculate(obj){
			
			if($(obj).val().length>$(".eva_num_all").html()){
				$.toast("文字超过限制","forbidden");
				
				$(obj).val($(obj).val().substring(0,$(".eva_num_all").html()));
			}else{
				$('#eva_num').html($(obj).val().length);
			}
		}
		
	</script>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/estimate.js?ver=20170666" type="text/javascript" charset="utf-8"></script>
