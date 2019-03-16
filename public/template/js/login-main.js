import "../libs/jquery-1.12.4.js";
import "../libs/jquery.cookie.js";

class Login{
    constructor(){
        this.addEvent()
    }
    addEvent(){
        var that = this;
        


        $(".login-btn").children().click(function(){
            $.ajax({
                url:"/api/login",
                type:"post",
                data:{
                    username:$("#user").val(),
                    password:$("#pass").val()
                },
                success:function(res){
                    console.log(res)
                    if(res.error == 0){
                        $.cookie("login",$("#user").val());
                        location.href = "index.html"
                    }else{
                        alert(res.msg)
                    }
                }
            })
        })

        $(".login-remember").find(".check").click(function(){
            $(this).toggleClass("checked")
        })
    }
}

new Login();