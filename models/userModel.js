const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
})

// Static login method
userSchema.statics.login = async function(email, password) {

    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }

    // Get user
    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect email');
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }

    return user;
}

// Static signup method
userSchema.statics.signup = async function(email, password) {

    // Validation 
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }
    // Email validity
    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email!')
    }
    // Password strength
    if (!validator.isStrongPassword(password)) {
        throw Error('Please enter a strong password!')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema);