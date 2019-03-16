let router = require("express").Router()
let mgdb = require("../../common/mgdb")

router.get("/",(req,res)=>{
    let dataName = req.query.dataName;
    if (!dataName) {
        res.redirect('/admin/error?msg=dataName为必传参数')
        return;
    }
    let {start,rule,q,count} = res.params
    let common_data = {...res.params,...res.user_session,api_name:'product',start:start+1}
    mgdb({
        collection:'goods',
        dbName:"newproj"
    },({collection,client,ObjectId})=>{
        collection.find( 
            q ? { title: eval('/' + q + '/g') } : {},
        {
            projection: {
                _id: 1, title: 1
            },
            sort:rule?{[rule]:-1}:{"time":-1}
        }).toArray((err,result)=>{
            let checkResult = result.slice(start * count, start * count + count)//提取要分页的数据
            let data = {
                ...common_data,
                page_data: checkResult,
                page_count: Math.ceil(result.length / count)//计算总页数
            }
            res.render('product', data);
            client.close();
        })
    })
})

router.use("/add",require("./product/add"))
router.use("/check",require("./product/check"))
router.use("/del",require("./product/del"))

module.exports = router;