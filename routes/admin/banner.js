let router = require("express").Router()
let mgdb = require("../../common/mgdb")

router.get("/",(req,res)=>{
    let {dataName,start,q,rule,count}=res.params;
    if(!dataName){
        res.redirect('/admin/error?msg=dataName为必传')
        return;
    }
    let common_data = {
        ...res.user_session,
        ...res.params,
        start:start+1,
        api_name:'banner'
    };
    mgdb(
        {
          collection:dataName,
          dbName:"newproj"
        },
        ({collection,client})=>{
          collection.find(
            q ? {title: eval('/'+ q +'/g') } : {},{
            projection:{
              _id:1,title:1,sub_title:1
            },
            sort:rule ? {[rule]:-1} : {'time':-1}
          }).toArray((err,result)=>{
            let checkResult=result.slice(start*count,start*count+count)
            data={
              ...common_data,
              page_data:checkResult,
              page_count:Math.ceil(result.length/count)
            }
            res.render('banner', data);
            client.close();
          })
        }
      );

})

router.use("/add",require("./banner/add"))
router.use("/check",require("./banner/check"))
router.use("/del",require("./banner/del"))

module.exports = router;