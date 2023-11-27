const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { body, checkSchema } = require("express-validator");

const postCreate = require("../validations/postCreate");

router.get('/', postsController.index);

router.get('/:id', postsController.show);

router.post('/',

body("title").notEmpty(),
body("image").notEmpty(),
body("content").notEmpty(),
body("published").isBoolean(),

postsController.store);

router.put('/:id', checkSchema(postCreate), postsController.update);

router.delete('/:id', postsController.destroy);

module.exports = router;

/*   data:{
            "title": newPost.title,  
            "image": newPost.image,  
            "content": newPost.content,
            "published": newPost.published,
            "categoryId": newPost.category,
            "tags": {
                connect: newPost.tags.map((tagId) => ({ id: tagId }))
            }
        } */