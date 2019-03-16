let router = require("express").Router()
let uploadUrl = require("../../../config/global").upload.banner
let path = require("path")
let fs = require("fs")
let mgdb = require("../../../common/mgdb")

router.get("/",(req,res)=>{
    let {dataName} = res.params;
    if(!dataName){
        res.redirect("/admin/error?msg=dataName为必传")
    }
    let common_data = {
        ...res.user_session,//cookie每次需要校验
        ...res.params,
        page_header:dataName + '添加',//标题
    };
    res.render("./banner/add",common_data)
})

router.post("/submit",(req,res)=>{
    let {title,sub_title,auth,content,dataName,banner_old,icon_old,_id,start,q,count,rule} = req.body;
    let time = Date.now()

    let icon,banner;
    // console.log(req.files)
    req.files.forEach((items)=>{
        if(items.fieldname == 'icon'){
            icon = uploadUrl + items.filename + path.parse(items.originalname).ext
        }
        if(items.fieldname == 'banner'){
            banner = uploadUrl + items.filename + path.parse(items.originalname).ext
        }   
        fs.renameSync(items.path,items.path + path.parse(items.originalname).ext)
    })

    if(!banner) banner = '/upload/noimage.png';
    if(!icon) icon = '/upload/noimage.png';

    mgdb(
        {
          collection:dataName,
          dbName:"newproj"
        },
        ({collection,client})=>{
          collection.insertOne(
            {title,sub_title,banner,detail:{auth,content,icon,time}}
            ,
            (err,result)=>{
                // console.log(result.ops)
              if(!err && result.result.n){
                res.send('/admin/banner?dataName='+dataName+'&start=1')
              }else{
                res.send('/admin/error?error=1&msg='+dataName+'集合链接有误')
              }
              client.close();
            }
          )
        }
      );
})

module.exports = router;