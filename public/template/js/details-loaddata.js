export class Getdata{
    constructor(){
        this.id = location.search.replace("?","")
        this.init()
    }
    init(){
        var that = this;
        $.ajax({
            url:"/api/goods?dataName=goods",
            success:function(res){
                that.res = res;
                that.display();
                that.bigpic()
            }
        })
    }
    display(){
        var str = "";
        var str1 = "";
        for(var i = 0 ; i < this.res.data.data.length; i ++){
            if(this.id === this.res.data.data[i].id){
                // console.log(Object.keys(this.res[i].imgarr).length)
                for(var j = 0;j <Object.keys(this.res.data.data[i].imgarr).length;j++){
                    str1 += `<li>
                                <a>
                                    <img src="${this.res.data.data[i].imgarr["img"+(j+1)]}" alt="">
                                </a>
                            </li>`
                }
                // console.log(str1)
                str = `<div class="detail-top clear">
                    <div class="detail-show">
                        <div class="detail-show-pic">
                            <img src="${this.res.data.data[i].src}" alt="" style="width:500px">
                            <span></span>
                            <p></p>
                        </div>
                        <div class="detail-show-big">
                            <img src="${this.res.data.data[i].src}" alt="" style="width:800px">
                        </div>
                        <ul class="imglist clear">
                            ${str1}
                        </ul>
                        <div class="detail-share clear">
                            <a href="#" class="love"></a>
                            <span>|</span>
                            <div class="share clear">
                                <a href="#"></a>
                                <span>分享</span>
                                <ul>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="detail-desc">
                        <div class="detail-desc-country">
                            <img src="${this.res.data.data[i].flag}" alt="">
                            <span>${this.res.data.data[i].country}</span>
                            <span>|</span>
                            <a href="#">DHT</a>
                        </div>
                        <h1>${this.res.data.data[i].name}</h1>
                        <p>${this.res.data.data[i].desc}</p>
                        <div class="detail-desc-info">
                            <div class="info-price clear">
                                <p>喜地售价</p>
                                <span>${this.res.data.data[i].price}</span>
                            </div>
                            <div class="info-color clear">
                                <p>颜色</p>
                                <ul class="clear">
                                    <li>
                                        <a href="#">
                                            <img src="${this.res.data.data[i].src}" alt="" style="width:44px;">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="info-num clear">
                                <p>数量</p>
                                <div class="info-num-change">
                                    <a class="reduce"></a>
                                    <input type="text" value="1">
                                    <a class="plus"></a>
                                </div>
                            </div>
                        </div>
                        <div class="detail-buy">
                            <a class="buynow">立即购买</a>
                            <a class="addcar">加入购物车</a>
                        </div>
                        <div class="detail-tip">
                            <div class="tip-l">
                                <p><i></i>每天15:00从上海自贸区发货</p>
                                <p><i></i>七天无理由退货</p>
                            </div>
                            <div class="tip-r">
                                <a href="#">8</a>
                                <p>用户评价</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-bottom">
                    <img src="${this.res.data.data[i].moreimg1}" alt="" style="width:800px">
                    <img src="${this.res.data.data[i].moreimg2}" alt="" style="width:800px">
                </div>`;
            }
        }
        $(".detail-main").html(str)
    }
    bigpic(){
        console.log($(".detail-show-pic"));
        console.log($(".detail-show-big"));
        for(var i = 0 ; i < this.res.data.data.length; i ++){
            if(this.id === this.res.data.data[i].id){
                $(".detail-show-pic").children("span").css({background:"url("+this.res.data.data[i].src+") no-repeat center center",backgroundSize:"500px 500px"})
            }
        }

        $(".detail-show-pic").mouseover(function(){
            $(this).children("span").stop().show().prev().css({opacity:0.6});
            $(".detail-show-big").stop().show();
            $(this).mousemove(function(e){
                var l=e.offsetX-$(this).children("span").width()/2;
				var t=e.offsetY-$(this).children("span").height()/2;
				if(l<0) l=0;
				if(t<0) t=0;
				if(l>$(this).width()-$(this).children("span").width())
					l=$(this).width()-$(this).children("span").width();
				if(t>$(this).height()-$(this).children("span").height())
					t=$(this).height()-$(this).children("span").height();
                $(this).children("span").css({left:l,top:t})

                var lSim=l/($(this).width()-$(this).children("span").width());
				var rSim=t/($(this).height()-$(this).children("span").height());
				
				$(".detail-show-big").children().css({left:(lSim * ($(".detail-show-big").width()-$(".detail-show-big").children().width()))})
				$(".detail-show-big").children().css({top:(rSim * ($(".detail-show-big").height()-$(".detail-show-big").children().height()))})
				
				$(this).children("span").css({backgroundPosition:-l+"px "+ -t+"px"})
            })
        })

        $(".detail-show-pic").mouseout(function(){
            $(this).children("span").stop().hide().prev().css({opacity:1});
            $(".detail-show-big").stop().hide();
        })

        $(".imglist").children().mouseover(function(){
            $(this).css({border:"2px solid #99f"}).siblings().css({border:"2px solid transparent"})
            $(".detail-show-pic").find("img").attr("src",$(this).find("img").attr("src")).end().find("span").css({background:"url("+$(this).find("img").attr("src")+") no-repeat center center",backgroundSize:"500px 500px"})
            $(".detail-show-big").find("img").attr("src",$(this).find("img").attr("src"))
        })

    }
}