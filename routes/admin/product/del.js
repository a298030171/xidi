let router = require("express").Router()
let mgdb = require("../../../common/mgdb")

router.get("/",(req,res)=>{
    let dataName = req.query.dataName;
    let _id = req.query._id;
    if(!dataName || !_id){
        res.redirect('/admin/error?msg=dataName和_id为必传参数')
        return;
    }

    let start = req.query.start ? req.query.start-0 : require('../../../config/global').page_start
    let count = req.query.count ? req.query.count-0 : require('../../../config/global').page_num
    let q = req.query.q ? req.query.q : require('../../../config/global').q;
    let rule = req.query.rule ? req.query.rule : require('../../../config/global').rule;

    mgdb({
        dbName:"newproj",
        collection:'goods'
    },({collection,client,ObjectId})=>{
        collection.deleteOne({
            _id:ObjectId(_id)
        },(err,result)=>{
            if(!err && result.result.n){
                res.redirect('/admin/product?dataName='+dataName+'&start='+start+'&count='+count+'&q='+q+'&rule='+rule)
              }else{
                res.redirect('/admin/error?msg='+dataName+'操作错误')
              }
              client.close();
        })
    })
})

module.exports = router;