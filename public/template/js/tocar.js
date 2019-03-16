export class Tocar{
    constructor(){
        this.init()
        this.setNum()
    }
    init(){
        $(".carbox").children("a").click(function(){
            if($.cookie("login")){
                location.href = "shoppingCar.html"
            }else{
                location.href = "login.html"
            }
        })
    }
    setNum(){
        this.cararr = JSON.parse($.cookie("goods"))
        if(this.cararr){$(".carbox").find(".num").html(this.cararr.length);
        if(this.cararr.length > 0){
            $(".carbox").find(".car").css({backgroundPosition:"-174px 0"})
        }}
    }
}