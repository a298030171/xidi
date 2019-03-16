export class Addcar{
    constructor(){
        this.id = location.search.replace("?","");
        this.addEvent()
        
    }
    addEvent(){
        var that = this;
        $(".detail-main").on("click","a.addcar",function(){
            that.setCookie()
            var $div = $("<div>");   
            $div.css({position:"fixed",top:"50%",left:"50%",width:200,marginLeft:-100,marginTop:-75,background:"#fff",height:150,textAlign:"center",font:"18px/150px ''"}).html("添加成功")
            $div.appendTo($("body"));
            setTimeout(()=>{
                $div.stop().remove()
            },3000)
        })
        $(".detail-main").on("click",".reduce",function(){
            that.num = $(this).next().val();
            if(that.num>1)($(this).next().val(--that.num));
        })
        $(".detail-main").on("click",".plus",function(){
            that.num = $(this).prev().val();
            $(this).prev().val(++that.num);
        })
    }
    setCookie(){
        this.good = $.cookie("goods") == null?[]:JSON.parse($.cookie("goods"));
        if(this.good.length < 1){
            this.good.push({
                id:this.id,
                num:`${+$(".reduce").next().val()}`
            })
        }else{
            var flag = true;
            for(var i = 0 ; i < this.good.length ; i ++){
                if(this.id == this.good[i].id){
                    this.good[i].num = `${+this.good[i].num + +$(".reduce").next().val()}`;
                    flag = false;
                }
            }
            if(flag){
                this.good.push({
                    id:this.id,
                    num:`${+$(".reduce").next().val()}`
                })
            }
        }
        $.cookie("goods",JSON.stringify(this.good))
        console.log(this.good)
        this.setNum()
    }
    setNum(){
        this.cararr = JSON.parse($.cookie("goods"))
        $(".carbox").find(".num").html(this.cararr.length)
        if(this.cararr.length > 0){
            $(".carbox").find(".car").css({backgroundPosition:"-174px 0"})
        }
    }
}