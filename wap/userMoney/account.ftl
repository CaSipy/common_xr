<#include "../inc/head_base.ftl"/>
	
	
	</head>
	
<body>
   <title>修改</title>

</head>
<body">
	<div style="width:80%;margin:0 auto">
	   <div style="text-align:center;margin-top: 30px;">
	   	
		 <form id="ff" method="post" >
	    	<table cellpadding="5" style="margin:0 auto">
	    		<div hidden>
	    			<input class="easyui-textbox" type="text" id="deal_id" name="deal_id" value="${deal_id}" input_name="商品id" style="width:250px;height:32px;" hidden></input>
		   			<input class="easyui-textbox" type="text" id="user_id" name="user_id" value="${user_id}" input_name="用户名id" style="width:250px;height:32px;" hidden></input>
	    		</div>
				<#list money_payments as item>
		   		<tr>
		   			<td><span style="font-size:16px;">${item.name}:</span></td>
		   			<td>
		   				<input class="easyui-textbox diyinput" type="text" id="${item.class_name}" input_name="${item.name}" name="${item.class_name}" value="0" style="width:250px;height:32px;"></input>
		   			</td>
		   		</tr>
		   		</#list>
			</table>
	   	</form>
	   </div>
	    <div style="text-align:center;padding:5px;font-size:18px;">
	    	<#if deal_id==9><a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()" >确认抹账</a></#if>
	    	<#if deal_id==8><a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()" >确认冲账</a></#if>
	    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">重置</a>
	    </div>
    </div>

  
 
	
 <script>
 function submitForm(){
		var flag = true;
		$('.diyinput').each(function(){
			if(!$(this).val()){
				alert($(this).attr("input_name")+"不能为空");
			}
		});
		
		
		if(flag){
		
			var url = "${domain_url}/finance/userMoney/doAccount.do";
			var data = $("#ff").serialize();
			console.log(data)
			$.ajax({
				url:url,
				type:'post',
				dataType:"json",
				data:data,
				success:function(rs){
					if(rs.err_code==-1){
						slide_message(rs.err_msg);
						$('#win').window('close');
						$('#tt').datagrid('load'); 
					}else{
						slide_message(rs.err_msg);
					}
				}
			});
		
		}
	}
	function clearForm(){
		$('#ff').form('clear');
	}
 </script>
</body>