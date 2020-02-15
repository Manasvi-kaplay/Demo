var express=require("express");
var router=express.Router();
var product = require("../model/product");
var changename = require("../helper/changefilename");
var path = require('path');
var Mongodb=require("mongodb");
var fs=require("fs");
router.get('/',function(req,res){
    var pagedata={
        "pagename":"addproduct",            
        "title":"Add new product"
    }
    res.render("layout",pagedata)
})
router.post('/addproduct',function(req,res){
    var image=[];
     var pagedata={
       "pagename":"submit",
       "title":"Product added"
     }
    //  console.log("req.body ........",req.body)
     console.log("req.files .....",req.files)
     if(req.files.image.name){
         var obj_image=[];
         obj_image.push(req.files.image);
         req.files.image=obj_image;   
     }
     for(var i=0;req.files.image.length>i;i++){
         var file_file=req.files.image[i]
         var file=file_file.name
         image.push(file)
        console.log("images..............",image)
              var filepath = path.resolve("public/product_images/"+file);
              file_file.mv(filepath, function(err){
                 	if(err){
                 		console.log(err);
                 		return;
                 	}    
                     req.body.image=image;
                 });
                }
                //req.body.image=image
    product.insert(req.body,function(err,result){
          if(err){
              res.send(err)
          }
          if(result){
              res.send(result)
          }
                                                })
})
router.get('/edit/:id',function(req,res){
    var id=req.params.id;
    product.findWhere({_id:Mongodb.ObjectId(id)},function(err,result){
    if(err){
        console.log("error.....",err)
    }
    if(result){
        var data=result[0];
        var pagedata={ "pagename":"edit","title":"Product",data:data}
        console.log("RRRRRRRRRR",data);
    }
    res.render("layout",pagedata);      
                                    })
})
router.post('/edit',function(req,res){
    console.log("req.body.......",req.body)
    console.log("image array.....",req.body.image)
    console.log("req.files......",req.files);
    var id = req.body._id;
    product.findWhere({_id:Mongodb.ObjectID(id)},function(err,result){
        if(result){
            var data=result[0];
        console.log("data.....",data);
        var image=data.image;
        console.log("image....",image)
    if(req.files){
    for(img in image){
        var oldfilepath = path.resolve("public/product_images/"+image[img]);
		fs.unlinkSync(oldfilepath);
                     }
    image=[];
    console.log("IMMMMMMMMMMMMGGGGGGGGG",image);
    for(var i=0;req.files.image.length>i;i++){
            var file_file=req.files.image[i]
            var file=file_file.name
            image.push(file)
           console.log("images..............",image)
                 var filepath = path.resolve("public/product_images/"+file);
                 file_file.mv(filepath, function(err){
                        if(err){
                            console.log(err);
                            return;
                        }    
                    });
                   }
                                              }
    var productname=req.body.productname;
    var category=req.body.category;
    var price=req.body.price;
    var description=req.body.description;
    var imagename=req.body.imagename;
    req.body.image=image
    console.log("Final img array.....",req.body.image)
    product.update({_id : Mongodb.ObjectId(id)},{productname:productname,category:category,price:price,description:description,imagename:imagename,image:image},function(err,result1){
        if(err){
            console.log("Product could not be updated",err);
            res.send("Product could not be updated");
        }
        if(result1){
            console.log("Product updated!")
            //console.log("Updated product:",result1);
            res.send("Product updated!");
        }
    })
}
})
})
router.get('/delete/:id',function(req,res){
    var id=req.params.id;
    console.log("Id.....",id);
    product.findWhere({_id:Mongodb.ObjectID(id)},function(err,result){
        if(result){
        var data=result[0];
        console.log("data.....",data);
        var image=data.image;
        console.log("image....",image)
    for(img in image){
        var oldfilepath = path.resolve("public/product_images/"+image[img]);
		fs.unlinkSync(oldfilepath);
    }
    product.delete({_id:Mongodb.ObjectID(id)},function(err,result1){
        if(err){
            console.log("Product could not be deleted");
            res.send("Product could not be deleted");
        }
        if(result1){
            console.log("Product deleted!")
            //console.log("deleted product:",result);
            res.send("Product deleted!");
        }
    })
                   }
}) 
})
module.exports=router;