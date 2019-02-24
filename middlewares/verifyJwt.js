import jwt from 'jsonwebtoken';
const secret = "cats-park-101";

function verifyJwt (req, res, next){
    try {
        const verified = jwt.verify(req.body.token, secret);
        next();
    }
    catch (e){
        res.status(500).send(e);
    }
}
export default verifyJwt;