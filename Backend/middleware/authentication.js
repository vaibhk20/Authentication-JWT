const jwt = require("jsonwebtoken");

const config = process.env;
require('cookie-parser');

const verifyToken = (req, res, next) => {

    const {token}=req.body;
    if (!token) {
        return res.status(403).send({message:"A token is required for authentication"});
    }
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
        req.email = decoded.email;
        if(decoded){
            next();
        }else{
            res.status(400).send({message: "Cant verify token"})
        }
    } catch (err) {
        return res.status(401).send({message:"Invalid Token" });
    }
     
};

module.exports = {verifyToken};
