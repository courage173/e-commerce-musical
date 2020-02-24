const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token:{
        type:String
    }
})

userSchema.pre('save',function(next){
    var user = this
    if(user.isModified('password')){
        bcrypt.genSalt(10,function(err,salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password,salt,function(err,hash){
               if(err) return next(err) 
               user.password =hash 
               next();
            } )
        })
    } else{
        next()
    }
   
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err)
        cb(null,isMatch)
    })
}
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRETE)

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        user.findOne({"_id": decode, "token": token},function(err,user){
            if(err) return cb(err)
            cb(null,user);
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = {User}