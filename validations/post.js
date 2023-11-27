/**
 * @type {import("express-validator").Schema}
 */

module.exports = {
    id: {
        in: ["params"],
        isInt: {
        errorMessage: "ID deve essere un numero intero",
    },
    },
    title: {
        in: ["body"],
        notEmpty: true,
    },
    image: {
        in: ["body"],
        notEmpty: true
    },
    content: {
        in: ["body"],
        notEmpty: true
    },
    published: {
        in: ["body"],
        isBoolean: true,
        errorMessage: "il campo published deve essere un valore booleano 'true'/'false' o '0'/'1'"

    }
}

/* 
body("title").notEmpty(),
body("image").notEmpty(),
body("content").notEmpty(),
body("published").isBoolean(),
 */