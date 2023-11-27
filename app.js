const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const RouterPost = require('./routers/Posts');
const RouterCategory = require('./routers/Categories');
const RouterTag = require('./routers/Tags');
const RouterAuth = require('./routers/auth')
app.use(express.json());

app.use("/posts", RouterPost);
app.use("/categories", RouterCategory);
app.use("/tags", RouterTag);
app.use("", RouterAuth);
// app.use(require('./middlewares/errorsMiddleware'));


app.use(require('./middlewares/routeNotFound'))

app.listen(process.env.PORT, () => {
    console.log(`server avviato sulla porta http://localhost/${process.env.PORT}`)
})