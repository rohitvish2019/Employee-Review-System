let Email = require('../models/verify');
let Employee = require('../models/employeeSchema');

module.exports.login = function(req, res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home');
        }
        else{
            res.render('login',{title:"Login"});
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.createSession = function(req, res){
    try{
        if(req.isAuthenticated()){
            res.redirect('/home');
        }else{
            res.render('login',{title:"Login"});
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.logout = function(req, res){
    try{
        req.logout(function(err){
            if(err){
                console.log("failed Logging out");
                return res.redirect('/home');
            }
            return res.redirect('/login');
        });
    }catch(err){
        console.log(err);
        return res.redirect('back')
    }
    
}


module.exports.emailVerify = async function(req, res){
    try{
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
            return res.status(200).json({
                message:"success",
                email : req.body.email
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Error verifying email"
        })
    }
}

module.exports.verifyOTP = async function(req, res){
    try{
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
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}