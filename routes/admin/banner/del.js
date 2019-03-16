let router = require("express").Router()
var mgdb = require('../../../common/mgdb')
router.get("/",(req,res)=>{
    let {dataName,_id,start,q,rule,count} = res.params;
    if(!dataName || !_id){
        res.redirect('/admin/error?msg=dataName和_id为必传')
        return;
    }

    mgdb(
        {
            collection:dataName,
            dbName:"newproj"
        },
        ({collection,client,ObjectId})=>{

        collection.deleteOne({_id:ObjectId(_id)},(err,result)=>{
            if(!err && result.result.n){
            res.redirect('/admin/banner?dataName='+dataName+'&q='+q+'&start='+(start+1)+'&count='+count+'&rule='+rule)
            }else{
            res.redirect('/admin/error?msg=删除操作失败')
            }
            client.close();
        })

        }
  );
})

module.exports = router;