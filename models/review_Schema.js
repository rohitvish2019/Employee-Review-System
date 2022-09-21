const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },

    createdFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    }
},
{
    timestamps:true
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;