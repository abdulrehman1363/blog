const jwt = require('jsonwebtoken');


const isAuthenticated = (req,res,next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).send({ message: 'No authorization header, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    if(!token) {
        res.status(401).send({message: 'No token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send({message: 'Invalid token, authorization denied'})
    }

}

module.exports = isAuthenticated