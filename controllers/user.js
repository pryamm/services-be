const jwt = require('jsonwebtoken')
const User = require('../models/user')

const maxAge = 1 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({id}, 'astychis secret', {expiresIn: maxAge})
}

const handleErrors = (err) =>{
    console.log(err.message, err.code)
    let errors = {email: '', password:''}

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
        return errors
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect'
        return errors
    }

    //duplicate error code 11000
    if(err.code === 11000){
        errors.email = 'thats email already has been registered'
        return errors
    }
    //validation error
    if(err.message.includes('Auth validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.user_list_get = async (req, res) => {
    await User.find()
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(err=>console.log(err))
}

module.exports.user_detail_get = async (req, res) => {
    const id = req.params.id
    await User.findById(id)
        .then(result=>{
            res.status(200).send(result)
        })
        .catch(err=>console.log(err))
}

module.exports.user_delete_delete = async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
        .then(result=>{
            res.status(200).json({
                messages: 'delete success',
                redirect: '/user'
            })
        })
        .catch(err=>console.log(err))
}

module.exports.user_create_post = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000})
        console.log(token)
        res.status(201).json({data:user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.user_signin_post = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signin(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge})
        res.status(200).json({user:user._id})

    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.user_signout_post = (req, res) => {
        res.cookie('jwt', '', {maxAge: 1})
        res.status(200).send('logout success')
}