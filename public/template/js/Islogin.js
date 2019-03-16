export class Islogin{
    constructor(){
        this.init()
    }
    init(){
        if($.cookie("login")){
            $(".top-r").children(".user").children(".login").replaceWith("<a class = 'login'>"+$.cookie("login")+" 欢迎登陆</a>")
        }
    }
}