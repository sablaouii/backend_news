const userModel = require('../models/userSchema');
const notifModel= require('../models/notifSchema');
const alerteModel=require('../models/alerteSchema');



module.exports.getAllNotifs = async (req, res) => {
    try {
      const notifList = await notifModel.find();
  
      if (!notifList || notifList.length === 0) {
        throw new Error("Aucun notif trouvé");
      }
      res.status(200).json(notifList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



   module.exports.getNotifById = async (req, res) => {
     try {
         const id = req.params.id;
         const notif = await notifModel.findById(id); 

  
       if (!notif || notif.length === 0) {
         throw new Error(" notif introuvable");
       }
       res.status(200).json(notif);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };


  module.exports.deleteNotifById = async (req, res) => {
    try {
       const id = req.params.id;
  
       const formationById = await formationModel.findById(id);
  
       if (!notifnotifById || notifById.length === 0) {
        throw new Error("notif introuvable");
       }
  
       await notifModel.updateMany({user : id},{
        $unset: { user: 1 },// null "" 
      });

       await notifModel.updateMany({}, {
           $pull: { notifs: id },
         });
  
      await notifModel.findByIdAndDelete(id);
  
       res.status(200).json("deleted");
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };  



   module.exports.addNotif = async (req, res) => {
      try {
        const { titre,contenu, createdAt } = req.body;
        if (!titre & !createdAt & !contenu ) {
          throw new Error("errue data");
       }
  
        const notif= await notifModel.create({
        titre,
         createdAt,
         contenu,
        });
  
        res.status(200).json({ notif });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   };

  


   module.exports.updateNotif = async (req, res) => {
    try {
      const id = req.params.id;
     const { titre,contenu, createdAt } = req.body;
 
      const notifById = await notifModel.findById(id);
 
     if (!notifById) {
        throw new Error("notif introuvable");
      }
 
      if (!titre & !contenu & ! createdAt ) {
       throw new Error("errue data");
      }
 
      await notifModel.findByIdAndUpdate(id, {
        $set: { titre, contenu, createdAt },
      });
 
      const updated = await notifModel.findById(id);
 
      res.status(200).json({ updated });
    } catch (error) {
     res.status(500).json({ message: error.message });
   }
  };



 module.exports.affect = async (req, res) => {
    try {
        const { userId, notifId } = req.body;

        const notifById = await notifModel.findById(notifId);

       if (!notifById) {
            throw new Error("notif introuvable");
       }

        const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
            throw new Error("User not found");
        }

        // Ajouter userId  dans notif
        await notifModel.findByIdAndUpdate(notifId, {
         $set: {user: userId },
        });

        // Ajouter notifId dans notifs[] dans user
        await userModel.findByIdAndUpdate(userId, {
            $push: { notifs: notifId },
        });

        res.status(200).json("affected");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.desaffect = async (req, res) => {
   try {
        const { userId, notifId } = req.body;

        const notifById = await notifModel.findById(notifId);
        if (!notifById) {
           throw new Error("notif introuvable");
       }

        const checkIfUserExists = await userModel.findById(userId);
       if (!checkIfUserExists) {
            throw new Error("User not found");
       }

        // Supprimer userId  dans notif
        await notifModel.findByIdAndUpdate(notifId, {
          $unset: { user: 1 },//null
        });

        // Supprimer notifId de notif[] dans user
        await userModel.findByIdAndUpdate(userId, {
            $pull: { notifs: notifId },
        });

       res.status(200).json("desaffected");
    } catch (error) {
        res.status(500).json({ message: error.message });
  }
};
