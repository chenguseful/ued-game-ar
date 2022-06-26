// 点赞动画
(function ($) {
    $.extend({
        tipsBox: function (options) {
            options = $.extend({
                obj: null,  // jq对象，要在那个html标签上显示
                str: '+1',  // 字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
                startSize: '10px',  // 动画开始的文字大小
                endSize: '20px',    // 动画结束的文字大小
                interval: 600,  // 动画时间间隔
                color: '#FF5694',    // 文字颜色
                callback: null    // 回调函数
            }, options);
            $('body').append('<span class="tips-num">' + options.str + '</span>');
            var box = $('.tips-num');
            var left = options.obj.offset().left + options.obj.width();
            //var top = options.obj.offset().top - options.obj.height();
            var top = options.obj.offset().top-30;
            box.css({
                'position': 'absolute',
                'left': left + 'px',
                'top': top + 10 + 'px',
                'z-index': 9999,
                'font-size': options.startSize,
                'line-height': options.endSize,
                'color': options.color
            });
            box.animate({
                'font-size': options.endSize,
                'opacity': '0',
                'top': top - parseInt(options.endSize) + 'px'
            }, options.interval, function () {
                box.remove();
                options.callback&&options.callback();
            });
        }
    });
})(jQuery);