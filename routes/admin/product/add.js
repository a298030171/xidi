let router = require("express").Router()
let path = require("path")
let uploadUrl = require("../../../config/global").upload.product
let fs = require("fs")
let mgdb = require("../../../common/mgdb")

router.get("/",(req,res)=>{
    let dataName = req.query.dataName;
    let common_data={
        ...res.user_session,dataName,
        page_header:dataName+'添加',
        active:dataName
    }
    res.render("./product/add",common_data)
})

router.post("/submit",(req,res)=>{
    let dataName = req.body.dataName;
    let time = Date.now()
    // console.log(req.body)
    console.log(req.files)
    // console.log(dataName)
    let {name,price,desc,country,flag,id} = req.body 
    // let auth_icon =req.files.length>0? uploadUrl + req.files[0].filename + path.parse(req.files[0].originalname).ext :"";
    // if(auth_icon){
    //     fs.renameSync(req.files[0].path,req.files[0].path + path.parse(req.files[0].originalname).ext)
    // }else{
    //     auth_icon = '/upload/product/noimage.png'
    // }
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
    // if(img.length=0) img = '/upload/noimage.png';

    mgdb({
        dbName:"newproj",
        collection:'goods'
    },({collection,client,ObjectId})=>{
        collection.insertOne(
            {src,name,desc,price,country,flag,moreimg1,moreimg2,id,imgarr:{img1:img[0],img2:img[1]}}, 
            function(err, result) {
                if(!err && result.result.n){
                    let io = require('../../../bin/www')
                    io.emit('insertdata',{data:result.ops[0]})
                    res.send('/admin/product?dataName='+dataName+'&start=1')
                }else{
                    res.send('/admin/error?msg=集合操作错误')
                }
                client.close();
            }
        );
    })

})

module.exports = router;