let router = require("express").Router()
let mgdb = require("../../common/mgdb")
router.get("/",(req,res)=>{
    let {username,password} = req.query;

    mgdb({
        collection:"user",
        dbName:"newproj"
    },({collection,client,ObjectId})=>{
        collection.find({username}).toArray((err,result)=>{
            if(!err && result.length > 0){
                res.send({error:1,msg:'用户名已存在'})
            }else{
                collection.insertOne({username,password},(err,result)=>{
                    res.send({error:0,msg:"success"})
                })
            }
        })
    })
})

module.exports = router;