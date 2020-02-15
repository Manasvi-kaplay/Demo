var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
    var db = client.db('test');
db.collection("productdetails").insert(obj,cb)
});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db('test');
		db.collection('productdetails').find().toArray(cb);
	});
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('test');
		db.collection('productdetails').find(obj).toArray(cb);
	});
}
module.exports.update=function(where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('test');
  db.collection("productdetails").updateOne(where,{$set:obj},cb)
});
}
module.exports.delete=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('test');
		db.collection("productdetails").deleteOne(obj,cb)
	})
}
