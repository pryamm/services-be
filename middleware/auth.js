
const jwt = require('jsonwebtoken')

module.exports.auth = (req, res, next) =>{

    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'astychis secret', (err, decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/user/signin')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/user/signin/')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt 
    if (token) {
        jwt.verify(token, 'astychis secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                next()                
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }
}