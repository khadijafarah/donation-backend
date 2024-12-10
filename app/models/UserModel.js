
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require ("bcrypt")
const saltRounds = 10;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userPhoto: {
        type: String,
        default:"default.jpg"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate:{ 
            validator:function (value){
            //Ensure the password is a string
            return typeof value === "string";
        },
        message:"Password must be a string",
    },
    },
    role: {
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    }
});
//using regular function as arrow function does not support this keyword
userSchema.pre("save", async function (next){
  try {
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  } catch (error) {
    next(error)
  }
})
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}
const User = mongoose.model('User', userSchema);
module.exports = User