const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const generateJwt = require("../helpers/jwt");
const User = require("../models/user");


const createUser = async (req = request , res = response) => {

    const {email , password , name} = req.body

    try {

        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                message: 'Email alredy used'
            })
        }

         user = new User(req.body)

        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password , salt)

        await user.save()

        const token = await generateJwt(user._id , name)

        res.status(201).json({
            id: user._id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Comunicarse con el administrador'
        })
    }
}

const login = async (req = request , res = response) => {
    const {email , password} = req.body 

    try {
        let user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                message: 'The user does not exist with that email'
            })
        }

        const validPassword = bcryptjs.compareSync(password , user.password)

        if (!validPassword) {
            return res.status(400).json({
                message: 'Password incorrect'
            })
        }

        const token = await generateJwt(user._id , user.name)

        res.status(200).json({
            id: user._id,
            name: user.name,
            token,

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Comunicarse con el administrador'
        })
    }
}

const revalidateJwt = async (req = request , res = response) => {
    
    const {id , name} = req

    const token = await generateJwt(id , name)
    
    res.status(200).json({
        id,
        name,
        token
    })

}

module.exports = {
    createUser,
    login,
    revalidateJwt
}