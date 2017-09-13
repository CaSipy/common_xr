	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
    <!--<link rel="stylesheet" href="http://common.huibaoming.cn/font-awesome/css/font-awesome.css">
	    <link rel="stylesheet" href="http://common.huibaoming.cn/jquery-weui/css/weui.css">
	    <link rel="stylesheet" href="http://common.huibaoming.cn/jquery-weui/css/jquery-weui.css">-->
	    <!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/indent.css?ver=12">
</head>
<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
    
    <div class="">
        <!-- 容器 -->
        <div class="weui-tab">
            <nav class="weui-navbar">
                <a class="weui-navbar__item text-font2" ng-class="{'weui-bar__item--on':tabstatus==1}" ng-click="tab(1)">
                    	我要抢单
                </a>
                <a class="weui-navbar__item text-font2" ng-class="{'weui-bar__item--on':tabstatus==2}" ng-click="tab(2)">
                    	我要接单
                </a>
                <a class="weui-navbar__item text-font2" ng-class="{'weui-bar__item--on':tabstatus==3}" ng-click="tab(3)">
                    	取消申请
                </a>
            </nav>
            <section class="weui-tab__bd" style="margin-bottom: 2.8rem;">
                <article id="tab1" class="weui-tab__bd-item weui-tab__bd-item--active" ng-show="tabstatus==1">
                    <figure ng-repeat="item in mycheckList">
                        <div class="apply_list">
                            <div class="weui-row pad-b2">
                                <div class="weui-col-75 mar-t2 apply_msg">
                                    <p>
                                        <span class="apply_active" ng-bind="item.deal_name"></span>
                                        <span class="sc-text-gray text-font3 mar-l3" ng-bind="'x'+item.number"></span>
                                    </p>
                                    <p>
                                        <span class="sc-text-gray text-font2" ng-bind="'服务时间: '+item.service_time"></span>
                                    </p>
                                    <p>
                                        <span class="sc-text-gray text-font2" ng-bind="'详细地址:'+item.address"></span>
                                    </p>
                                     <p class="sc-text-gray text-font3 mar-t1" ng-bind="'备注:'+item.remark"></p>
                                </div>
                                <div class="weui-col-25" style="margin:auto 0">
                                    <div class="weui-btn weui-btn_mini bg-qblue text-font2 fr" ng-click="grab(item)">抢单</div>
                                </div>
                            </div>
                        </div>
                    </figure>
                    
                </article>
                <article id="tab2" class="weui-tab__bd-item weui-tab__bd-item--active" ng-show="tabstatus==2">
                    <figure ng-repeat="item in mytakeList">
                        <div class="apply_list">
                            <div class="weui-row pad-b2">
                                <div class="weui-col-60 mar-t2 apply_msg">
                                    <p>
                                        <span class="apply_active" ng-bind="item.deal_name"></span>
                                        <span class="sc-text-gray text-font3 mar-l3" ng-bind="'x'+item.number"></span>
                                        
                                    </p>
                                    <p>
                                        <span class="sc-text-gray text-font2" ng-bind="'服务时间: '+item.service_time"></span>
                                    </p>
                                    <p>
                                        <span class="sc-text-gray text-font2" ng-bind="'详细地址:'+item.address"></span>
                                    </p>
                                    <p class="sc-text-gray text-font3 mar-t1" ng-bind="'备注:'+item.remark"></p>
                                </div>
                                <div class="weui-col-40" style="margin:auto 0">
                                    <div class="weui-btn weui-btn_mini bg-qblue text-font2 fr btn_cq mar-t0" ng-click="refuse(item)">拒绝</div>
                                    <div class="weui-btn weui-btn_mini bg-qblue text-font2 fr mar-r2 btn_cq mar-t0" ng-click="take(item)">接单</div>
                                </div>
                            </div>
                        </div>
                    </figure>
                    
                </article>
                <article id="tab3" class="weui-tab__bd-item weui-tab__bd-item--active" ng-show="tabstatus==3">
                    <figure ng-repeat="item in cancelList">
                        <div class="apply_list">
                            <div class="weui-row pad-b2">
                                <div class="weui-col-60 mar-t2 apply_msg">
                                    <p>
                                        <span class="apply_active" ng-bind="item.deal_name"></span>
                                        <span class="sc-text-gray text-font3 mar-l3" ng-bind="'x'+item.number"></span>
                                        
                                    </p>
                                    <p>
                                        <span class="sc-text-gray text-font2" ng-bind="'详细地址:'+item.address"></span>
                                    </p>
                                    <p>
                                        <span class="sc-text-gray text-font2" ng-bind="'取消理由:'+item.reason"></span>
                                    </p>
                                    <p class="sc-text-gray text-font3 mar-t1" ng-bind="'备注:'+item.remark"></p>
                                </div>
                                <div class="weui-col-40" style="margin:auto 0">
                                    <div class="weui-btn weui-btn_mini bg-qblue text-font2 fr btn_cq mar-t0" ng-click="cancel(item.order_sn,1)">拒绝</div>
                                    <div class="weui-btn weui-btn_mini bg-qblue text-font2 fr mar-r2 btn_cq mar-t0" ng-click="cancle(item.order_sn,2)">接受</div>
                                </div>
                            </div>
                        </div>
                    </figure>
                </article>
            </section>
        </div>

    </div>
    <footer class="weui-tabbar" id="footer">
	        <div class="weui-tabbar" name="footer">
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/masterOrder/masterHome.do">
	                <!--<span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;">8</span>-->
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_home1.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2 sc-text-blue">首页</p>
	            </a>
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/masterOrder/list.do">
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_classify.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2">订单</p>
	            </a>
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/master/center.do">
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_user.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2">我</p>
	            </a>
	        </div>
	    </footer>
    <div class="weui-loadmore hide">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>

</body>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/masterHome.js?ver=2017061466446" type="text/javascript" charset="utf-8"></script>
</html>