// console.log('express middleware');
const express = require("express");
const server = express();
const PORT = 8080;

server.use(express.json());

const stringsInArray = (arr)=>{
    arr.forEach((e)=>{
        if(typeof e !== "string"){
            return false;
        }
    })
    return true;
}

const validatorMiddleware = (req, res, next)=>{
    let {ID,Name,Rating,Description,Genre,Cast} =  req.body;
    // console.log(data);
    let errorMsg = [];
    if(typeof ID !== 'number'){
        errorMsg.push('ID should be Number');;
    }
    if(typeof Name !== "string"){
        errorMsg.push("Name should be Text");
    }
    if(typeof Rating !== "number"){
        errorMsg.push("Rating should be Number");
    }
    if (typeof Description !== "string") {
        errorMsg.push('Description should be Text');
    }
    if (typeof Genre !== "string") {
        errorMsg.push('Genre should be Text');
    }
    if(!Array.isArray(Cast) || !stringsInArray(Cast)){
        errorMsg.push("Cast should be Array of Strings");
    }

    if (errorMsg.length > 0) {
        return res.status(400).send(`bad request, ${errorMsg.join(" ")}`)
    }
    next();
}

server.post('/',validatorMiddleware ,(req, res)=>{
    res.status(200).send('data received');
})

server.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})