var express = require('express')
var path = require('path')
var app = express()
var alert = require('alert-node')

var session = require('express-session')
var nodemailer = require('nodemailer');
var multer = require('multer');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/uploads')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: "LifeIsSad",
  resave: false,
  saveUnintialized: true,
}))

app.use(function (req, res, next) {
  next();
})

var mongoose = require('mongoose');
var userdb = 'mongodb://localhost/quickStay';

mongoose.connect(userdb);

mongoose.connection.on('error',(err) => {
  console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
   useNewUrlParser: true;
  console.log('DB connected');
})

var userSchema = new mongoose.Schema({
    fullname: String,
    phone: String,
    email: String,
    password: String,
})

var user = mongoose.model('users', userSchema);

app.get('/',function(req,res)
  {
      res.render('signin');
  })

app.get('/adduser',logger,function(req,res)
{
    res.render('adduser',{obj : req.session.data , exists:exists});
    exists=0;
})

app.post('/adduser',function(req,res)
{
    exists = 0;
    var obj = req.body;
    user.find({
      email: req.body.email,
    })
    .then(data =>
    {
        if(data.length != 0){
          exists = 1;
          res.redirect('/adduser')
        }
        else{
            user.create(obj,function(error,result){
                if(error)
                    throw err;
            })
            alert("Sign Up Succesfull");
            res.sendFile(path.join(__dirname + '/public/index.html'));  
        }
    });
});

app.post('/signin',function(req,res){
  console.log(req.body)
    user.find({
        email: req.body.email,
        password: req.body.password
      })
      .then(data =>
        {
          if(data.length > 0){
            req.session.fullname = data[0].fullname
            res.send("1");
          }
          else{
            res.send("-1");
          }
        })
      .catch(err => {
        res.send(err)
      })
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

app.post('/uploadFile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    console.log(file);
    res.send(file)
})

app.listen(3000,function()					//Server Running Confirmation
{
      console.log("Running on port 3000");
});

//MIDDLEWARE FUNCTIONS
function logger(req,res,next)				//login vaala 
{
  if(req.session.isLogin)
  {
    next();
  }
  else {
      res.redirect('/');
  }
}