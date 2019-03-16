let router = require("express").Router()
let mgdb = require("../../../common/mgdb")

router.get("/",(req,res)=>{
    let{start,count,q,rule,dataName,_id}=res.params;
    mgdb({
        collection:dataName,
        dbName:"newproj"
    },({collection,client,ObjectId})=>{
        collection.deleteOne({
            _id:ObjectId(_id)
        },(err,result)=>{
            if(!err && result.result.n){
                res.redirect('/admin/user?dataName='+dataName+'&q='+q+'&start='+(start+1)+'&count='+count+'&rule='+rule)
            }else{
                res.redirect('/admin/error?msg=删除操作失败')
            }
            client.close();
        })
    })
})

module.exports = router;