const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const errorValidation = require('../middlewares/errorsMiddleware')
const { validationResult,  matchedData  } = require("express-validator");
const createSlug = require("../utilities/creatSlug")

async function index(req, res) {

    const filters = req.query.filters;
    const  queryFilter = {}

    if(filters && filters.title){
        queryFilter.title = { contains: filters.title };
    }
    if(filters && filters.published){
        queryFilter.publishedFilter = { equals: filters.published === "true" || filters.published === "1" };
    }
    
    const data = await prisma.post.findMany({
            where: queryFilter
    })
        .then()
        .catch()

    res.json(data)
}

async function show(req, res, next) {

    const { id } = req.params;
    const data = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            tags: {
                select: {
                    "name": true,
                }
            }
        },
    })
    .then()
    .catch()

    if(!data){
        res.status(404).end("Post not Found")
        next(new Error("post not found"))
    } else{
        res.json(data)
    }
    console.log("show");
}

async function store(req, res) {

    const errors = validationResult(req);
    // errorValidation(errors);

    if (!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    
    // il macthedData serve come lista bianca dei soli dati che devo prendere, 
    // che ho dischiarato all'interno delle validazioni delle rotte
    // const postRequire = matchedData

    const newPost = req.body;
    const slug = await createSlug(newPost.title);
    const data = await prisma.post.create({
        data:{
            "title": newPost.title,  
            "slug": JSON.stringify(slug),   
            "image": newPost.image,  
            "content": newPost.content,
            "published": newPost.published,
            "categoryId": newPost.category,
            "tags": {
                connect: newPost.tags.map((tagId) => ({ id: tagId }))
            }
        }
    })
    res.json(data);
    console.log("store");
}

async function update(req, res) {
    const { id } = req.params;
    const newPost = req.body;
    const data = await prisma.post.update({
        where:{
            id: parseInt(id)
        },
        data:{
            "title": newPost.title,  
            "slug": newPost.slug,   
            "image": newPost.image,  
            "content": newPost.content,
            "published": newPost.published,
            "categoryId": newPost.category,
            "tags": {
                set: newPost.tags.map((tagId) => ({ id: tagId }))
            }
        }
    })
    .then()
    .catch(err => console.log(err))
    res.json(data).send(`il post numero ${id} è stato aggiornato con successo`)
    console.log("update");
}

async function destroy(req, res) {
    const { id } = req.params;
    /*
    const data = await prisma.post.delete({
        where:{
            id: parseInt(id)
        },
    })
    .then()
    .catch(err => console.log(err))
    res.json(data).send(`il post numero ${id} è stato rimosso con successo`)
    console.log(`destroy`);
*/

    const data = await prisma.post.update({
        where:{
            id: parseInt(id)
        },
        data:{
            category: {
                disconnect: true
            },
            tags:{
                deleteMany: []
            }
        }
    })
    .then()
    .catch(err => console.log(err))
    res.json(data).send(`il post numero ${id} è stato rimosso con successo`)
    console.log(`destroy`);



}



module.exports = {
    index,
    show,
    store,
    update,
    destroy
}