const User = require('../database/models/user');
const Contact = require('../database/models/contact')
const mongoose = require('mongoose');
const UpdateKeys = ['username', "password", "name"];

module.exports.list = async ({ query: filter }, res) => {

    try {
        // console.log(filter);
        const users = await User.find(filter);
        res.status(200).send(users);
    }
    catch (error) {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()

        });

    }

}
module.exports.details = async ({ params: { id } }, res) => {
    try {

        let user = await User.findById(id).populate('contacts');
        if (!user) {
            throw new Error("Could not find user with this id " + params.id);
        }
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
module.exports.create = async ({ body }, res) => {
    try {
        var user = new User({
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

module.exports.delete = async ({ query: filter, user }, res) => {
    try {
        filter.owner = user._id;
        const contacts = await Contact.find(filter);
        for (var i = 0; i < contacts.length; i++) {
            let cont_id = contacts[i]._id.toString();
            console.log(cont_id);
            try {
                const contact = await Contact.findOneAndDelete({
                    _id: cont_id
                }, {
                    returnDocument: true
                });

                if (!contact) {
                    throw new Error(`Could not find contact with id ${cont_id}`);
                }

                res.status(200).send(contact);
            }
            catch (error) {
                console.log(error.message);

                res.status(400).send({
                    error: error.message,
                    date: new Date()
                })
            }

        }
        
          const db = await User.findOneAndDelete({ _id: user._id }, { returnDocument: true });
          if (!db) {
             throw new Error("Could not find user with id " + user._id);
          }

       // res.status(200).send(contacts);

        res.status(200).send(db);
    }
    catch (error) {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }
}


module.exports.login = async ({ body }, res) => {
    try {
        const user = await User.findByCredentials(body.username, body.password);
        const token = await user.generateToken();

        res.status(200).send(token);
    }
    catch (error) {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }

}