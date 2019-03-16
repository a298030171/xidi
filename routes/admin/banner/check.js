let router = require("express").Router()
let mgdb = require("../../../common/mgdb")
let path = require("path")
let fs = require("fs")
let uploadUrl = require("../../../config/global").upload.banner

router.get("/",(req,res)=>{
    let {dataName,_id} = res.params;
    if(!dataName || !_id){
        res.redirect('/admin/error?msg=dataName和_id为必传')
        return;
    }

    let common_data = {
        ...res.user_session,
        ...res.params,
        page_header:dataName + '修改',
    };
  
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
            console.log(data)
            res.render('./banner/check.ejs',data);
          }else{
            res.redirect('/admin/error?error=1&msg='+dataName+'集合链接有误');
          }
          client.close();
        })
      })
})


router.post("/submit",(req,res)=>{
    let {title,sub_title,auth,content,dataName,banner_old,icon_old,_id,start,q,count,rule} = req.body;

    let icon,banner;
    req.files.forEach((items)=>{
        if(items.fieldname == "icon"){
            icon = uploadUrl + items.filename + path.parse(items.originalname).ext
        }
        if(items.fieldname == "banner"){
            banner = uploadUrl + items.filename + path.parse(items.originalname).ext
        }
        fs.renameSync(items.path, items.path + path.parse(items.originalname).ext)
    })
    if(!icon) icon = icon_old
    if(!banner) banner = banner_old
    mgdb(
        {
          collection:dataName,
          dbName:"newproj"
        },
        ({collection,client,ObjectId})=>{
          collection.updateOne(
            {_id:ObjectId(_id)},
            {$set:{title,sub_title,banner,detail:{auth,content,icon}}},
            (err,result)=>{
                console.log(result)
              if(!err && result.result.n){
                res.send('/admin/banner?dataName='+dataName+'&start='+(start-0+1)+'&q='+q+'&rule='+rule+'&count='+count)
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