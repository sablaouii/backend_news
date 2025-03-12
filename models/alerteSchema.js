const mongoose = require("mongoose");
const alerteSchema = new mongoose.Schema(
  {
    message: String,
    createdAt: { type: Date, default: Date.now },//Stocke automatiquement la date de création
    vue: { type: Boolean, default: false },  //Permet de savoir si l'utilisateur a vu l'alerte
    //receivedAt: { type: Date, default: Date.now },

    notif: { type: mongoose.Schema.Types.ObjectId, ref: 'Notif' },//Une alerte appartient à une seule notification
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many TO ONE 
    user: {type : mongoose.Schema.Types.ObjectId,ref: 'User'}// many TO many avec User
   
  },
  { timestamps: true }
);


const Alerte = mongoose.model("Alerte", alerteSchema);
module.exports = Alerte;