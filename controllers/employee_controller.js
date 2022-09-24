const Employee = require('../models/employeeSchema');
const Review = require('../models/review_Schema');
module.exports.getAll =async function(req, res){
    let user = await Employee.findById(req.user);
    if(user){
        let allEmployees = await Employee.find({_id:{$ne : req.user}},'name email');
        return res.status(200).json({
            allEmployees :allEmployees,
            message:"Fetched data successfully"
        })
    }
    else{
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }
}

module.exports.getMyReviews =async function(req, res){
    let employee =await Employee.findById(req.params.id).populate({
        path:'myReviews',
        populate:[
            {
                path:'createdBy'
            }
        ]
    });
    if(employee){
        return res.status(200).json({
            message: 'Ok',
            data:{
                name : employee.name,
                reviews :employee.myReviews
            }
        })
    }
    else{
        return res.status(404).json({
            message:"No reviews found"
        })
    }
}

module.exports.createNew =async function(req, res){
    try{
        await Employee.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
    }catch(err){
        console.log(err);
    }
    return res.redirect('back');
}

module.exports.deleteEmployee =async function(req, res){
    let employee =await Employee.findById(req.params.id);
    await Employee.findByIdAndDelete(req.params.id);
    await Review.deleteMany({createdBy:req.params.id});
    return res.status(200).json({
        message:"Deleted employee successfully"
    })
}


module.exports.updateEmployee =async function(req, res){
    await Employee.findByIdAndUpdate(req.params.id,{email:req.body.email, name: req.body.name});
    return res.status(200).json({
        message:"Updated employee Successfully"
    })
}



