/**
 * Created by 文文 on 2017/4/25.
 */
var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function ($scope,$http,$filter) {
	/**
     *	获取json数据,服务器返回用来初始化页面的
     */
    if($.isEmptyObject(json)){
        var init_param="?is_json=2";
        var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;

        $http({
            method: 'post',
            url: init_url,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
            
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);

        });
    }else{
        $scope.json=json;
        $scope.json_config=json.json_config;
    }
	
    /************************用户财务报表**********************************/
    $scope.pre_class_name=$scope.json.money.class_name;
	$scope.report_user_finances=$filter('report_user_finances')($scope.json.report_user_finances);
    
    $scope.has_data=true;	//是否有记录展示
    $scope.has_choose_year_month=false;	//是否选择了年月
    /***************************查询的数据********************************/
    $scope.logs=[];
    $scope.page=1;	//第几页
    /*************初始化,年-月-交易类型***************/
    $scope.year_month="";
    $scope.first_type=0;
    $scope.total_income_expenditure="";	//总收入
    $scope.initReportDesc=function(){
    	var year_month_first=$scope.year+"_"+$scope.month+"_"+$scope.first_type;
    	
    	var expenditure="expenditure_"+$scope.pre_class_name;
    	var income="income_"+$scope.pre_class_name;
    	$scope.year_month=$scope.year+"年"+$scope.month+"月";
    	
    	var item = $scope.report_user_finances[year_month_first];
    	if(undefined!=item){
    		$scope.total_income_expenditure="支出￥"+item[expenditure]+" 收入￥"+item[income];
    	}else{
    		 $scope.total_income_expenditure="支出￥0.00  收入￥ 0.00";
    	}
    };
    

    
    
    //组装年份选择器数据
    $scope.getYears=function(system_start_year){
    	 var date=new Date;
    	 var year=date.getFullYear(); 
    	 var year_array=[];
    	 while(year>=system_start_year){
    		 year_array.push(year);
    		 year=year-1;
    	 }
    	 
    	 return year_array;
    };
    $scope.getYearsName=function(system_start_year){
   	 var date=new Date;
   	 var year=date.getFullYear(); 
   	 var year_array=[];
   	 while(year>=system_start_year){
   		 year_array.push(year+"年");
   		 year=year-1;
   	 }
   	 
   	 return year_array;
   };
    
    $scope.year_array=$scope.getYears($scope.json_config.system_start_year);
    $scope.year_array_name=$scope.getYearsName($scope.json_config.system_start_year);	//TODO 暂时不用
    
    /**
     * 选择交易类型时调用
     */
    $scope.changeType = function(new_first_type){
    	$scope.first_type=new_first_type;
    	//console.log("first_type:"+$scope.first_type);
    	//$(".toclose").click();
    	$.closePopup();
    	$scope.page=1;	//先归零
    	$scope.doSearch(false);	//TODO
    }
    
    
    
    /**
     * 搜索
     */
    $scope.doSearch = function(is_append){
		var url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_finance
			+"/"+$scope.json_config.module+"/do"+ $scope.json_config.action+".do";
	
		var json_param={};
		json_param["money_id"]=$scope.json.money.id;
		json_param['page']=$scope.page;
		
		json_param['first_type']=$scope.first_type;
		if($scope.has_choose_year_month){
			json_param['year']=$scope.year;
			json_param['month']=$scope.month;
		}else{
			json_param['year']=0;
			json_param['month']=0;
		}
		
		$http({
            method: 'post',
            url: url,
            data:$.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
        	if(-1==data.data.err_code){
        		var return_data=data.data.data;
        		
        		
        		if(is_append){
                        $scope.logs.push.apply($scope.logs,return_data);
        		}else{
        			$scope.logs=return_data;
        		}
        		$scope.has_data=true;
        		 $scope.initReportDesc();
        	}else{
        		$.toast(data.data.err_msg, "cancel");
        		
        		if(!is_append){
        			$scope.logs=[];
        		}
        		
        		
        	}
        	
        	if($scope.logs.length==[]){
    			$scope.has_data=false;
    		}
        	
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);

        });
    };
    
    //页面初始化加载数据
    $scope.doSearch();
    /*****************************************原界面静态资源*****************************************/
    $scope.submit=function(){
        $("#about").popup();
    }
    


    var $time_box = $('#time_box');
    var $iosMask = $('#iosMask');
    var $cancel = $('#cancel');
    var $sure = $('#sure');

    $('#picker-name').click(function () {
        $iosMask.fadeIn();
        $time_box.css('visibility','visible');
        $time_box.css('opacity',1);
    });
    $iosMask.click(function () {
        $iosMask.fadeOut();
        $time_box.css('opacity',0);
        $time_box.css('visibility','hidden');
    });
    $cancel.click(function () {
        $iosMask.fadeOut();
        $time_box.css('opacity',0);
        $time_box.css('visibility','hidden');
    });
   
    
    $scope.timeCancel=function(){
    	$iosMask.fadeOut();
        $time_box.css('opacity',0);
        $time_box.css('visibility','hidden');
    }
    
    //确认选择时间事件
    $scope.timeSure = function(){
    	$iosMask.fadeOut();
        $time_box.css('opacity',0);
        $time_box.css('visibility','hidden');
        $scope.has_choose_year_month=true;
        $scope.page=1;	//先归零
        $scope.doSearch(false);	//TODO
    };

    //    滚动加载
    var loading = false;  //状态标记
    $(document.body).infinite().on("infinite", function() {
        $('.weui-loadmore').removeClass('hide');
        if(loading) return;
        loading = true;
        setTimeout(function() {
        	$scope.page=$scope.page+1;
        	$scope.doSearch(true);	//TODO
            $('.weui-loadmore').addClass('hide');
            loading = false;
        }, 1500);   //模拟延迟
    });
    
    
    
    $scope.first_types=$filter('filterFirstTypes')($scope.json.first_types);
    
    $scope.getShowPic=function(first_type,user_pic){
    	var show_pic=$scope.json_config.oss_common_url+"/wap/images/icon/"+$scope.first_types[first_type].action+".png";
    	/*if(first_type==3 || first_type==4){
    		if(""!=user_pic){
    			show_pic=user_pic;
    		}
    	}*/
    	if("none"!=user_pic){
			show_pic=user_pic;
		}
    	
    	//console.log("show_pic:"+show_pic);
    	return show_pic;
    };
    
    /**
     * 日志展示的函数
     * first_type:本条记录的首位交易码
     */
    $scope.getShowLogDesc=function(first_type,log_info){
    	var log_desc=$scope.first_types[first_type].name;
    	
    	if("none"!=log_info){
    		log_desc=log_desc+log_info;
		}
    	return log_desc;
    }
    
    //暂时的标题
    $scope.getShowTitle=function(){
    	if($scope.first_type==0){
    		return $scope.json.nav_title;
    	}else{
    		return $scope.json.nav_title+"-"+$scope.first_types[$scope.first_type].name;
    	}
    };
    
    
    //关闭弹出框
	$scope.closePopup=function(){
		$.closePopup();
	}

    if($scope.json.report_user_finances.length>0){
        $scope.year=$scope.json.report_user_finances[0].year;	//搜索的年份
        $scope.month=$scope.json.report_user_finances[0].month;	//搜索的月份

        $scope.initReportDesc();
    }else{
        $scope.year=0;	//搜索的年份
        $scope.month=0;	//搜索的月份
        $scope.total_income_expenditure="支出￥0.00  收入￥ 0.00";
    }


    //时间筛选弹出js-------------------------------------------------------------
    $("#inline").picker({
        container: '#picker-container',
        //默认值设置
        value:[$scope.year,$scope.month],
        cols: [
            {
                textAlign: 'center',
                values: $scope.year_array,
                //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
            },
            {
                textAlign: 'center',
                values: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
            }
        ],
        onChange:function (data) {
            var year_value=data.value[0];
            var month_value=data.value[1];
            //console.log("year_value:"+year_value);
            //console.log("month_value:"+month_value);

            $scope.year=year_value;
            $scope.month=month_value;
        }
    });
});


kmy_app.filter('filterFirstTypes',function(){
    return function(inputArray){
        var array = {};
        for(var i=0;i<inputArray.length;i++){
            array[inputArray[i].id]=inputArray[i];
        }
        return array;
    }
});

/**
 * 格式化用户财务报表数据
 */
kmy_app.filter('report_user_finances',function(){
    return function(inputArray){
        var reports = {};
        for(var i=0;i<inputArray.length;i++){
        	reports[inputArray[i].year_month_first_type]=inputArray[i];
        }
        return reports;
    }
});


/**
 * [2017,2016]
 */
kmy_app.filter('report_year',function(){
    return function(inputArray){
        var reports = {};
        for(var i=0;i<inputArray.length;i++){
        	reports.push(inputArray[i].year);
        }
        return reports;
    }
});

/**
 * {
 * 	2017:[5,6],
 * 	2016:[]
 * }
 */
kmy_app.filter('report_year_month',function(){
    return function(inputArray){
        var reports = {};
        for(var i=0;i<inputArray.length;i++){
        	reports.push(inputArray[i].year);
        }
        return reports;
    }
});