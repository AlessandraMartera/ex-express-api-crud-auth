/**
 * @type {import("express-validator").Schema}
 */

module.exports = {
    username: {
        in: ["body"],
        notEmpty: true,
        // isLength: {
        //     options:{
        //         min: 4,
        //         max: 12
        //     },
        //     errorMessage: "username troppo corto o troppo lungo, deve avere monimo 4 caratteri e un massimo di 12"
        // },
        errorMessage: "insertire username nel formato corretto"
    },
    email: {
        in: ["body"],
        isEmail:{
            errorMessage: "insertire email valida nel formato corretto"
        }
    },
    password: {
        in: ["body"],
        password: {
            in: ["body"],
            isStrongPassword: {
              options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
              },
            },
            errorMessage:
              "La password deve avere i requisiti richiesti",
          },
    }
}

/*
    usdername String   @db.VarChar(32)
    email     String   @unique
    password  String
 */