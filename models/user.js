const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        name: {
                type: String, 
                required: false
        },
        address: {
                type: String, 
                required: false
        },
        industry: {
                type: String, 
                required: false
        },
        website: {
                type: String, 
                required: false
        },
        about: {
                type: String, 
                required: false
        },
        email: {
                type: String, 
                required: [true, 'please enter an email'], 
                unique: true, 
                lowercase: true,
                validate: [isEmail, 'please enter a valid email']
        },
        password: {
                type: String, 
                required: [true, 'please enter an password'], 
                minlenght: [8, 'please enter an password with lenght at least 1 character']
        },
        roles: {
                type: String, 
                required: false
        },
        status: {
                type: String, 
                required: false
        },
        logo: {
                type: String, 
                required: false
        },
        image: {
                type: String, 
                required: false
        }
}, {timestamps:true})

//fire a funct before doc save to db
userSchema.pre('save', async function(next) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
})

//static method login 
userSchema.static('signin', async function(email, password){
        const user = await this.findOne({email: email})
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user
            }
            throw Error('incorrect password')
        }
        throw Error('incorrect email')
})

const User = mongoose.model('User', userSchema)
module.exports = User