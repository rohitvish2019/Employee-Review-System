let Email = require('../models/verify');
let Employee = require('../models/employeeSchema');
let mailer = require('../mailers/comment_mailer');
const otpGenerator = require('otp-generator');

// Reders the login page if not logged in otherwise redirects to home.
module.exports.login = function(req, res){
    try{
        if(req.isAuthenticated()){
            req.flash('success', 'Logged in successfully');
            return res.redirect('/home');
            
        }
        else{
            req.flash('error', "Invalid Username or Password");
            req.flash('success', "Welcome");
            return res.render('login',{title:"Login", message:req.flash('error')});
            
        }
    }catch(err){
        console.log(err);
        req.flash('error', 'Unknown error, Please try again');
        return res.redirect('back');
    }
}


//Redirect user to home page

module.exports.createSession = function(req, res){
    try{
        req.flash('success', 'Logged in successfully');
        res.redirect('/home');
    }catch(err){
        return res.redirect('back');
    }
}

//Logout the user and removes the req.user

module.exports.logout = function(req, res){
    try{
        req.logout(function(err){
            if(err){
                console.log("failed Logging out");
                return res.redirect('/home');
            }
            req.flash('success', 'Logged out successfully')
            return res.redirect('/login');
        });
    }catch(err){
        console.log(err);
        return res.redirect('back')
    }
    
}

//Verify if email already exists, otherwise sent otp.

module.exports.emailVerify = async function(req, res){
    try{
        let employee =await Employee.findOne({email : req.body.email});
        if(employee){
            return res.status(400).json({
                message: "Email already registerd"
            })
        }
        else{
            let user;
            let otp = otpGenerator.generate(6,{upperCaseAlphabets:false, lowerCaseAlphabets: false, specialChars:false})
            user = await Email.findOne({email:req.body.email});
            if(user){
                console.log("user found")
                await Email.findOneAndUpdate({email:req.body.email},{$set : {otp:otp}});
                user.update({otp:otp});
                user.save();
            }
            else{
                console.log("user not found")
                user = await Email.create({
                    email: req.body.email,
                    otp:otp
                });
            }
            
            mailer.newUser(user, otp);
            return res.status(200).json({
                message:"OTP sent successfully",
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

// Verify if the otp is correct

module.exports.verifyOTP = async function(req, res){
    try{
        let unverified = await Email.findOne({email:req.body.email});
        if(unverified && unverified.otp == req.body.otp){
            let pass = 'autoGen'+ otpGenerator.generate(15);
            let newEmployee = await Employee.create({
                email:req.body.email,
                password: pass
            });
            unverified.remove();
            return res.status(200).json({
                message: "Verified",
                id : newEmployee._id
            });
        }
        else{
            return res.status(400).json({
                message : "Bad input/ Invalid OTP"
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}