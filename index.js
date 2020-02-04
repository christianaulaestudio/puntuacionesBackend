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
//obtenemos todas las puntuaciones
app.get("/puntuaciones/", (req, res) => {
  Puntuacion.find({}).exec((err, puntuaciones) => {
    if (err) {
      res
        .status(500)
        .send({ accion: "get all", mensaje: "error al obtener la puntuacion" });
    } else {
      res.status(200).send({ accion: "get all", datos: puntuaciones });
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

//obtener una puntuacion filtramos por id
app.get("/puntuacion/:id", (req, res) => {
  let puntuacionId = req.params.id;
  //Puntuacion.find({_id:puntuacionId})
  Puntuacion.findById(puntuacionId).exec((err, puntuacion) => {
    if (err) {
      res
        .status(500)
        .send({ accion: "get one", mensaje: "error al obtener la puntuacion" });
    } else {
      res.status(200).send({ accion: "get one", datos: puntuacion});
    }
  });
});




//insertar una puntuacion
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
//eliminar una puntuacion
app.delete("/puntuacion/:id", (req, res) => {
  let puntuacionId = req.params.id;
  Puntuacion.findByIdAndDelete(puntuacionId, (err , puntuacionBorrada)=>{
    if(err){
      res.status(500).send({ accion: "delete", mensaje: "Error al borrar la puntuacion" });
     }else if(!puntuacionBorrada){
        res.status(404).send({ accion: "delete", mensaje: "Error el id no existe" });
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
//actualizar una puntuacion
app.put('/puntuacion/:id' , (req ,res)=>{
  var datos = req.body;
  let puntuacionId = req.params.id;
  Puntuacion.findByIdAndUpdate(puntuacionId , datos , (err , puntuacioActualizada)=>{
    if(err){
      res.status(500).send({ accion: "update", mensaje: "Error al actualizar la puntuacion" });
    }else if(!puntuacioActualizada){
      res.status(404).send({ accion: "update", mensaje: "Error el id no existe" });
    }else{
      res.status(500).send({ accion: "update", datos: puntuacioActualizada });
    }
  })
})

mongoose.connect('mongodb://localhost:27018/scores', (err, res) => {
  if (err) {
    console.log("error al conectarme a la bd");
  } else {
    console.log("conexion correcta a mongoDB");

    app.listen(5200, () => {
      console.log("API REST funcionando en el puerto 5200 ");
    });
  }
});
