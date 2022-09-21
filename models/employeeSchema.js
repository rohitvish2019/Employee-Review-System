const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },

    isAdmin:{
        type: Boolean,
        default : false
    },

    completedReviews :[{
        review : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    }],

    pendingReviews :[{
        employee :{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Employee'
        }
    }],

    myReviews :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
},
{
    timestamps: true
});


let Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;