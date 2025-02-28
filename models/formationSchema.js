const mongoose = require("mongoose");
const formationSchema = new mongoose.Schema(
  {
    id_f:String,
    titre:String,
    contenu:String,
    departement:String,
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many TO ONE 
    owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many TO many
  },
  { timestamps: true }
);


const Formation= mongoose.model("Formation", formationSchema);
module.exports = Formation;