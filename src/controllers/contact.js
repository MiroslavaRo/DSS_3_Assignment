const User = require('../database/models/contact')
const mongoose = require('mongoose');
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
            firstName: 'Sasha',
            lastName: 'Happy',
            company: 'VUM',
            address: {
                street: "Street",
                postcode: "1234",
                city: "Varna",
                country:"Bulgaria"
            },
            phones: ['+012345678912'],
            emails: ['some.mail@smth.com']
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