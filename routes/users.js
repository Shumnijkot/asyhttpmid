var express = require('express');
var router = express.Router();

const users = [
    {
        id:1,
        name:"Vania"
    }
];

/* GET listing. */
router.get('/', function(req, res, next) {
    res.send(JSON.stringify(products));
});

export default router;