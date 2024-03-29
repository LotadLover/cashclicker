const { Schema, model } = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const userSchema = new Schema({ 
     email: { 
         type: String, 
         required: true, 
         unique: true
     }, 
     username: { 
         type: String, 
         required: true, 
         unique: true
     }, 
     password: { 
         type: String, 
         required: true,
     }, 
     gameData: { 
         type: Object, 
         required: true, 
         default: {
             count: 0, 
             upgrades: {

             }
         }, 
     },
     createdAt: { 
         type: Date, 
         default: new Date()
     }
})

// Thanks to the MEVN Boilerplate for the idea, https://github.com/sreyas-voruganti/MEVN-Boilerplate/blob/main/backend/src/models/User.js



userSchema.methods.generateToken = () => { 
     return jwt.sign({id: this._id}, process.env.JWT_KEY); 
}

userSchema.methods.verifyPassword = async (pwd) => { 
    try { 
        return await bcrypt.compare(pwd, this.password); 
    }
    catch (e) { 
        throw new Error(e); 
    }
}

module.exports = model("users", userSchema); 