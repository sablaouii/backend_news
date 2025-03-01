const userModel = require('../models/userSchema');
const formationModel = require('../models/formationSchema');
const jwt = require ('jsonwebtoken');
const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 *60 // 1min

const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime})
}
//add user
module.exports.addUserEmployeur = async (req,res) => {
    try {
        const {username , email , password , age} = req.body;
        const roleEmployeur ='employeur'
        if (!checkIfUserExists) {
                throw new Error("User not found");
               }
        const user = await userModel.create({
            username,email,password,role:roleEmployeur,age
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports.addUserEmployeurWithImg = async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleEmployeur = 'employeur'
        const {filename} = req.file

        const user = await userModel.create({
            username,email ,password,role : roleEmployeur , image_user : filename
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// ajout d'admin
module.exports.addUserAdmin= async (req,res) => {
    try {
        const {username , email , password}  = req.body;
        const roleAdmin = 'admin'
        const user = await userModel.create({
            username,email ,password,role :roleAdmin
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// donner tous les users 
module.exports.getAllUsers= async (req,res) => {
    try {
        const userListe = await userModel.find() 
        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


//recherche by id 
module.exports.getUserById= async (req,res) => {
    try {
        //const id = req.params.id
        const {id}=req.params
       // console.log(req.params)
        const user = await userModel.findById(id) 
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// l'utulisateur aando barsha formationnet bch yemchy yifasakh wahda mou3ayna mech l kol 

module.exports.deleteUserById= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("User not found");
        }

        await formationModel.updateMany({owners : id},{
            $unset: { owners: 1 },// null "" 
          });

        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



// modifier 
module.exports.updateUserById = async (req, res) => {
    try {
        const {id} = req.params
        const {email , username} = req.body;
    
        await userModel.findByIdAndUpdate(id,{$set : {email , username }})
        const updated = await userModel.findById(id)
    
        res.status(200).json({updated})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    };


    module.exports.searchUserByUsername = async (req, res) => {
        try {
    
            const { username } = req.query
            if(!username){
                throw new Error("Veuillez fournir un nom pour la recherche.");
            }
    
            const userListe = await userModel.find({
                username: {$regex: username , $options: "i"}
            })
    
            if (!userListe) {
                throw new Error("User not found");
              }
              const count = userListe.length
            res.status(200).json({userListe,count})
        } catch (error) {
            res.status(500).json({message: error.message});
        }
        };


        //trii
        module.exports.getAllUsersSortByAge= async (req,res) => {
            try {
                //men sghyr l kbir
                const userListe = await userModel.find().sort({age : 1}).limit(2)//l 5 lwelaa hethika pts limit
                //men kbir l sghyr
                //const userListe = await userModel.find().sort({age : -1})
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };


        module.exports.getAllUsersAgeBetMaxAgeMinAge= async (req,res) => {
            try {
                const MaxAge = req.query.MaxAge
                const MinAge = req.query.MinAge
                const userListe = await userModel.find({age:{$gt: MinAge,$lt:MaxAge}}).sort({age:1})
              
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };


        module.exports.getAllEmployeur= async (req,res) => {
            try {
                const userListe = await userModel.find({role : "employeur"})
              
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };


        module.exports.getAllAdmin= async (req,res) => {
            try {
                const userListe = await userModel.find({role : "admin"})
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };
        

        module.exports.login= async (req,res) => {
            try {
                const { email , password } = req.body;
                const user = await userModel.login(email, password)
                const token = createToken(user._id)
                res.cookie("jwt_token_9antra", token, {httpOnly:false,maxAge:maxTime * 1000})
                res.status(200).json({user})
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };
        // l token bch yetfasakh 
        module.exports.logout= async (req,res) => {
            try {
          
                res.cookie("jwt_token_9antra", "", {httpOnly:false,maxAge:1})// 1 meli second
                res.status(200).json("logged")
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }