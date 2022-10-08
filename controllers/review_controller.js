let Review = require('../models/review_Schema');
let Employee = require('../models/employeeSchema');

// Creates new review in DB

module.exports.createReview = async function(req, res){
    try{
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
            await Employee.findByIdAndUpdate(req.user, {$pull :{pendingReviews : req.body.createdFor}})
            return res.status(200).json({
                message:"review create successfully"
            });

        }
        else{
            return res.status(404).json({
                message:'Employee not found'
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


// Deletes a review

module.exports.deleteReview =async function(req, res){
    try{
        let user = await Employee.findById(req.user);
        let review =await Review.findById(req.params.id);
        if(review && (review.createdBy == req.user || user.isAdmin == true)){
            await Employee.findByIdAndUpdate(review.createdBy, {$pull : {completedReviews:review._id}});
            await Employee.findByIdAndUpdate(review.createdFor, {$pull : {myReviews : review._id}});
            review.remove();
            return res.status(200).json({
                message:"Deleted review successfully"
            });
        }
        else{
            return res.status(401).json({
                message:"Unable to delete review"
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Error deleting review "+err
        })
    }
    
}