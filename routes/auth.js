import express from 'express';

import login from "../controllers/login";
import logout from "../controllers/logout";

import passport from "passport";

const router = express.Router();

const secret = "cats-park-101";

export default class Auth {
    constructor(){

        const router = express.Router();
        router.post("/", login, (req,res,next)=>{
            res.send('Ok');
        });
        router.get("/logout", logout);

        router.get("/google", passport.authenticate('google', { scope: ['profile'] }));

        router.get('/google/callback',
            passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            }
        );

        return router;        
    }

}