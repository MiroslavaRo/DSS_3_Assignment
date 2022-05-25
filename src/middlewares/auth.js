const User = require('../database/models/user');

const Authorization = 'Authorization';
const Schema = 'Bearer';

module.exports = async (req, res, next) => {

    try {
        const header = req.header(Authorization);
        if (!header) {
            throw new Error('Authroziation header is missing');
        }

        const token = header.replace(Schema, '').trim();

        const user = await User.findByToken(token);

        req.user = user;
        req.token = token;

        next();
    }
    catch (error) {
        console.log(error.message);

        res.status(401).send({
            error: error.message,
            date: new Date()
        })
    }
}