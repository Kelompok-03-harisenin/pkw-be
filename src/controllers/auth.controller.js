const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { User:UserModel } = require('../models')

const register = async (req, res, next) => {
    const {name, email, password} =  req.body;

    if (!email || !name || !password) {
        return res.status(401).send({message: "ERROR body is empty/isnt filled properly"})
    }

    const userFind = await UserModel.findOne({ where: {email}})

    if (userFind) {
        return res.status(401).send({message: "Email already exists"})
    }

    const passwordhashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        name,
        email,
        password: passwordhashed,
        biography: "",
        title: "",
        profile_picture: ""
        
    })
    if (!user) {
        return res.status(401).send({message: "Registration failed"})
    }

    return res.status(201).send({
        message: "Register successful",
        data: {
            name: user.name
        }
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).send({message: "ERROR body is empty/isnt filled properly"})
    }

    const user = await UserModel.findOne({ where: {email}})

    if (!user) {
        return res.status(401).send({message: "Email / Password Invalid"})
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return res.status(401).send({message: "Email / Password Invalid"})
    }

    const data = {
        id: user.id,
        name: user.name
    }

    const token = jwt.sign(data, process.env.JWT_SECRET)

    return res.status(200).send({
        message: "Login successful",
        data: {
            token: token
        }
    })
}



module.exports = { login, register }
