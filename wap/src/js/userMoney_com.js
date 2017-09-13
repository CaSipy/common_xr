$(function(){
	//---userCenter页面--------------------------------------
	//	输入金额
	var str = '';
	var Newstr = '';
	$("a[name='btn_num']").each(function() {
		$(this).click(function() {
			var reg = /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			if(str == '' && $(this).children('p').html() == '.') {
				str = '0.';
				$('#money').val(str);
			}
			else {
				str += $(this).children('p').html();
			}
			if(!reg.test(str)) {
				if(str.indexOf('.') >= 0) {
					var arr = str.split('.');
					if(arr[1].length > 2) {
						arr[1] = arr[1].substring(0, 2);
					}else{
						arr[1]=arr[1];
					}
					str = arr[0] + '.' + arr[1];
				}else{
					str=str;
				}
				$('#money').val(str);
				console.log(str);
				
			} else {
				$('#money').val(str);
				
			}
		});
	});
	//	删除
	$('#backspace').click(function() {
		str = $('#money').val();
		str = str.substring(0, str.length - 1);
		$('#money').val(str);
	});
	
//-----------------------------------	
/*	//判断身份
	if(身份=='普通会员'){
		$('#d0').addClass('hide');
	}else if(身份=='vip会员'){
		$('#d0').removeClass('hide');
	}
*/	
	//	点击生成二维码时
//	普通会员
	$(".affirm").each(function() {
		$(this).click(function() {
			
			Newstr=$('#money').val();
			if(Newstr<20){
				$.toast("单笔不少于20", "forbidden");
			}else if(Newstr>50000){
				$.toast("单笔不大于5w", "forbidden");
			}else{
//				监听点击了什么付款
				alert($(this).find('p').html());
//				取到的最后的值
				alert(parseFloat(Newstr));
//				手续费
				var a='';
				if($(this).find('p').html()=='银联卡付款'){
					a=(Newstr*0.006).toFixed(2);
					$('#handing_charge').html(a);
				}else{
					a=(Newstr*0.004).toFixed(2);
					$('#handing_charge').html(a);
				}
				window.location.href="erweima.html"
			}
		});
	});
});