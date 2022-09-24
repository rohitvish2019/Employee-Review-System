let Email = require('../models/verify');
let Employee = require('../models/employeeSchema');

// Don't touch
module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    else{
        res.render('login',{title:"Login"});
    }
    
}

//Don't touch
module.exports.createSession = function(req, res){
    res.redirect('/home')
}

// Don't touch 
module.exports.logout = function(req, res){
    req.logout(function(err){
        if(err){
            console.log("failed Logging out");
            return res.redirect('/home');
        }
        console.log("Logged out successfuly")
        return res.redirect('/login');
    });
}


module.exports.emailVerify = async function(req, res){
    console.log(req.body);
    let employee =await Employee.findOne({email : req.body.email});
    if(employee){
        return res.status(400).json({
            message: "Email already registerd"
        })
    }
    else{
        await Email.create({
            email: req.body.email,
            otp: '123456'
        });
        let unverified = await Email.findOne({email:req.body.email});
        console.log(unverified);
        return res.status(200).json({
            message:"success",
            email : req.body.email
        })
    }
    
}

module.exports.verifyOTP = async function(req, res){
    let unverified = await Email.findOne({email:req.body.email});
    if(unverified && unverified.otp == req.body.otp){
        let newEmployee = await Employee.create({
            email:req.body.email,
            password:'123456'
        });
        unverified.remove();
        return res.status(200).json({
            message: " Verified",
            id : newEmployee._id
        });
    }
    else{
        return res.status(400).json({
            message : "Bad input"
        });
    }

}