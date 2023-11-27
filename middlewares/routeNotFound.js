module.exports = function (req, res, next){
    
    next(new Error(res.status(500).send("route not found")));
}