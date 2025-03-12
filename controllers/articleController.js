const articleModel = require('../models/articleSchema');
const userModel = require('../models/userSchema');

module.exports.getAllArticles = async (req, res) => {
    try {
      const articleList = await articleModel.find();
  
      if (!articleList || articleList.length === 0) {
        throw new Error("Aucun article trouvé");
      }
  
      res.status(200).json(articleList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.getArticleById = async (req, res) => {
    try {
      const id = req.params.id;
      const article = await articleModel.findById(id)
  
      if (!article || article.length === 0) {
        throw new Error("article introuvable");
      }
  
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.deleteArticleById = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Chercher l'article par ID
      const articleById = await articleModel.findById(id);
  
      // Vérifier si l'article existe
      if (!articleById) {
        return res.status(404).json({ message: "Article introuvable" });
      }
  
      // Supprimer l'article
      await articleModel.findByIdAndDelete(id);
  
      // Répondre avec un message de succès
      res.status(200).json({ message: "Article supprimé avec succès" });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.addArticle = async (req, res) => {
    try {
      const {titre,contenu,datePublication} = req.body;
  
      if (!titre & !contenu & !datePublication) {
        throw new Error("errue data");
      }
  
      const article = await articleModel.create({
        titre,
        contenu,
        datePublication,
      });
  
      res.status(200).json({ article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  module.exports.updateArticle = async (req, res) => {
    try {
      const id = req.params.id;
      const { titre, contenu, datePublication } = req.body;
  
      const articleById = await articleModel.findById(id);
  
      if (!articleById) {
        throw new Error("article introuvable");
      }
  
      if (!titre & !contenu & !datePublication) {
        throw new Error("errue data");
      }
  
      await articleModel.findByIdAndUpdate(id, {
        $set: { titre, contenu, datePublication},
      });
  
      const updated = await articleModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.affect = async (req, res) => {
    try {
      const { userId, articleId } = req.body;
  
      const articleById = await articleModel.findById(articleId);
  
      if (!articleById) {
        throw new Error("article introuvable");
      }
      const checkIfUserExists = await userModel.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await articleModel.findByIdAndUpdate(articleId, {
        $set: { owners: userId },
      });
  
      await userModel.findByIdAndUpdate(userId, {
        $push: { articles: articleId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
   module.exports.desaffect = async (req, res) => {
      try {
         const { userId, articleId } = req.body;
    
         const articleById = await articleModel.findById(articleId);
    
         if (!articleById) {
           throw new Error("article introuvable");
      }
         const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
           throw new Error("User not found");
         }
    
        await articleModel.findByIdAndUpdate(articleId, {
           $unset: { owner: 1 },// null "" 
         });
    
        await userModel.findByIdAndUpdate(userId, {
           $pull: { articles: articleId },
        });
    
        res.status(200).json('desaffected');
       } catch (error) {
        res.status(500).json({ message: error.message });
       }
    };