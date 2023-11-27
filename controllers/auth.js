const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const prisma = new PrismaClient;
const bcrypt = require("bcrypt");

async function register(req, res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    const newUser = req.body

    const cryptPassword =  await bcrypt.hash(newUser.password, 10);

    const data = await prisma.user.create({
        data:{
            username: newUser.username,
            email: newUser.email,
            password: cryptPassword,
        }
    })

    res.send(data);
}

async function login(req, res) {
    res.send("login")
}

module.exports = {
    register,
    login
}