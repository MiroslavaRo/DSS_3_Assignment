const Contact = require('../database/models/contact')
const mongoose = require('mongoose');
const UpdateKeys = ['firstName', "lastName", "company", "address", "phones", "emails"];

module.exports.list = async ({ query: filter}, res) => {

    try {
       // console.log(filter);
        const users = await Contact.find(filter);
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

        let contact = await Contact.findById(id);
        if (!contact) {
            throw new Error("Could not find contact with this id " + params.id);
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
module.exports.create = async ({ body }, res) => {
    try {
        var contact = new Contact({
            userId: new mongoose.Types.ObjectId(),
            ...body
        });
        await contact.save();
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

module.exports.update = async ({ body, params }, res) => {
    try {
        
        const validKeys = Object.keys(body).every(key => {
            return UpdateKeys.includes(key);
        })
        if (!validKeys) {
            throw new Error("Invalid update parameters");

        }

        let contact = await Contact.findOne({ _id: params.id });
        if (!contact) {
            throw new Error("Could not find contact with this id " + params.id);
        }

        Object.keys(body).forEach(key => {
            contact[key] = body[key];
        });

        await contact.save();
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

module.exports.delete = async ({ params }, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: params.id }, { returnDocument:true });
        if (!contact) {
            throw new Error("Could not find contact with this id " + params.id);
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