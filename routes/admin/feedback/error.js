let router = require("express").Router()
router.get("/",(req,res)=>{
    let msg = req.query
    res.render("./feedback/error_app",msg)
})

module.exports = router;