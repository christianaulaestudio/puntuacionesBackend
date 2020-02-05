var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); //para mongo
var routerPuntuacion = require('./routers/puntuacion')
var morgan = require('morgan') // modulo para registrar las peticiones que nos van llegando desde la consola
var cors = require('cors')
var app = express();

//transforma las peticiones de texto a json usando bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())
app.use(morgan('dev')) // solo para modo desarrollo con el 'dev'

app.use('/puntuacion' , routerPuntuacion)

//abro las puertas de cors , npm install cors asi nos lo ahorramos
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});*/


// app.get("/", (req, res) => {
//   res.status(200).send("hola");
// });




//Conexion db y arranque servidor
/*mongoose.connect('mongodb://localhost:27018/scores', {useFindAndModify:true , useNewUrlParser: true , useUnifiedTopology: true } , (err, res) => {
  if (err) {
    console.log("error al conectarme a la bd");
  } else {
    console.log("conexion correcta a mongoDB");

    app.listen(5200, () => {
      console.log("API REST funcionando en el puerto 5200 ");
    });
  }
});*/

const run = async()=>{
  await mongoose.connect('mongodb://localhost:27018/scores', {useFindAndModify:true , useNewUrlParser: true , useUnifiedTopology: true })
  await app.listen(5200)
  console.log("Servidor y db arrancados")
}

run().catch(err => console.err(`Fallo al arrancar : ${err}`));