var express = require("express");
var bodyParser = require("body-parser");

var app = express();
//transforma las peticiones de texto a json usando bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("hola");
});

app.get("/puntuaciones/", (req, res) => {
  let datosJSON = {
    accion: "get all",
    datos: [
      { nombre: "pepe", puntuacion: 33 },
      { nombre: "bea", puntuacion: 23 },
      { nombre: "felix", puntuacion: 29 }
    ]
  };
  res.status(200).send(datosJSON);
});

app.post('/puntuacion' , (req,res)=>{
    var datos = req.body
    let datosJsonRespuesta = {
        accion :  'save',
        datos : datos
    }
    res.status(200).send(datosJsonRespuesta)
})

app.delete('/puntuacion/:id' , (req,res)=>{
let puntuacionId = req.params.id
let datosJsonRespuesta = {
  accion : 'delete',
  datos : puntuacionId
}
res.status(200).send(datosJsonRespuesta)

})

app.listen(5200, () => {
  console.log("API REST funcionando en el puerto 5200 ");
});
