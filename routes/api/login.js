let router = require("express").Router()
let mgdb = require("../../common/mgdb")

router.post("/",(req,res)=>{
    let {username,password} = req.body
    mgdb({
        dbName:"newproj",
        collection:"user"  
    },({collection,client,ObjectId})=>{
        collection.find(
            {username,password},
            {projection:{_id:0}}
        ).toArray((err,result)=>{
            console.log(result)
            if(!err && result.length >0){
                req.session["username"]=result[0].username;
                res.send({error:0,msg:'login success',data:result[0]})
            }else{
                res.send({error:1,msg:"登录失败,用户或者密码有误"})
            }
        })
    })
})

module.exports = router;