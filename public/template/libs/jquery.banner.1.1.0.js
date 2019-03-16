;(function($){
    "use strict"

    $.extend($.fn,{
        banner:function(options){
            this.LOCAL = {
                autoPlay: options.autoPlay === false? false:true,
                moveTime: options.moveTime || 200,
                delayTime:options.delayTime || 3000,
                index : 0,
                iPrev : options.imgs.length -1 ,
                listFlag:false
            }
            var that = this;
            if(options.list != undefined && options.list.length > 0 ){
                this.LOCAL.listFlag = true;
                options.list.eq(0).css({background:"red"})
                that.LOCAL.imgMove = function(i,type){
                    options.imgs.eq(that.LOCAL.index).css({left:0}).stop().animate({left:-options.imgs.eq(0).width()*type},that.LOCAL.moveTime).end().eq(i).css({left:options.imgs.eq(0).width()*type}).stop().animate({left:0},that.LOCAL.moveTime)
                }
                options.list.on("click",function(){
                    if(that.LOCAL.index<$(this).index()){
                        that.LOCAL.imgMove($(this).index(),1)
                    }
                    if(that.LOCAL.index>$(this).index()){
                        that.LOCAL.imgMove($(this).index(),-1)
                    }

                    that.LOCAL.index = $(this).index();
                    options.list.css({background:"#a9a9a9"}).eq(that.LOCAL.index).css({background:"red"})
                })
            }
            this.LOCAL.rightclick = function(){
                if(that.LOCAL.index == options.imgs.length -1){
                    that.LOCAL.index = 0;
                    that.LOCAL.iPrev = options.imgs.length -1;
                }else{
                    that.LOCAL.index ++;
                    that.LOCAL.iPrev = that.LOCAL.index - 1;
                }
                that.LOCAL.btnMove(-1)
            }
            this.LOCAL.btnMove = function(type){
                options.imgs.eq(this.iPrev).css({left:0}).stop().animate({left:options.imgs.eq(0).width()*type},that.LOCAL.moveTime).end().eq(this.index).css({left:-options.imgs.eq(0).width()*type}).stop().animate({left:0},that.LOCAL.moveTime)
                if(that.LOCAL.listFlag)options.list.css({background:"#a9a9a9"}).eq(that.LOCAL.index).css({background:"red"})
            }
            if(options.left!=undefined&&options.left.length>0&&options.right!=undefined&&options.right.length>0){
                options.left.on("click",function(){
                    if(that.LOCAL.index == 0){
                        that.LOCAL.index = options.imgs.length -1;
                        that.LOCAL.iPrev = 0;
                    }else{
                        that.LOCAL.index -- ;
                        that.LOCAL.iPrev = that.LOCAL.index + 1;
                    }
                    that.LOCAL.btnMove(1)
                })
                options.right.on("click",this.LOCAL.rightclick)
            }

            this.LOCAL.auto = function(){
                that.LOCAL.timer = setInterval(() => {
                    that.LOCAL.rightclick()
                }, that.LOCAL.delayTime);
            }
            if(this.LOCAL.autoPlay){
                this.LOCAL.auto()
                this.hover(function(){
                    clearInterval(that.LOCAL.timer);
                },function(){
                    clearInterval(that.LOCAL.timer);
                    that.LOCAL.auto()
                })
            }
        }   
    })
}(jQuery));