const AuthError = require("../exceptions/AuthError");
const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const bearer = req.headers.authorization;
  
    // controllo il bearer
    if (!bearer || !bearer.startsWith("Bearer ")) {
      throw new AuthError("Bearer token non trovato");
    }
  
    // estraggo il token
    const token = bearer.split(" ")[1];
  
    // verificare che il token sia valido. 
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req["user"] = user;

    next();
  };