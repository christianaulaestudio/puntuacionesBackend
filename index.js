var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Puntuacion = require("./models/puntuacion");
var app = express();
//transforma las peticiones de texto a json usando bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("hola");
});

app.get("/puntuaciones/", (req, res) => {
  Puntuacion.find({}).exec((err, puntuaciones) => {
    if (err) {
      res
        .status(500)
        .send({ accion: "get all", mensaje: "error al obtener la puntuacion" });
    } else {
      res.status(500).send({ accion: "get all", datos: puntuaciones });
    }
  });
  /* let datosJSON = {
    accion: "get all",
    datos: [
      { nombre: "pepe", puntuacion: 33 },
      { nombre: "bea", puntuacion: 23 },
      { nombre: "felix", puntuacion: 29 }
    ]
  };
  res.status(200).send(datosJSON);*/
});

app.post("/puntuacion", (req, res) => {
  var datos = req.body;
  var puntuacion = new Puntuacion();
  puntuacion.nombre = datos.nombre;
  puntuacion.puntuacion = datos.puntuacion;
  puntuacion.save((err, puntuacionGuardada) => {
    if (err) {
      res.status(500).send({ accion: "save", mensaje: "Error al guardar la puntuacion" });
    } else {
      res.status(500).send({ accion: "save", datos: puntuacionGuardada });
    }
  });
  /*let datosJsonRespuesta = {
    accion: "save",
    datos: datos
  };
  res.status(200).send(datosJsonRespuesta);*/
});

app.delete("/puntuacion/:id", (req, res) => {
  let puntuacionId = req.params.id;
  Puntuacion.findByIdAndDelete(puntuacionId, (err , puntuacionBorrada)=>{
    if(err){
      res.status(500).send({ accion: "delete", mensaje: "Error al borrar la puntuacion" });
      if(!puntuacionBorrada){
        res.status(404).send({ accion: "delete", mensaje: "Error el id no existe" });
      }
    }else{
      res.status(500).send({ accion: "delete", datos: puntuacionBorrada });
    }
  })
 /* let datosJsonRespuesta = {
    accion: "delete",
    datos: puntuacionId
  };
  res.status(200).send(datosJsonRespuesta);*/
});

mongoose.connect("mongodb://localhost:27017/scores", (err, res) => {
  if (err) {
    console.log("error al conectarme a la bd");
  } else {
    console.log("conexion correcta a mongoDB");

    app.listen(5200, () => {
      console.log("API REST funcionando en el puerto 5200 ");
    });
  }
});
