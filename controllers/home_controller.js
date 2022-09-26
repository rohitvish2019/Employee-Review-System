let Employee = require('../models/employeeSchema');
const flash = require('connect-flash');
module.exports.home= async function(req, res){
    try{
        let profile = await Employee.findById(req.user,'name email pendingReviews isAdmin').populate('pendingReviews');
        let allEmployees =[]
        if(profile.isAdmin == true){
            allEmployees = await Employee.find({}, 'name email')
        }
        return res.render('home', {title:'Home', profile:profile, allEmployees:allEmployees});
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    
} 