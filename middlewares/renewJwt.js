const { request, response } = require("express");
const jwt = require("jsonwebtoken");

 const renewJwt = (req = request , res = response , next) => {
    
    const token = req.header('x-token')

    if (!token) {
        return res.status(404).json({
            message: 'no token'
        })
    }

    try {
        const {id , name} = jwt.verify(token , process.env.secretKey)
        req.id = id,
        req.name = name
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message : 'Token no create'
        })
    }

    next()

}

module.exports = renewJwt
