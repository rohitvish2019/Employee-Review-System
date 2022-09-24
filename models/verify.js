const mongoose = require('mongoose');
const verifySchema = new mongoose.Schema({
    email :{
        type: String
    },
    otp:{
        type: String
    }
});

const Verify = mongoose.model('Verify', verifySchema);
module.exports = Verify;