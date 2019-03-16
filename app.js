var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cookieSession = require("cookie-session")
let multer = require("multer")
let bodyParser = require("body-parser")
// let mgdb = require("./common/mgdb")
// mgdb({
//   dbName:"1812",
//   collection:"user"
// },function({client,collection,ObjectId}){
//   console.log(collection)
//   console.log(client)
//   console.log(ObjectId)
// })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieSession({
  name:"node_id",
  keys:["key1","key2"]
}))

app.use(bodyParser())
app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public','template')))
app.use("/admin",express.static(path.join(__dirname, 'public','admin')))
app.use(express.static(path.join(__dirname, 'public')))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('product')!==-1){
      cb(null, path.join(__dirname, 'public','upload','product'))
    }
    if(req.url.indexOf('user')!==-1){
      cb(null, path.join(__dirname, 'public','upload','user'))
    }
    if(req.url.indexOf('banner')!==-1){
      cb(null, path.join(__dirname, 'public','upload','banner'))
    }
  }
})
var upload = multer({ storage })
app.use(upload.any())

app.use("/admin/login",require("./routes/admin/login"))
app.use("/admin/logout",require("./routes/admin/logout"))
app.use("/admin/register",require("./routes/admin/register"))
app.use("/admin/error",require("./routes/admin/feedback/error"))
app.use("/admin/success",require("./routes/admin/feedback/success"))

app.all("/admin/*",require("./routes/admin/islogin"))

app.use("/admin",require("./routes/admin/home"))
app.use("/admin/home",require("./routes/admin/home"))
app.use("/admin/banner",require("./routes/admin/banner"))
app.use("/admin/product",require("./routes/admin/product"))
app.use("/admin/user",require("./routes/admin/user"))

app.all("/api/*",require("./routes/api/params"))
// app.use("/api/product",require("./routes/api/product"))
app.use("/api/banner",require("./routes/api/banner"))
app.use("/api/login",require("./routes/api/login")) 
app.use("/api/logout",require("./routes/api/logout")) 
app.use("/api/goods",require("./routes/api/goods")) 
app.use("/api/register",require("./routes/api/register")) 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(req.url.indexOf('/api') !== -1){
    res.send({error:1,msg:'错误的接口和请求方式'})
  }else{
    res.render('./feedback/error_app');
  }
});

module.exports = app;
