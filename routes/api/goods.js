let router = require("express").Router()
let mgdb = require("../../common/mgdb")

router.get("/",(req,res)=>{
    let dataName = req.query.dataName;
    mgdb({
        collection:dataName,
        dbName:"newproj"
    },({collection,client})=>{
        collection.find({},{
            projection: {_id:0},
        }).toArray((err,result)=>{
            let data = {
                total:result.length,
                data:result
            }
            res.send({error:0,data})
        })
        client.close()
    })
})

module.exports = router