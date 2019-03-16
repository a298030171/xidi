let router = require("express").Router()
let uploadUrl = require("../../../config/global").upload.user
let path = require("path")
let fs = require("fs")
let mgdb = require("../../../common/mgdb")

router.get("/",(req,res)=>{
    let dataName = req.query.dataName;
    if(!dataName){
        res.redirect('/admin/error?msg=dataName为必传')
    }
    let common_data = {
        ...res.user_session,
        ...res.params,
        page_header:dataName + '添加'
    };
    res.render("./user/add",common_data)
})

router.post("/submit",(req,res)=>{
    let {username,password,follow,fans,nikename,dataName} = req.body;
    let time=Date.now();
    let icon = req.files.length ? uploadUrl + req.files[0].filename + path.parse(req.files[0].originalname).ext : '';
    if(icon){
        fs.renameSync(
          req.files[0].path,
          req.files[0].path+path.parse(req.files[0].originalname).ext
        )
    }else{
        icon = '/upload/noimage.png';
    }

    mgdb(
        {
          collection:dataName,
          dbName:"newproj"
        },
        ({collection,client})=>{
          collection.find({username}).toArray((err,result)=>{
            if(!err && result.length>0){
              res.send('/admin/error?error=1&msg=用户名已存在')
            }else{
              collection.insertOne(
                {username,password,follow,fans,nikename,icon,time}
                ,
                (err,result)=>{
                  if(!err && result.result.n){
                    res.send('/admin/user?dataName='+dataName+'&start=1')
                  }else{
                    res.send('/admin/error?error=1&msg='+dataName+'集合链接有误')
                  }
                  client.close();
                }
              )
            }
          })
          
        }
      );
})

module.exports = router;