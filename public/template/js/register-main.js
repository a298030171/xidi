import "../libs/jquery-1.12.4.js";

class Register{
    constructor(){
        this.addEvent()
    }
    addEvent(){
        $(".reg-btn").children().click(function(){
            $.ajax({
                url:"/api/register",
                data:{
                    username:$("#tel").val(),
                    password:$("#pass").val()
                },
                success:function(res){
                    console.log(res)
                    if(res.error == 1){
                        alert(res.msg)
                    }else if(res.error == 0){
                        alert(res.msg)
                    }
                }
            })
        })

        $("#tel").change(function(){
            var reg = /^1[3|4|5|8]\d{9}$/;
            if(reg.test($(this).val())){
                $(this).next().stop().show().html("格式正确").css({color:"green"});
                setTimeout(() => {
                    $(this).next().hide()
                }, 2000);
            }else{
                $(this).next().stop().show().html("请输入正确的手机号").css({color:"red"});
                setTimeout(() => {
                    $(this).next().hide()
                }, 2000);
            }
        })
        $("#pass").change(function(){
            var reg = /^[a-zA-Z_][\w]{5,15}$/;
            if(reg.test($(this).val())){
                $(this).next().stop().show().html("格式正确").css({color:"green"});
                setTimeout(() => {
                    $(this).next().hide()
                }, 2000);
            }else{
                $(this).next().stop().show().html("输入有误请重新输入").css({color:"red"});
                setTimeout(() => {
                    $(this).next().hide()
                }, 2000);
            }
        })
    }
}

new Register()