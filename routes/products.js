import express from 'express';
import md5 from 'js-md5';

var router = express.Router();

const products = [
    {
        id: "193",
        name: "bunny",
        reviews: [
            {title:"good", fullText: "fluffy"},
            {title:"Nice", fullText: "very nice"}
        ]
    },
    {
        id: "194",
        name: "bear",
        reviews: [
            {title:"scary", fullText: "But fluffy"},
            {title:"Awesome", fullText: "very awesome"}
        ]
    },
]

/* GET listing. */
router.get('/', function(req, res, next) {
    res.send(JSON.stringify(products));
});

router.get('/:id', function(req, res, next) {
    const { id } = req.params;
    const needed = products.find(product=>id===product.id);
    if(!needed){
        res.sendStatus(404);
        next();
    }
    res.send(JSON.stringify(needed));
});

router.get('/:id/reviews', function(req, res, next) {
    const { id } = req.params;
    const needed = products.find(product=>id===product.id);
    const { reviews } = needed;
    if(!reviews){
        res.sendStatus(404);
        next();
    }
    res.send(JSON.stringify(reviews));
});

router.post('/', function(req, res, next) {
    if(!req.body){
        res.sendStatus(500);
    }
    const ha = JSON.stringify(products);
    const sh = products.length;
    const id = md5(`${ha}-${sh}`);
    const {name, reviews={}} = req.body;
    
    products.push(
        {
            id,
            name,
            reviews
        }
    );

    res.sendStatus(200);
});

export default router;