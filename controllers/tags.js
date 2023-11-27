const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const createSlug = require("../utilities/creatSlug")

async function index(req, res) {
res.end("index tags")
}

async function store(req, res) {
    const newTag = req.body;

    const data = await prisma.tag.create({
        data: {
            "name": `#${newTag.name}`,
        }
    });

    console.log("store");
    res.json(data);
}

module.exports = {
    index,
    store
}