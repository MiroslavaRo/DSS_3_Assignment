const validateEmailRegex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
const validatePhoneRegex = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/'
const maxAvatarSizeBytes = 5120;

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: false,
        trim: true
    },
    url: {
        type: String,
        required: false,
        trim: true
    },
    birtdate: {
        type: Date,
        required: false,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: false,
            trim: true
        },
        postcode: {
            type: String,
            required: false,
            trim: true
        },
        city: {
            type: String,
            required: false,
            trim: true
        },
        country: {
            type: String,
            required: false,
            trim: true
        }
    },
    phones: [{
        type: String,
        required: false,
        trim: true,
        validate: (value) => {
           // return validatePhoneRegex.test(value)
            return true
        }
    }],
    emails: [{
        type: String,
        required: false,
        trim: true,
        validate: (value) => {
            //return validateEmailRegex.test(value)
            return true
        }
    }],
    avatar: {
        type: Buffer,
        required: false,
        validate: (value) => {
            return value.length <= maxAvatarSizeBytes
        }

    }

}, {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true },
    id: false

})

module.exports = mongoose.model('Contact', schema);
