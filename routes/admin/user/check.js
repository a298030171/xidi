let router = require("express").Router()
let mgdb = require("../../../common/mgdb")
let path = require("path")
let fs = require("fs")
let uploadUrl = require("../../../config/global").upload.user

router.get("/",(req,res)=>{
    let {_id,dataName} = res.params;
    if(!_id || !dataName){
        res.redirect('/admin/error?msg=_id和dataName为必传参数')
        return;
    }
    let common_data = {
        ...res.params,
        ...res.user_session,
        page_header:dataName + '修改'
    }

    mgdb({
        collection:dataName,
        dbName:"newproj"
      },({collection,client,ObjectId})=>{
        collection.find({
          _id:ObjectId(_id)
        }).toArray((err,result)=>{
          if(!err){
            data={
              ...common_data,
              page_data:result[0]
            }
            res.render('./user/check.ejs',data);
          }else{
            res.redirect('/admin/error?error=1&msg='+dataName+'集合链接有误');
          }
          client.close();
        })
      })
})

router.post("/submit",(req,res)=>{
    let {username,password,nikename,follow,fans,dataName,icon_old,_id,start,q,count,rule} = req.body;
    let icon = req.files.length ? uploadUrl + req.files[0].filename + path.parse(req.files[0].originalname).ext : '';
    if(icon){
        fs.renameSync(
        req.files[0].path,
        req.files[0].path + path.parse(req.files[0].originalname).ext
        )
    }else{
        icon = icon_old
    }
    
    mgdb({
        collection:dataName,
        dbName:"newproj"
    },({collection,client,ObjectId})=>{
        collection.updateOne(
            {_id:ObjectId(_id)},
            {$set:{username,password,nikename,follow,fans,icon}},
            (err,result)=>{
              if(!err && result.result.n){
                res.send('/admin/user?dataName='+dataName+'&start='+(start-0+1)+'&q='+q+'&rule='+rule+'&count='+count)
              }else{
                res.send('/admin/error?error=1&msg='+dataName+'集合链接有误')
              }
              client.close();
            }
          )
    })
    
})
module.exports = router;