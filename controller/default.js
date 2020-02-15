var express=require("express");
var router=express.Router();
router.use("/",require("./home"))
router.use("/login",require("./login"))
//router.use("/update",require("./updateproduct"))
router.use("/addproduct", require("./addproduct"));
router.use("/logout",require("./logout"))
function backdoor(req, res, next)
{
	if(! req.session.is_user_logged_in)
	{
		res.redirect("/");
	}
	next();
}
module.exports=router;