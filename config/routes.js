const blogRouter=require("../routes/AI");

module.exports=function(app){
app.use('/',blogRouter);

}