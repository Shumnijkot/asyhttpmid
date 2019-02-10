import express from "express";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import products from "./routes/products.js";
import users from "./routes/users.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.use(setParsedCookie());
app.use(setParsedQuery());

app.get("/api", (req, res, next) =>{
    res.send("Not implemented");
});
app.use("/api/products", products);
app.use("/api/users", users);

export default app;