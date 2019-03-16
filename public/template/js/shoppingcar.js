export class ShoppingCar{
    constructor(){
        this.load()
        this.addEvent()
        this.flag = {}
        this.price = 0;
    }
    load(){
        var that = this;
        $.ajax({
            url:"/api/goods?dataName=goods",
            success:function(res){
                that.res = res;
                // console.log(this.res)
                that.display();
                
            }
        })
    }
    display(){
        this.arr = JSON.parse($.cookie("goods"))
        var str = "";
        var allprice = 0;
        for(var i = 0; i < this.res.data.data.length ; i++){
            for(var j = 0 ; j < this.arr.length;j++){
                if(this.arr[j].id == this.res.data.data[i].id){
                    str += `<li>
                        <div class="tbody clear" data-id="${this.res.data.data[i].id}">
                            <div class="check ${this.flag[this.res.data.data[i].id] ? "checked" : "" }">
                                <i></i>
                                <img src="${this.res.data.data[i].src}" alt="">
                            </div>
                            <div class="goods">${this.res.data.data[i].name}</div>
                            <div class="price">${this.res.data.data[i].price}</div>
                            <div class="num">
                                <a class="reduce"></a>
                                <input type="text" value="${this.arr[j].num}">
                                <a class="plus"></a>
                            </div>
                            <div class="weight">0.88kg</div>
                            <div class="allprice">￥${(+this.res.data.data[i].price.replace(/[^0-9]/,"") * +this.arr[j].num).toFixed(2)}</div>
                            <div class="del">
                                <a>删除</a>
                            </div>
                        </div>
                    </li>`;
                    // allprice += +(+this.res[i].price.replace(/[^0-9.]/,"") * +this.arr[j].num).toFixed(2)
                }
            }
        }
        $(".car-goods").children("ul").html(str);
        // $(".car-finish").find(".info-price").children("span").html("￥"+allprice.toFixed(2));
        this.checked();
    }
    addEvent(){
        var that = this;
        $(".car-goods").children("ul").on("click",".del a",function(){
            that.id = $(this).parent().parent().attr("data-id");
            $(this).parents("li").remove();
            that.setCookie(function(index){
                that.arr.splice(index,1)
            })
            that.display()
            that.setNum();
        })
        $(".car-goods").children("ul").on("input",".num input",function(){
            that.id = $(this).parent().parent().attr("data-id");
            that.num = $(this).val();
            console.log(that.num)
            that.setCookie(function(index){
                that.arr[index].num = that.num;
            })
            that.display()
        })
        $(".car-goods").children("ul").on("click",".num .reduce",function(){
            that.id = $(this).parent().parent().attr("data-id");
            that.num = $(this).next().val();
            if(that.num >1)($(this).next().val(--that.num));
            that.setCookie(function(index){
                that.arr[index].num = that.num;
            })
            that.display()
        })
        $(".car-goods").children("ul").on("click",".num .plus",function(){
            that.id = $(this).parent().parent().attr("data-id");
            that.num = $(this).prev().val();
            $(this).prev().val(++that.num);
            that.setCookie(function(index){
                that.arr[index].num = that.num;
            })
            that.display()
        })

        $(".car-goods").children("ul").on("click",".check",function(){
            $(this).toggleClass("checked");
            that.checked()
            var isChecked = $(this).attr("class");
            if($(".car-goods").find(".check").length==$(".car-goods").find(".checked").length){
                $(".car-wrap").find(".check").attr("class",isChecked);
            }else{
                $(".car-th").find(".check").attr("class","check")
                $(".car-finish").find(".check").attr("class","check")
            }
            
        })
        $(".check").click(function(){
            
            $(this).toggleClass("checked");
            var isChecked = $(this).attr("class");
            // $(".car-goods").find(".check").attr("class",isChecked);
            $(".car-wrap").find(".check").attr("class",isChecked);
            that.checked()
        })
    }
    setCookie(cb){
        for(var i = 0 ; i < this.arr.length ; i++){
            if(this.arr[i].id == this.id){
                cb(i)
            }
        }
        $.cookie("goods",JSON.stringify(this.arr))
    }
    checked(){
        var that = this;
        $(".car-goods").find(".check").each(function(key,value){
            that.flag[$(this).parent().attr("data-id")]=$(value).hasClass("checked")

            $(this).parent().get(0).check = $(value).hasClass("checked")

            // if($(value).hasClass("checked")){
            //     console.log($(this).parent().attr("data-id"))
            // }
        })
        console.log(this.flag)
        this.setPrice()
    }
    setPrice(){
        this.price = 0;
        for(var i = 0 ; i < $(".car-goods").find(".check").length;i++){ 
            if($(".car-goods").find(".check").parent().get(i).check){

                this.price += +$($(".car-goods").find(".check").parent().get(i)).find(".allprice").html().replace(/[^0-9.]/,"")
                console.log(this.price)
            }
        }
        $(".car-finish").find(".info-price").children("span").html("￥"+this.price.toFixed(2));
    }
    setNum(){
        this.cararr = JSON.parse($.cookie("goods"))
        $(".carbox").find(".num").html(this.cararr.length)
        if(this.cararr.length > 0){
            $(".carbox").find(".car").css({backgroundPosition:"-174px 0"})
        }else{
            $(".carbox").find(".car").css({backgroundPosition:"-137px 0"})
        }
    }
}
