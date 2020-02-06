var Puntuacion = require("../models/puntuacion");

//Comentado callbacks  , luego promesas , sin comentar  asyncway
async function getAll(req, res) {
  /* Puntuacion.find({}).exec((err, puntuaciones) => {
      if (err) {
        res
          .status(500)
          .send({ accion: "get all", mensaje: "error al obtener la puntuacion" });
      } else {
        res.status(200).send({ accion: "get all", datos: puntuaciones });
      }
    });*/

  /*
    Puntuacion.find({}).exec()
    .then( puntuaciones =>   res.status(200).send({ accion: "get all", datos: puntuaciones }))
    .catch(err =>   res.status(500).send({ accion: "get all", mensaje: `error al obtener la puntuacion ${err} ` }))
  */

  try {
    let puntuaciones = await Puntuacion.find();
    res.status(200).send({ accion: "get all", datos: puntuaciones });
  } catch (err) {
    res.status(500).send({ accion: "get all", mensaje: "error al obtener la puntuacion" });
  }
}


//obtener una puntuacion filtramos por id
async function getById(req, res) {

//   let puntuacionId = req.params.id;
  //Puntuacion.find({_id:puntuacionId})
//   Puntuacion.findById(puntuacionId).exec((err, puntuacion) => {
//     if (err) {
//       res
//         .status(500)
//         .send({ accion: "get one", mensaje: "error al obtener la puntuacion" });
//     } else {
//       res.status(200).send({ accion: "get one", datos: puntuacion });
//     }
//   });


  try {
    let puntuacionId = req.params.id;
    let puntuacion = await Puntuacion.findById(puntuacionId);
    res.status(200).send({ accion: "get one", datos: puntuacion });
  } catch (err) {
    res.status(500).send({ accion: "get one", mensaje: "error al obtener la puntuacion" });
  }

}




async function insert(req, res) {
//   var datos = req.body;
//   var puntuacion = new Puntuacion();
//   puntuacion.nombre = datos.nombre;
//   puntuacion.puntuacion = datos.puntuacion;
//   puntuacion.save((err, puntuacionGuardada) => {
//     if (err) {
//       res
//         .status(500)
//         .send({ accion: "save", mensaje: "Error al guardar la puntuacion" });
//     } else {
//       res.status(500).send({ accion: "save", datos: puntuacionGuardada });
//     }
//   });

try {
    var puntuacion = new Puntuacion(req.body); // te guardas a ti mismo a traves del objeto 
    let puntuacionGuardada = await puntuacion.save();
    res.status(200).send({ accion: "save", datos: puntuacionGuardada });
  } catch (err) {
    res.status(500).send({ accion: "save", mensaje: "error al obtener la puntuacion" });
  }




}




async function remove(req, res) {

//   let puntuacionId = req.params.id;
//   Puntuacion.findByIdAndDelete(puntuacionId, (err, puntuacionBorrada) => {
//     if (err) {
//       res
//         .status(500)
//         .send({ accion: "delete", mensaje: "Error al borrar la puntuacion" });
//     } else if (!puntuacionBorrada) {
//       res
//         .status(404)
//         .send({ accion: "delete", mensaje: "Error el id no existe" });
//     } else {
//       res.status(500).send({ accion: "delete", datos: puntuacionBorrada });
//     }
//   });

try {
    let puntuacionId = req.params.id;
    let puntuacionBorrada = await Puntuacion.findByIdAndRemove(puntuacionId);
    if(!puntuacionBorrada){
      return  res.status(500).send({ accion: "remove", mensaje: "error id" })
    }
    res.status(200).send({ accion: "remove", datos: puntuacionBorrada });
  } catch (err) {
    res.status(500).send({ accion: "remove", mensaje: "error al borrar la puntuacion" });
  }

}

async function update(req, res) {
    
//   var datos = req.body;
//   let puntuacionId = req.params.id;
//   Puntuacion.findByIdAndUpdate(
//     puntuacionId,
//     datos,
//     (err, puntuacioActualizada) => {
//       if (err) {
//         res.status(500).send({
//           accion: "update",
//           mensaje: "Error al actualizar la puntuacion"
//         });
//       } else if (!puntuacioActualizada) {
//         res
//           .status(404)
//           .send({ accion: "update", mensaje: "Error el id no existe" });
//       } else {
//         res.status(500).send({ accion: "update", datos: puntuacioActualizada });
//       }
//     }
//   );

try {
    var datos = req.body;
    let puntuacionId = req.params.id;
    let puntuacionActualizada = await Puntuacion.findByIdAndUpdate(puntuacionId , datos);
    if(!puntuacionActualizada){
      res.status(500).send({ accion: "update", mensaje: "error id" });
    }
    res.status(200).send({ accion: "update", datos: puntuacionActualizada });
  } catch (err) {
    res.status(500).send({ accion: "update", mensaje: "error al actualizar la puntuacion" });
  }

}

module.exports = { getAll, getById, insert, remove, update };
