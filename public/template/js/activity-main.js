import "../libs/jquery-1.12.4.js";
import "../libs/jquery.cookie.js"


import {Nav} from "./index-nav.js";
import { Islogin } from "./Islogin.js";
import { Tocar } from "./tocar.js";


new Nav();
new Islogin();
new Tocar();

class SetTime{
    constructor(){
        this.init()
        this.load();
    }
    init(){
        $(".selected").find(".startbtn").html(`<p>上一场正在秒杀<br>距结束<i id="time">00:00:00</i></p>`)
        for(var i = 0 ; i < $(".main-nav").find("li").length ; i ++){
            if((new Date().getHours())<parseInt($(".main-nav").find("li").eq(i).find("span").html())){
                $(".main-nav").find("li").eq(i).prev().addClass("selected").find(".startbtn").html(`<p>正在秒杀<br>距下场<i id="time"></i></p>`).end().siblings().removeClass("selected").find(".startbtn").html(`<p>即将开始</p>`);
                break;
            }
        }
    }
    load(){
        var that = this;
        setInterval(()=>{
            $.ajax({
                type:"post",
                url:"php/gettime.php",
                data:{
                    now:new Date().getTime(),
                    d:new Date(2019,(new Date().getMonth()),(new Date().getDate()),parseInt($(".main-nav").find(".selected").next().find("span").html())).getTime()
                },
                success:function(res){
                    $("#time").html(`${that.createZero(parseInt(res/1000/60/60))}:${that.createZero(parseInt(res/1000/60)-parseInt(res/1000/60/60)*60)}:${that.createZero(parseInt(res/1000)-parseInt(res/1000/60/60)*60*60-(parseInt(res/1000/60)-parseInt(res/1000/60/60)*60)*60)}`)
                    // console.log(res)
                    if(res<=0){
                        $(".selected").find(".startbtn").html(`<p>即将开始</p>`).end().removeClass("selected").next().addClass("selected");
                        that.init()
                        // location.reload();
                        // if(location.href.indexOf('#reloaded')==-1){
                        //     location.href=location.href+"#reloaded";
                        //     location.reload();
                        // }
                    }
                }
            })
        },1000)
    }
    createZero(n){
        if(n<10 || n.length<2){
            return "0"+n
        }else{
            return n
        }
    }
}
new SetTime();