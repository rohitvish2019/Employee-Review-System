let Employee = require('../models/employeeSchema');
module.exports.home= async function(req, res){
    let profile = await Employee.findById(req.user,'name email pendingReviews').populate('pendingReviews');
    return res.render('home', {title:'Home', profile:profile});
} 