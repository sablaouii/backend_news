const mongoose = require("mongoose");
const notifSchema = new mongoose.Schema(
  {
    titre:String,
    contenu:String,
    createdAt: { type: Date, default: Date.now }
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many TO ONE 
    //owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many TO many
  },
  { timestamps: true }
);


const Notif= mongoose.model("Notif", notifSchema);
module.exports = Notif;

