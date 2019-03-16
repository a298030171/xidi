import {Navdata} from "./index-navdata.js";

export class Nav{
    constructor(){
        this.init();
    }
    init(){
        $("#header").children(".nav").find(".nav-slide-box").children().hover(function(){
            new Navdata($(this).index());
            $(this).children(".slide-cont").stop().fadeIn()
        },function(){
            $(this).children(".slide-cont").stop().fadeOut()
        })
    }
}