const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

module.exports = async function (str) {
 
    const arrayDb = await prisma.post.findMany().then().catch()
    
    let resultToLawerCase = str.toLowerCase();

    let result = resultToLawerCase
    // faccio diventrare la stringa un array
    .split("")
    // mappo l'array carattere per carattere
    .map((char) => (char === " " ? "-" : char))
    // faccio tornare di nuovo una stringa
    .join('');

    /*
    // createSlug dovrebbe incrementare di 1 lo slug quando esiste già
    const arraySlug = arrayDb.map((items) => items.slug);

    if(arraySlug.includes(result)){ 
        let counter = 1;
        while (arraySlug.includes(`${result}-${counter}` || result)) {
        counter++;
        result = `${result}-${counter}`;
    }}
    */
    return result
}



