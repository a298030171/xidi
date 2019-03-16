let router = require("express").Router()
let mgdb = require("../../common/mgdb")

router.get("/",(req,res)=>{
    
    res.render("login",{})
})

router.post("/submit",(req,res)=>{
    let {username,password} = req.body
    mgdb({
        dbName:"newproj",
        collection:"admin"  
    },({collection,client,ObjectId})=>{
        collection.find(
            {username,password},
            {projection:{_id:0}}
        ).toArray((err,result)=>{
            if(!err && result.length >0){
                req.session["username"]=result[0].username;
                req.session["icon"]=result[0].icon;
                res.redirect("/admin/home")
            }else{
                res.redirect("/admin/error?msg=登录失败,用户或者密码有误")
            }
        })
    })
})

module.exports = router;