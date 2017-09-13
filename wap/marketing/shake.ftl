<#include "../inc/head_base.ftl"/>
<#include "../inc/head_jq.ftl"/>
<#include "../inc/head_weui.ftl"/>
<#include "../inc/head_ng.ftl"/>
<#include "../inc/head_var.ftl"/>
<script src="${json_config.oss_common_url}/angular/angular-sku.js"></script>

<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
<link rel="stylesheet" href="${json_config.oss_common_url}/animate/3.5.2/animate.min.css">

<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/shaked.css">
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/shaked.js?ver=20170623"></script>

<!--
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/shaked.css">
<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/shaked.js"></script>
-->


</head >
<body ng-app="app" ng-controller="ctrl">
<div class="dim " id="dim">
    <div class="dim_bg"></div>
    <div class="dim_loading">
        <i class="icon icon-spinner icon-spin"></i>
    </div>
</div>

<div class="contanier"  style="background-image: url('http://common.huibaoming.cn/wap/images/haivit/bg5.png');" >
    <div class="shake">
        <div class="circle"></div>
        <div class="redbag"><img src="http://common.huibaoming.cn/wap/images/haivit/redbag.png" alt=""></div>
        <div id="hand" class="hand">
            <img src="http://common.huibaoming.cn/wap/images/haivit/hand3.png">
        </div>
        <div class="annulus" id="annulus"></div>
    </div>
    <div class="music" >
        <img ng-src="{{music_url}}" class="music-animate"  alt="" ng-click="close_music($event)">
    </div>
    <audio autoplay loop preload="auto" id="myAudio">
        <source src="http://common.huibaoming.cn/wap/images/haivit/yisibugua.mp3" type="audio/mpeg">
    </audio>
    <div class="rule_btn rule_btn-animate"  ng-click="rule(1)"><span id="rule">规则</span></div>
    <div class="gift " ng-click="rule(2)">
        <img src="http://common.huibaoming.cn/wap/images/haivit/gift.png" alt="" class="gift-animate">
    </div>
    <div class="shaked_bottom">
        <div class="people_num">
            已有 <span ng-bind="json.tool.saled_number"></span> 人参与
        </div>
        <div class="times_num">
            您还有 <span ng-bind="json.limit_number!=-1?json.limit_number:'不限'"></span> 次抽奖机会
        </div>
    </div>
    <!-- Start == addDIV-->
    <!--抽中红包时的显示-->
    <div class="good hide" id="good">
        <div class="good_bg" ng-click="close_window($event)" style="background-image: url('http://common.huibaoming.cn/wap/images/haivit/good_bg.png')"></div>
        <div class="good_bag " id="good_bag">
            <!--摇出红包的情况-->
            <div id="shake_bag" class="shake_bag" style="background-image: url('http://common.huibaoming.cn/wap/images/haivit/good_bag.png')">
                <span><img src="http://common.huibaoming.cn/wap/images/haivit/close.png" class="close_btn" alt="" ng-click="close_good($event)"></span>
                <p><span id="good_money">1.00</span>元</p>
            </div>
            <!--摇出优惠券的情况-->
            <div id="shake_coupon" class="shake_coupon weui-flex" style="background-image: url('http://common.huibaoming.cn/wap/images/haivit/coupon_bg.png')">
                <span><img src="http://common.huibaoming.cn/wap/images/haivit/close.png" class="close_btn" alt="" ng-click="close_good($event)"></span>
                <div class="flex_item3 text-c fig_Lsize" id="coupon_money">
                </div>
                <div class="flex_item4 fig_Rsize">
                    <header class="text-c text-weight3" id="coupon_title"></header>
                    <article class="fig_Rart text-l">
                        <p id="coupon_limit_time"></p>
                        <p>前往卡券中心查收</p>
                        <p>只用于商城购物</p>
                    </article>
                </div>
            </div>
            <div id="shake_integral" class="shake_integral " style="background-image: url('http://common.huibaoming.cn/wap/images/haivit/integral.png')">
                <span><img src="http://common.huibaoming.cn/wap/images/haivit/close.png" class="close_btn" alt="" ng-click="close_good($event)"></span>
                <p class="integral_money" ><span id="integral_money">00.00</span>积分</p>
                <p class="integral_explain">已存入钱包>></p>
                <div class="integral_btn" ng-click="close_good($event)">
                    再来一次
                </div>
            </div>
        </div>
    </div>
    <!--抽不中红包时的显示-->
    <div class="bad hide" id="bad">
        <div class="bad_bg" ng-click="close_window($event)"></div>
        <div class="bad_bag hide" id="bad_bag" style="background-image: url('http://common.huibaoming.cn/wap/images/haivit/bad_bag.png')">
            <span><img src="http://common.huibaoming.cn/wap/images/haivit/close.png" class="close_btn" alt="" ng-click="close_bad($event)"></span>
            <div>谢谢参与</div>
        </div>
        <div class="bad_btn hide" id="bad_btn" ng-click="close_window($event)">
            再来一次
        </div>
    </div>
    <!--金币不足时的显示-->
    <div class="lack hide" id="lack">
        <div class="lack_bg" ng-click="close_window($event)"></div>
        <div class="lack_bag hide" id="lack_bag">
            <div class="close_btn icon-remove icon_close" ng-click="close_lack($event)"></div>
            <div class="lack_bag_top">
                <img src="http://common.huibaoming.cn/wap/images/haivit/weep.png" alt="" width="44rem" height="36rem">
                <p>很遗憾!</p>
            </div>
            <div class="lack_bag_bottom ">
                <div class="lack_cause">
                    <!--<p>您的金币不足喔~！</p>
                    <p>本次活动需要花费 <span ng-bind="json.tool.price"></span>金币</p>-->
                    <p>您的{{json.money_name}}不足喔~！</p>
                    <p>本次活动需要花费 <span ng-bind="json.tool.price"></span>{{json.money_name}}</p>
                </div>
                <!--<div class="lack_btn" id="lack_btn">
                    <div class="cancel fl" ng-click="close_lack($event)">取消</div>
                    <div class="recharge fr">去充值</div>
                </div>-->
            </div>
        </div>
    </div>
    <!--操作失败的显示-->
    <div class="fail hide" id="fail">
        <div class="fail_bg" ng-click="close_window($event)"></div>
        <div class="fail_con">
            <img src="http://common.huibaoming.cn/wap/images/haivit/fail.png" alt="">
        </div>
    </div>
    <!-- Stop == addDIV-->
    <!--活动规则-->
    <div id="about" class="weui-popup__container" >
        <div class="weui-popup__overlay"></div>
        <div class="weui-popup__modal" style="background:rgba(0,0,0,0.8) !important;">
            <div class="icon-remove icon_close" ng-click="pop_close()" style="font-size: 1.3rem;"></div>
            <div class="weui-flex pop_tab">
                <div class="weui-flex__item" >
                    <p ng-click="tab(1)">操作流程</p>
                    <li ng-class="{'tab_active':tab_num==1}"></li>
                </div>
                <div class="weui-flex__item" ng-click="tab(2)">
                    <p ng-click="tab(2)">奖品记录</p>
                    <li ng-class="{'tab_active':tab_num==2}"></li>
                </div>
            </div>
            <div id="rule1">
                <div class="rule" style="margin-top:3rem" >
                    <div class="bc-text-header mar-b3"><h4>操作流程</h4></div>

                    <div class="rule_msg">
                        <p ng-repeat="item in json.process" ng-bind="($index+1)+'、'+item.process"></p>
                    </div>

                </div>
                <div class="rule">
                    <div class="bc-text-header mar-b3"><h4>活动规则</h4></div>
                    <div class="rule_msg">
                        <p ng-repeat="item in json.rules" ng-bind="($index+1)+'、'+item.description"></p>

                    </div>
                </div>
            </div>
            <div  id="rule2" class="hide">
                <div class="rule">
                    <div class="award_item" ng-repeat="item in json.rewards">
                        <div class="award_msg" ng-if="item.reward_type_id==1 || item.reward_type_id==2  || item.reward_type_id==3  || item.reward_type_id==4  || item.reward_type_id==5">
                            <p class="text-font5 mar-b1"  ng-bind="item.name+'  (抽中数值：'+item.reward_real_price+')'"></p>
                            <p  ng-bind="'发放时间'+':'+item.delivery_time"></p>
                        </div>

                        <div class="award_msg" ng-if="item.reward_type_id==6 ">
                            <p class="text-font5 mar-b1"  ng-bind="item.name"></p>
                            <p  ng-bind="'兑换时间'+':'+item.start_use_time+' 至 '+item.end_use_time"></p>
                        </div>

                        <div class="award_status">
                            <p class="active" ng-if="item.delivery_status==0">未发放</p>
                            <p class="active" ng-if="item.delivery_status==1">已发放</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<audio src="" style="display: none" id="audio_shake"></audio>
<audio src="" style="display: none" id="audio_shake_result"></audio>


</body>
</html >