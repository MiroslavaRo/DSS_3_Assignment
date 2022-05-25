const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Contact = require('./contact');

const SECRET_KEY = process.env.SECRET_KEY || "This is super secret key";

const AUDIENCE = "ctl";
const ISSUER = "ctl";
const SUBJECT = "ctl";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
});

schema.virtual('contacts', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'owner'
})

schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

schema.pre('remove', async function (next) {
    console.log(this._id);
    await Contact.deleteMany({ owner: mongoose.Types.ObjectId(this._id) });
    next();
});

schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
}

schema.methods.generateToken = async function () {
    const user = this;

    var token = jwt.sign({
        id: user._id,
        iat: Math.floor(Date.now() / 1000) - 30
    }, SECRET_KEY, {
        expiresIn: 60 * 60,
        audience: AUDIENCE,
        subject: SUBJECT,
        issuer: ISSUER,
        algorithm: 'HS256',
        encoding: 'UTF8'
    });

    return token;
}

schema.statics.findByCredentials = async function (username, password) {
    const user = await this.findOne({ username });

    if (!user) {
        throw new Error("Invalid username/password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid username/password");
    }

    return user;
}

schema.statics.findByToken = async function (token) {
    try {
        jwt.verify(token, SECRET_KEY, {
            audience: AUDIENCE,
            subject: SUBJECT,
            issuer: ISSUER,
            algorithm: 'HS256',
            encoding: 'UTF8'
        });

        const decoded = jwt.decode(token);

        const user = await this.findOne({ _id: decoded.id })

        if (!user) {
            throw new Error("Invalid user. User not found");
        }

        return user;

    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = mongoose.model('User', schema);