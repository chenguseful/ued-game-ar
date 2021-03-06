/**
 @Author：UED
 @Version：GC-ui 3.0.0
 @Description：Web前端组件库
 @name：进度条
 @Site：http://60.174.249.206:11080
 */
layui.define(["jquery"],function(exports){var obj={goal:function(){var $=layui.$;$.fn.extend({goalProgress:function(options){var defaults={goalAmount:100,currentAmount:50,speed:1000,textBefore:"",textAfter:"",milestoneNumber:70,milestoneClass:"almost-full",callback:function(){}};var options=$.extend(defaults,options);return this.each(function(){var obj=$(this);var goalAmountParsed=parseInt(defaults.goalAmount);var currentAmountParsed=parseInt(defaults.currentAmount);var percentage=(currentAmountParsed/goalAmountParsed)*100;var milestoneNumberClass=(percentage>defaults.milestoneNumber)?" "+defaults.milestoneClass:"";var progressBar='<div class="progressBar">'+defaults.textBefore+currentAmountParsed+defaults.textAfter+"</div>";var progressBarWrapped='<div class="goalProgress'+milestoneNumberClass+'">'+progressBar+"</div>";obj.append(progressBarWrapped);var rendered=obj.find("div.progressBar");rendered.each(function(){$(this).html($(this).text().replace(/\s/g,"&nbsp;"))});rendered.animate({width:percentage+"%"},defaults.speed,defaults.callback);if(typeof callback=="function"){callback.call(this)}})}})}};exports("goalProgress",obj)});