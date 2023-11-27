const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const createSlug = require("../utilities/creatSlug")

async function index(req, res) {
res.end("index categories")
}

async function store(req, res) {
    const newCategory = req.body;

    const data = await prisma.category.create({
        data: {
            name: newCategory.name,
        }
    });

    console.log("store");
    res.json(data);
}

module.exports = {
    index,
    store
}