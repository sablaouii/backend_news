const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    date_pub:Date,

    owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many to one 
},
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
