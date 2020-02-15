var express = require('express');
var router = express.Router();
var product=require("../model/product");
router.get('/', function(req, res){
	req.session.destroy();	
    product.find(function(err, result){
        var pagedata = { title : "Home page", pagename : "home", data : result};
        res.render("layout",pagedata)
})
});
module.exports=router;