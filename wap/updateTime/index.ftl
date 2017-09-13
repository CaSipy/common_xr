		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
		<script>
			$(function(){
				$.modal({
				  title: "确认是否修改订单",
				  text: "师傅将订单时间${service_time} 改为 ${change_time}",
				  buttons: [
				    { text: "同意", onClick: function(){
				    	var url = "update.do"; 
				    	$.ajax({
							url:url,
							type:'post',
							dataType:"json",
							data:"order_sn=${order_sn}&choose=1",
							success:function(rs){
								if(rs.err_code==-1){
									alert(rs.err_msg);
									setTimeout(function(){
                    					window.location.href="../orderService/orderList.do";
                    				}, 2000);
								}
							}
				    	});
				      }
				    },
				    { text: "不同意", onClick: function(){
				    	var url = "update.do"; 
				    	$.ajax({
							url:url,
							type:'post',
							dataType:"json",
							data:"order_sn=${order_sn}&choose=0",
							success:function(rs){
								if(rs.err_code==-1){
									alert(rs.err_msg);
									setTimeout(function(){
                    					window.location.href="../orderService/orderList.do";
                    				}, 2000);
								}
							}
				    	});
				      }
				    }
				  ]
				});		
			})	
		</script>
</head>