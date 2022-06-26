/**
 @Author：UED
 @Version：GC-ui 3.0.0
 @Description：Web前端组件库
 @name：带收缩功能的菜单
 @Site：http://60.174.249.206:11080
 */
layui.define(["jquery"], function(exports) {
    var $ = layui.$;
    var obj = {
        nav: function() {
            initDecoration();
        }
    };
    //点击收缩按钮
    $('.gui-side-nav-tree').on('click','.gui-nav-hamburger',function () {
        $(this).parent().parent().toggleClass('gui-hide-side-nav');
        $(this).children().toggleClass('layui-icon-shrink-right');
        $(this).children().toggleClass('layui-icon-spread-left');
        // $(this).parents('.gui-side-nav-tree').find('.sidebar-logo').toggle();
        layer.close(tips);
        initDecoration();
    })
    var tips;
    var that;
    //收缩状态下展示菜单浮框
    $('body').on({
        mouseenter:function(e){
            that = this;
            if($(that).parent().parent('.gui-hide-side-nav')){
                if(that.nextSibling){//有二级菜单
                    var tip = $($(that).next(".layui-nav-child"))
                    var html = tip.addClass('gui-tree-tips').removeClass('layui-nav-child').prop("outerHTML")
                    if($(that).parent().parent().parent('.gui-nav-tree').hasClass('gui-nav-tree-green')){
                        html = tip.addClass('gui-tree-tips-green').removeClass('layui-nav-child').prop("outerHTML")
                        tip.removeClass('gui-tree-tips-green')
                    }else if($(that).parent().parent().parent('.gui-nav-tree').hasClass('gui-nav-tree-red')){
                        html = tip.addClass('gui-tree-tips-red').removeClass('layui-nav-child').prop("outerHTML")
                        tip.removeClass('gui-tree-tips-red')
                    }
                    tip.removeClass('gui-tree-tips').addClass('layui-nav-child')
                    tips =layer.tips(html,
                        that,{tips:[2,'#000'],time:0,area: 'auto',maxWidth:500});
                }else{//无二级菜单
                    tips =layer.tips('<span style="color:#fff;">'+$(that).find("span").text()+'</span>',
                        that,{tips:[2,'#000'],time:0,area: 'auto',maxWidth:500});
                }
            }
        },
        mouseleave:function(e){
            // layer.close(tips);
        }
    },'.gui-hide-side-nav .layui-nav-item>a');
    //清除浮框
    $('body').on({
        mouseenter:function(e){
        },
        mouseleave:function(e){
            layer.close(tips);
        }
    },'.layui-layer-tips');
    //点击浮框
    $('body').on({
        click:function(e){
            $('.layui-layer-tips dd').removeClass('layui-this')
            $(this).addClass('layui-this')
            $(that).parent().addClass('layui-nav-itemed').siblings().removeClass('layui-nav-itemed')
            $(that).parent().parent().find('.layui-this').removeClass('layui-this')
            $(that).next('.layui-nav-child').children().eq($(this).index()).addClass('layui-this')
            initDecoration()
        }
    },'.layui-layer-tips dd');

    function initDecoration() {
        // 定时器，因为，可能是侧边栏收缩动画导致高度位置信息获取不到
        setTimeout(function () {
            //遍历菜单树
            $('.layui-nav-tree').each(function (index,item) {
                var h = 88
                if($(item).parent().hasClass('gui-side-nav-tree-title gui-hide-side-nav')){
                    h = 144
                }
                var $this =$(item).find('.layui-this');
                var $line = $(item).siblings('.gui-sidebar-line')
                if( $this.parent().parent().is('.layui-nav-item') ){
                    var topH = $this.parents('.layui-nav-item').position().top + h;
                    $this.parent().siblings('a').addClass('active');
                    $this.parent().parent().siblings().find('a').removeClass('active');
                    if( topH == 0 ){
                        $line.height( h )
                    }else{
                        $line.height( topH )
                    }
                    //console.log( topH )
                }
                if($this.hasClass('layui-nav-item')){
                    $this.siblings().find('a').removeClass('active');
                    var sgtopH = $this.position().top;
                    if( sgtopH == 0 ){
                        $line.height( h )
                    }else{
                        $line.height( sgtopH + h )
                    }
                    //console.log(sgtopH)
                }
            })
        },280)
    }
    exports("nav", obj)
});