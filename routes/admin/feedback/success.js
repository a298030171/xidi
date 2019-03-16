let router = require("express").Router()
router.get("/",(req,res)=>{
    res.render("./feedback/success",{})
})

module.exports = router;