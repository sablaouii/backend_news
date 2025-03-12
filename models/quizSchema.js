const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
  {
    id_quiz:String,
    titre:String,
    id_f:String,
   
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many TO ONE 
    owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}], // many TO many
    certificats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }]
  },
  { timestamps: true }
);


const Quiz= mongoose.model("Quiz", quizSchema);
module.exports = Quiz;