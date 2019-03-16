let router = require("express").Router()
let mgdb = require("../../common/mgdb")

router.get("/",(req,res)=>{
    let {dataName,start,q,rule,count}=res.params;
    if(!dataName){
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
            q ? {title: eval('/'+ q +'/g') } : {},{
            projection:{},
            sort:rule ? {[rule]:-1} : {'time':-1}
          }).toArray((err,result)=>{
            let checkResult=result.slice(start*count,start*count+count)
            data={
                page_count: Math.ceil(result.length / count),start:start+1,count,q,rule,
                total:result.length,
                page_data: checkResult
            }
            res.send({error:0,msg:'success',data});
            client.close();
          })
        }
      );

})


module.exports = router;