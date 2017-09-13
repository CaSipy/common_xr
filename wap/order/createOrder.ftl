		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
	    <link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}//wap/src/css/wap.css">
		<script>
		<#if error_msg?exists>
		if("${error_msg.err_code?if_exists}" == "-1"){
			if(confirm("下单"+"${error_msg.err_msg?if_exists}")){
				if("${is_release?if_exists }" == "0"){
					window.location.href="../selMaster/index.do?order_sn=${order_sn?if_exists}";
				}else{
					window.location.href="../orderService/release.do?order_sn=${order_sn?if_exists}";
				}
			}else{
				window.history.go(-1);
			};
		}else{
			if(confirm("${error_msg.err_msg?if_exists}")){
				window.history.go(-1);
			}else{
				window.history.go(-1);
			};
		};
		</#if>
		</script>
</head>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>	  