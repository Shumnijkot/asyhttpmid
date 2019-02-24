import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import bodyParser from "body-parser";

import products from "./routes/products.js";
import users from "./routes/users.js";
import Auth from "./routes/auth";

import Users from "./models/Users";

import verifyJwt from "./middlewares/verifyJwt"

const app = express();
app.use(session({
    secret: "cats-park-101",
    cookie: { someCookie: "one" },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  }, function(username, password,done){
        const users = Users;
        const user = users.find(item=>username === item.login);
    
        console.log('User  here');
        if(!user) { 
            return done("User not found");
        }
        return password === user.password
            ? done(null, user)
            : done(null, false, { message: 'Incorrect password.' });
    }
));
  
passport.serializeUser(function(user, done) {
    done(null, user.login);
  });
  
  
passport.deserializeUser(function(login, done) {
    const user = Users.find(user=>user.login===login);
    if(!user) {
        return done("User not found");
    }
    return done(null,user);
});

const setParsedCookie = ()=>{
    return (req, res, next)=>{
        req.parsedCookie = req.cookies;
        next();
    }
}

const setParsedQuery = ()=>{
    return (req, res, next)=>{
        req.parsedQuery = req.query;
        next();
    }
}

const authRoutes = new Auth();

app.use(setParsedCookie());
app.use(setParsedQuery());

app.get("/", (req,res,next)=>{
    if(req.user){
        res.send(`Hello ${req.user.login}`);
        return;
    }
    res.send("Hello");
})

app.get("/api", (req, res, next) =>{
    res.send("Not implemented");
});
app.use("/api/products", verifyJwt, products);
app.use("/api/users", verifyJwt, users);
app.use("/auth", authRoutes);

export default app;