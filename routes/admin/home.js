let router = require("express").Router()

router.get("/",(req,res,next)=>{
    let common_data={
        ...res.user_session,
        active:"index"
    }
    res.render("home",common_data)
})

module.exports = router;