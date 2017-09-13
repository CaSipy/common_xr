<#include "../inc/head_base.ftl">
<#include "../inc/head_jq.ftl">
<#include "../inc/head_weui.ftl">
<#include "../inc/head_var.ftl">
<#include "../inc/head_ng.ftl">
    <link rel="stylesheet" href="${domain_url}/common/wap/src/css/wap.css">
    <link rel="stylesheet" href="${domain_url}/common/wap/src/css/wap_public.css">
    <link rel="stylesheet" href="${domain_url}/common/wap/src/css/award.css">

</head>
<body ng-app="app" ng-controller="ctrl">
<div class="bg_bg"></div>
  <header class="fix_header">
      <center style="margin:1rem;">
          <div class="award_header">
              我的奖品
          </div>
      </center>
  </header>
    <section style="margin-top:5rem">
        <div class="cash_box car2"  ng-repeat="item in list" ng-click="jump(item.id)">
            <div class="weui-row">
                <div class="weui-col-75 pad-all3 pad-l5">
                    <p><span style="font-size:2rem;font-weight: bold" ng-bind="'￥'+item.real_money"></span><span class="mar-l4" ng-bind="item.reward_type_name"></span></p>
                    <!--<span class="text-font5 mar-l2" ng-bind="item.status">教师专属</span>-->
                </div>
                <div class="weui-col-25">
                    <img ng-if="item.delivery==0" src="http://common.huibaoming.cn/wap/images/haivit/status1.png" alt="" style="width:80%;float:right;margin-top:0.5rem;margin-right:0.5rem">
                    <img ng-if="item.delivery!=0" src="http://common.huibaoming.cn/wap/images/haivit/status2.png" alt="" style="width:80%;float:right;margin-top:0.5rem;margin-right:0.5rem">
                </div>
            </div>
            <div class="weui-flex text-font3 cash_footer">
                <div class="weui-flex__item text-l"><span ng-bind="item.deal_name"></span></div>
                <div class="weui-flex__item text-r"><span ng-bind="item.delivery_time"></span></div>
            </div>
        </div>
        <div style="clear:both"></div>
	    <div class="weui-loadmore loadMore hide">
	        <i class="weui-loading"></i>
	        <span class="weui-loadmore__tips">正在加载</span>
	    </div>
	    <div class="weui-loadmore" ng-hide="has_data">
	        <span class="weui-loadmore__tips">没有更多记录</span>
	    </div>
        <!--没有奖品的情况-->
        <center class="bc-text-header hide" ng-class="{'show':list.length==0}">
            <img src="http://common.huibaoming.cn/wap/images/haivit/no_award.png" alt="" style="width:65%">
            <h3>这里什么都没有</h3>
            <p>快去抽奖获得奖品吧</p>
        </center>
    </section>
<footer style="position:fixed;left:0;right:0;bottom:0;">
    <img src="http://common.huibaoming.cn/wap/images/haivit/award_footer.png" alt="" style="width:100%">
</footer>

</body>

<script src="${domain_url}/common/wap/src/js/myReward.js?ver=1114"></script>
<#include "../inc/foot.ftl">