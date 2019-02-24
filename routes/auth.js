import express from 'express';

import login from "../controllers/login";
import logout from "../controllers/logout";

const router = express.Router();

const secret = "cats-park-101";

export default class Auth {
    constructor(){

        const router = express.Router();
        router.post("/", login, (req,res,next)=>{
            res.send('Ok');
        });
        router.get("/logout", logout);

        return router;        
    }

}