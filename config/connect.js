var MongoClients=require("mongodb").MongoClient;
var url="mongodb+srv://manasvi:manasvi96@cluster1-p2nwh.mongodb.net/test?retryWrites=true&w=majority"
module.exports.init=function(cb){
    MongoClients.connect(url,{ useNewUrlParser: true },{ useUnifiedTopology: true }, cb);
}  