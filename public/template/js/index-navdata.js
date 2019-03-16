export class Navdata{
    constructor(type){
        this.type = type;
        this.init()
    }
    init(){
        // console.log(this.type)
        var that = this;
        $.ajax({
            url:"data/index-navdata"+this.type+".json",
            success:function(res){
                that.res = res;
                that.display();
            }
        })
    }
    display(){
        var str = "";
        for(var i = 0 ; i < this.res.length;i++){
            str += `<li class="clear">
                    <a href="list.html">
                        <img src="${this.res[i].src}" alt="">
                        <span>${this.res[i].name}</span>
                    </a>
                </li>`
        }
        $("#header").children(".nav").find(".nav-slide-box").children().children(".slide-cont").children("ul").eq(this.type).html(str);
    }
}