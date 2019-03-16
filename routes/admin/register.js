let router = require("express").Router()

router.get("/",(req,res)=>{
    res.render("reg",{})
})

module.exports = router;