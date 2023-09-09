var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
/*
Ao enviar um arquivo, você recebe name (nome), type (tipo) e size (tamanho, em bytes) do arquivo dentro da resposta em JSON.
{
  "name":"Screenshot_8.png",
  "type":"image/png",
  "size":168195
}
*/
//////////////////////////////////////////////////
//////////////////////////////////////////////////
/*
Podemos usar o package "multer"
https://www.npmjs.com/package/multer/v/1.4.2
*/
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const multer = require("multer");

const storage = multer.memoryStorage()

let upload = multer({ storage: storage })

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
   res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
   });
});
