export class Floor{
    constructor(){
        this.init()
    }
    init(){
        $(window).scroll(function(){
            if($(this).scrollTop() > 500){
                $("#fixed").stop().fadeIn(300);
            }else{
                $("#fixed").stop().fadeOut(300);
            }
            var index = 0;

            if($(this).scrollTop()>=623 && $(this).scrollTop()<1227.5-20){
                index = 0;
            }else if($(this).scrollTop()>=1227.5-20 && $(this).scrollTop()<1735-20){
                index = 1;
            }else if($(this).scrollTop()>=1735-20){
                index = Math.floor(( $(this).scrollTop() - 1735)/1220)+2
            }
            // console.log(index)
            
            $("#fixed").children("ul").children().eq(index).siblings().css({color:"#fff"}).end().css({color:"#99f"})
            
        })
        $("#fixed").children("ul").children().click(function(){
            if($(this).index() != 9){
                // $(this).siblings().css({color:"#fff"}).end().css({color:"#99f"})
                
                // console.log($("#main").children(".lt").eq($(this).index()).position().top)

                $("html").stop().animate({scrollTop:$("#main").children(".lt").eq($(this).index()).position().top},300)
            }else{
                $("html").stop().animate({scrollTop:0},300)
            }
        })

    }
}