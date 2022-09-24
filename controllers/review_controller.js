let Review = require('../models/review_Schema');
let Employee = require('../models/employeeSchema');
module.exports.createReview = async function(req, res){
    try{
        console.log(req.body.createdFor);
        let employee =await Employee.findById(req.body.createdFor);
        if(employee){
            let review = await Review.create({
                comment: req.body.comment,
                createdBy : req.user,
                createdFor : req.body.createdFor
            });
            employee.myReviews.push(review._id);
            employee.save();
            let doneBy = await Employee.findById(req.user);
            doneBy.completedReviews.push(review._id);
            doneBy.save();
            return res.status(200).json({
                message:"review create successfully"
            });

        }
        else{
            return res.status(500).json({
                
                message:'internal server error'
            })
        }
    }catch(err){
        console.log(err);
    }
}

module.exports.deleteReview =async function(req, res){
    let review =await Review.findById(req.params.id);
    if(review){
        await Employee.findByIdAndUpdate(review.createdBy, {$pull : {completedReviews:review._id}});
        await Employee.findByIdAndUpdate(review.createdFor, {$pull : {myReviews : review._id}});
        review.remove();
        return res.status(200).json({
            message:"Deleted review successfully"
        });
    }
    else{
        return res.status(500).json({
            message:"No review found"
        })
    }
}