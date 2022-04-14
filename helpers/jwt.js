const jwt = require("jsonwebtoken")

const generateJwt = (id , name) => {

    return new Promise ((resolve , reject) => {
        const payload = {id , name}

        jwt.sign(payload , process.env.secretKey , {
            expiresIn: '2h'
        } , (err , token) => {
            if(err){
                console.log(err);
                reject(err)
            }

            resolve(token)
        })
    })
}

module.exports = generateJwt