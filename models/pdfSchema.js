const mongoose = require("mongoose");
const pdfSchema = new mongoose.Schema(
  {
    id_ch:String,
    titre:String,
    fichier:String,
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many TO ONE 
    owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many TO many
  },
  { timestamps: true }
);


const Pdf= mongoose.model("Pdf", pdfSchema);
module.exports = Pdf;