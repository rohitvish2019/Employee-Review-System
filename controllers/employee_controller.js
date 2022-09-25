const Employee = require('../models/employeeSchema');
const Review = require('../models/review_Schema');
module.exports.getAll =async function(req, res){
    try{
        let user = await Employee.findById(req.user);
        if(user && user.isAdmin == true){
            let allEmployees = await Employee.find({_id:{$ne : req.user}},'name email');
            return res.status(200).json({
                allEmployees :allEmployees,
                message:"Fetched data successfully"
            })
        }else{
        return res.status(401).json({
            message:"UnAuthorized"
        });
        }
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        });
    }
    
}

module.exports.getMyReviews =async function(req, res){
    try{
        let user = await Employee.findById(req.user);
        if(user && (user.isAdmin == true || req.user == req.params.id)){
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
                    message:"Employee id not found to get reviews"
                })
            }
        }
        
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
    
}

module.exports.createNew =async function(req, res){
    let user = await Employee.findById(req.user);
    try{
        if(user && user.isAdmin == true){
            await Employee.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });
        }else{
            console.log("Unauthorized request");
        }
        
    }catch(err){
        console.log(err);
    }
    return res.redirect('back');
}

module.exports.deleteEmployee =async function(req, res){
    try{
        let user =await Employee.findById(req.user);
        if(user && user.isAdmin == true){
            let employee =await Employee.findById(req.params.id);
            await Employee.findByIdAndDelete(req.params.id);
            await Review.deleteMany({createdBy:req.params.id});
            return res.status(200).json({
                message:"Deleted employee successfully"
            })
        }
        else{
            return res.status(403).json({
                message:"You are not authorized to make this action"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Error deleting employee "+err
        });
    }
    
    
}


module.exports.updateEmployee =async function(req, res){
    try{
        let user =await Employee.findById(req.user);
        if(user && (user.isAdmin == true || req.user == req.params.id)){
            await Employee.findByIdAndUpdate(req.params.id,{email:req.body.email, name: req.body.name});
            return res.status(200).json({
                message:"Updated employee Successfully"
            })
        }
        else{
            return res.status(401).json({
                message:"You are not authorized to make this action"
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:" Internal server error"
        })
    }
}


module.exports.assignReviewer =async function(req, res){
    let user =await Employee.findById(req.user);
    if(user && user.isAdmin == true){
        let toBeReviwed =await Employee.findOne({email:req.body.toBeReviewd});
        let reviewer = await Employee.findOne({email : req.body.Reviewer});
        let count=0;
        if(toBeReviwed && reviewer){
            for(let i=0;i<reviewer.pendingReviews.length;i++){
                if(reviewer.pendingReviews[i].toString() == toBeReviwed._id.toString()){
                    break;
                }
                else{
                    count++;
                }
            }
            if(count == reviewer.pendingReviews.length){
                reviewer.pendingReviews.push(toBeReviwed._id);
                reviewer.save();
            }
        }
    }else{
        console.log("Unauthorized request");
    }
    return res.redirect('back');
}



