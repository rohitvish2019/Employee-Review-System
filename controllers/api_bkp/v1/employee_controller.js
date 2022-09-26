const Employee = require('../../../models/employeeSchema');

module.exports.addNewEmployee = async function(req, res){
    console.log(req.body);
    try{
        let emp = await Employee.findByIdAndUpdate(req.body.userid,{name: req.body.fullname,password : req.body.password});
        if(req.xhr){
            return res.status(200).json({
                message: "New employee created successfully"
            });
        }
        else{
            return res.redirect('back');
        }
        
    }catch(err){
        console.log("Error creating new employee "+err);
        return res.status(500).json({
            message: "Unable to create new employee"+err
        })
    }
    
}

module.exports.getEmployees = async function(req, res){
    try{
        let allEmployees = await Employee.find({},'name email');
        return res.status(200).json({
            message: "Fetched data successfully",
            employeees : allEmployees
        })
    }catch(err){
        console.log("Error fetching data from DB "+err);
        return res.status(500).json({
            message:"Unable to fetch data"
        })
    }
}

module.exports.updateEmployee = async function (req, res){
    let requester = await Employee.findById(req.user._id);
    console.log(requester);
    if(!requester){
        return res.status(401).json({
            message:"You are not autorized to make this action"
        });
    }
    try{
        let thisEmployee = await Employee.findById(req.params.id);
        if(requester._id == req.params.id || requester.isAdmin == true){
            await Employee.findByIdAndUpdate(req.params.id, {
                name:req.body.fullname,
                email : req.body.email,
            });
            return res.status(200).json({
                message:"Details for "+thisEmployee.name+" update succssfully"
            });
        }
        else{
            return res.status(401).json({
                message:"You are not autorized to make this action"
            });
        } 

    }catch(err){
        console.log("Error completeing request "+err);
        return res.status(500).json({
            message:"Unable to update data"
        })
    }
}


module.exports.makeAdmin = async function(req, res){
    let requester = await Employee.findById(req.user._id);
    console.log(requester);
    if(!requester || requester.isAdmin == false){
        return res.status(401).json({
            message:"You are not autorized to make this action"
        });
    }
    try{
        let newAdmin = await Employee.findByIdAndUpdate(req.params.id, {isAdmin:true});
        return res.status(200).json({
            message: newAdmin.name+" is an admin now"
        });
    }catch(err){
        console.log("Error making employee as admin "+err)
        return res.status(500).json({
            message : "Error making employee as admin " +err
        })
    }

}

module.exports.removeAdmin = async function(req, res){
    let requester = await Employee.findById(req.user._id);
    console.log(requester);
    if(!requester || requester.isAdmin == false){
        return res.status(401).json({
            message:"You are not autorized to make this action"
        });
    }
    try{
        let newAdmin = await Employee.findByIdAndUpdate(req.params.id, {isAdmin:false});
        return res.status(200).json({
            message: newAdmin.name+" is not an admin now"
        });
    }catch(err){
        console.log("Error removing admin "+err)
        return res.status(500).json({
            message : "Error removing admin " +err
        })
    }
}

module.exports.removeEmployee = async function(req, res){
    let requester = await Employee.findById(req.user._id);
    console.log(requester);
    if(!requester || requester.isAdmin == false){
        return res.status(401).json({
            message:"You are not autorized to make this action"
        });
    }
    try{
        await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Employee removed from orgnization"
        })
    }catch(err){
        console.log("Error removing employee, "+ err);
        return res.status(200).json({
            message: "Error removing employee, "+ err
        })
    }

}

module.exports.myprofile = async function(req, res){

    try{
        let me = await Employee.findById(req.user._id,'name email isAdmin completedReviews pendingReviews');
        if(me){
            return res.status(200).json({
                message: "Data retrived successfully",
                details : me
            });
        }
        else{       
            return res.status(404).json({
                message: "no details found",
            });
        }
        
    }catch(err){
        console.log("error reteriving data "+err);
        return res.status(500).json({
            message: "error reteriving data "+err
        });
    }
}

module.exports.getEmployeeReviewed = function(req, res){

}

