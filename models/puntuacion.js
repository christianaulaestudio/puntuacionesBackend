let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PuntuacionSchema = Schema({
  _id: { type: Schema.ObjectId, auto: true },
  nombre: String,
  puntuacion: Number
});

//nombre db en singular y mayuscula
module.exports = mongoose.model('Score', PuntuacionSchema);
