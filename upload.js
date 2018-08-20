var express = require("express");
var multer = require("multer");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./fileupload/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var app = express();

//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine(".html", require("ejs").__express);
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set("view engine", "html");
//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set("views", __dirname);

app.use(express.static('fileupload'));

function getFileListName() {
  let aFileName = [];
  aFileName = fs.readdirSync("./fileupload/");
  return aFileName;
}

app.post("/upload/add", upload.single("myFile"), function(req, res) {
  let aFileName = getFileListName();
  res.render("index", {
    fileList: aFileName
  });
});

app.get('/download', function(req, res) {
    let { fileName } = req.query;
    res.download('./fileupload/' + fileName, fileName);
})

app.get("/", function(req, res) {
  let aFileName = getFileListName();
  res.render("index", {
    fileList: aFileName
  });
});

app.listen(3000);
