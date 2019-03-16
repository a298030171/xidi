
import "../libs/jquery-1.12.4.js";
import "../libs/jquery.cookie.js"
import "../libs/jquery.banner.1.1.0.js";

import {Nav} from "./index-nav.js";
import {Zt} from "./index-zt.js";
import { Hw } from "./index-hw.js";
import { Islogin } from "./Islogin.js";
import { Floor } from "./index-floor.js";
import {Tocar} from "./tocar.js"
$(".banner-cont").banner({
    imgs:$(".imglist").children(),
    list:$(".imgnav").find("li"),
    left:$(".imgbtn").children(".left"),
    right:$(".imgbtn").children(".right"),
    moveTime:200,
    autoPlay:true,
    delayTime:3000
})
$(".zt").children("ul").on("mouseover","li",function(){
    $(this).stop().animate({opacity:.5})
})
$(".zt").children("ul").on("mouseout","li",function(){
    $(this).stop().animate({opacity:1})
})

new Nav();
new Zt();
new Hw();
new Floor();
new Tocar();
new Islogin();
