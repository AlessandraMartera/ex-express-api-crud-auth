
module.exports = {
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "ID deve essere un numero intero",
        },
        },
    image: {
        in: ["body"],
        notEmpty: true
    },
    content: {
        in: ["body"],
        notEmpty: true
    },
    publushed: {
        in: ["body"],
        isBoolean: true
    }
}

/* 
body("title").notEmpty(),
body("image").notEmpty(),
body("content").notEmpty(),
body("published").isBoolean(),
 */