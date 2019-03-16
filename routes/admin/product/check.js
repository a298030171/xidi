let router = require("express").Router()
let mgdb = require("../../../common/mgdb.js")
let uploadUrl = require("../../../config/global").upload.product;
let path = require("path")
let fs = require("fs")

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

    let common_data={
        ...res.user_session,dataName,
        page_header:dataName+'修改',
        active:dataName,start,count,q,rule,_id
    }
    mgdb({
        dbName:"newproj",
        collection:'goods'
    },({collection,client,ObjectId})=>{
        collection.find({
            _id:ObjectId(_id)
        }).toArray((err,result)=>{
            if(!err && result.length>0){
                let data = {
                    ...common_data,
                    page_data:result[0]
                }
                res.render("./product/check",data)
              }else{
                res.redirect('/admin/error?msg='+dataName+'操作错误')
              }
              client.close();
        })
    })
    
})

router.post("/submit",(req,res)=>{
    // console.log(req.body)
    let {name,price,desc,country,flag,id,dataName,_id,start,q,rule,count} =req.body;

    var src,moreimg1,moreimg2
    var img = []
    let arr = []
    req.files.forEach((items,index)=>{
        if(items.fieldname == 'banner'){
           src = uploadUrl + items.filename + path.parse(items.originalname).ext
        }
        if(items.fieldname == 'moreimg1'){
           moreimg1 = uploadUrl + items.filename + path.parse(items.originalname).ext
        }
        if(items.fieldname == 'moreimg2'){
           moreimg2 = uploadUrl + items.filename + path.parse(items.originalname).ext
        }
        if(items.fieldname == 'imgarr'){
            // console.log(items,index)
            arr.push(items)
            for(var i = 0 ; i < arr.length; i++){
               img[i] = uploadUrl + arr[i].filename + path.parse(arr[i].originalname).ext
            }
        }
        fs.renameSync(items.path,items.path + path.parse(items.originalname).ext)
    })
    console.log(src,moreimg1,moreimg2,img)
    
    if(!src) src = '/upload/noimage.png';
    if(!moreimg1) moreimg1 = '/upload/noimage.png';
    if(!moreimg2) moreimg2 = '/upload/noimage.png';

    mgdb({
        collection:'goods',
        dbName:"newproj"
    },({collection,client,ObjectId})=>{
        collection.updateOne({_id:ObjectId(_id)},{
            $set:{src,name,desc,price,country,flag,moreimg1,moreimg2,id,imgarr:{img1:img[0],img2:img[1]}}
        },(err,result)=>{
            if(!err && result.result.n){
                res.send('/admin/product?dataName='+dataName+'&start='+start+'&count='+count+'&q='+q+'&rule='+rule)
            }else{
                res.send('/admin/error?msg=集合操作错误')
            }
            client.close();
        })
    })

})


module.exports = router;