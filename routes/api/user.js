let router = require("express").Router()
let mgdb = require("../../common/mgdb")
router.get("/",(req,res)=>{
    let{start,count,q,rule,dataName}=res.params;
    if (!dataName) {
      res.send({error:1,msg:'/admin/error?msg=dataName为必传参数'})
        return;
    }
    mgdb(
        {
          collection:dataName,
          dbName:"newproj"
        },
        ({collection,client})=>{
          collection.find(
            q ? {nikename: eval('/'+ q +'/g') } : {},{
            projection:{},
            sort:rule ? {[rule]:-1} : {'time':-1}
          }).toArray((err,result)=>{
            let checkResult=result.slice(start*count,start*count+count)
            let data={
              page_count:Math.ceil(result.length/count),page_data:checkResult
            }
            res.send({error:0,msg:'success',data});
            client.close();
          })
        }
      );
})

router.use("/add",require("./user/add"))
router.use("/check",require("./user/check"))
router.use("/del",require("./user/del"))

module.exports = router;