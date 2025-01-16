
//dotenv
require("dotenv").config();

//mongoose
const mongoose = require("mongoose");

//bcrypt
const bcrypt = require("bcrypt");




//schema 
const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        require: true, 
        unique: true, 
        trim: true, 
    },
    password: { 
        type: String,
        required: true, 
    },
    acc_created: { 
        type: Date,
        default: Date.now,
        
    }},
    { collection: "allUsers" });



//-------------Lösenordet Hashas innan det sparas-------------------------//


//pre-hook, den körs innan något sparas till databasen
userSchema.pre("save", async function(next) { 
    try{
        if(this.isNew || this.isModified("password")) { 
            const encryptedPassword = await bcrypt.hash(this.password, 12); 
            this.password = encryptedPassword; 
        }
        next() 
    }catch(error) { 
        next(error) 
    }
});
 
//----------------------------registrera en användare------------------------------//
userSchema.statics.register = async function(email, password) {
    try {
        const oneUser = new this({email: email.toLowerCase(), password}); 
        await oneUser.save(); 
        return oneUser; 
    } catch (error) { 
        throw error;
    }
};


//---------------------Logga in---------------------------------------------------//

userSchema.statics.login = async function (email, password) {
    try {
        const oneUser = await this.findOne({email: email.toLowerCase()}); 
        if(!oneUser) { 
            throw new error("Ogiltiga uppgifter"); }  

        const passwordMatch = await bcrypt.compare(password, oneUser.password);
        if(!passwordMatch) { 
            throw new error("Ogiltigta uppgifter");}
            
        return oneUser;
    } catch (error) { 
        throw error;
    }
};



//skapar model
const userModel = mongoose.model("userModel", userSchema);

//exporterar
module.exports = userModel;