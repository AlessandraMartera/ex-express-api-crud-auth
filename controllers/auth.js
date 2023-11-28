const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const AuthErrorMiddleware = require('../middlewares/authError')
const prisma = new PrismaClient;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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

      // genero il token JWT
  // npm i jsonwebtoken
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ data, token });
}

async function login(req, res) {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

      // Recuperare i dati inseriti dall'utente
  const { email, password } = req.body;

  // controllare che ci sia un utente con quella email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.send("utente non trovato");
  }

  // controllare che la password sia corretta
  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    res.send("password errata");
  }

  // generare il token JWT
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });


    res.send(`Welcome ${user.username}`)
}

module.exports = {
    register,
    login
}