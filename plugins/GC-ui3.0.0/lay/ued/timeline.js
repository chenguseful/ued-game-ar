/**
 @Author：UED
 @Version：GC-ui 3.0.0
 @Description：Web前端组件库
 @name：时间线
 @Site：http://60.174.249.206:11080
 */
layui.define(["jquery"],function(exports){var obj={line:function(){var $=layui.$;systole();function systole(){if(!$(".gui-history").length){return}var $warpEle=$(".history-date"),$targetA=$warpEle.find("h2 a,ul li dl dt a"),parentH,eleTop=[];parentH=$warpEle.parent().height();$warpEle.parent().css({"height":59});setTimeout(function(){$warpEle.find("ul").children(":not('h2:first')").each(function(idx){eleTop.push($(this).position().top);$(this).css({"margin-top":-eleTop[idx]}).children().hide()}).animate({"margin-top":0},5).children().fadeIn();$warpEle.parent().animate({"height":parentH},5);$warpEle.find("ul").children(":not('h2:first')").addClass("bounceInDown").css({"-webkit-animation-duration":"2s","-webkit-animation-delay":"0","-webkit-animation-timing-function":"ease","-webkit-animation-fill-mode":"both"}).end().children("h2").css({"position":"relative"})},5);$targetA.click(function(){$(this).parent().css({"position":"relative"});$(this).parent().siblings().slideToggle();$warpEle.parent().removeAttr("style");return false})}}};exports("timeline",obj)});