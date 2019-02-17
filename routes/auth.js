import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMap = {
    "vasia@com.com": {
        login: "vasia@com.com",
        password: "1234",
        userName: "Vasia"
    },
    "masha@com.com": {
        login: "masha@com.com",
        password: "qwerty",
        username: "Marfa"
    }
}

export default class Auth {
    constructor(){

        const router = express.Router();
        this.isLoginValid = this.isLoginValid.bind(this);
        router.post("/", this.postBase.bind(this));

        this.secret = "cats-park-101";
        return router;        
    }

    isLoginValid(provLogin, provPassword){
        const mapedLogin = authMap[provLogin];
   
        return mapedLogin.login === provLogin && mapedLogin.password === provPassword;
    }

    postBase (req,res,next){
        const {login, password} = req.body;
        const usr = authMap[login];
        if(!usr){
            res.status(404).send({message:"Not found"});
        }

        if(!this.isLoginValid(login, password)){
            res.sendStatus(403);
            return next();
        }
        
        const token = jwt.sign({login, password}, this.secret);
        const data = {
            user: {
                email: login,
                username: usr.userName
            },
            token
        }

        res.status(200).send({message: "OK", data });
        next();
    }
}