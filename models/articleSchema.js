const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    titre:String,
    contenu:String,
    date_pub:Date,
    categorie:String,
    owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many to one 
    //owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many to one
    
},
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;