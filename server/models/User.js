const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    email: {
        type: 'string', 
        required: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
    },
    password: {type: 'string', required: true}

});

userSchema.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await this.constructor.hashPassword(this.password)
    }
    next()
})

userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password,10)
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAuthToken = async function(){
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

module.exports = mongoose.model('User', userSchema)