const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const prisma = new PrismaClient;

async function register(req, res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    const newUser = req.body

    const data = await prisma.user.create({
        data:{
            ...newUser
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