const User = require('../database/models/contact')
const mongoose = require('mongoose');
const UpdateKeys = ['firstName', "lastName", "company", "address", "phones", "emails"];

module.exports.list = (req, res) => {

    try {
        if (req.query.firstName !== undefined) {
            var results = dataset
                .filter(item => item.firstName === req.query.firstName);
            res.status(200).send(results);
            return;
        }
        res.status(200).send(dataset);
    }
    catch (error) {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()

        });

    }

}

module.exports.create = async ({ body }, res) => {
    try {
        var user = new User({
            userId: new mongoose.Types.ObjectId(),
            ...body
        });
        await user.save();
        res.status(200).send(user);
    }
    catch (error) {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }

}

module.exports.update = async ({ body, params }, res) => {
    try {
        
        const validKeys = Object.keys(body).every(key => {
            return UpdateKeys.includes(key);
        })
        if (!validKeys) {
            throw new Error("Invalid update parameters");

        }

        let user = await User.findOne({ _id: params.id });
        if (!user) {
            throw new Error("Could not find user with this id " + params.id);
        }

        Object.keys(body).forEach(key => {
            user[key] = body[key];
        });

        await user.save();
        res.status(200).send(user);
    }
    catch (error) {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }

}