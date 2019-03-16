export class Zt{
    constructor(){

        this.init();
    }
    init(){
        var that = this;
        $.ajax({
            url:"/api/banner?dataName=banner&count=6",
            success:function(res){
                that.res = res;        
                console.log(that.res)
                that.display()
            }
        })
    }
    display(){
        var str = "";
        for(var i = 0 ; i < this.res.data.page_data.length; i++){
            str += `<li>
                    <a href="activity.html">
                        <div class="pic">
                            <img src="${this.res.data.page_data[i].banner}" alt="">
                        </div>
                        <p>${this.res.data.page_data[i].title}</p>
                    </a>
                </li>`
        }

        $("#main").children(".zt").children("ul").html(str);
    }
}