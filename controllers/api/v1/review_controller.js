const Employee = require('../../../models/employeeSchema');
const Review = require('../../../models/review_Schema');


module.exports.createReview =async function(req, res){
    try{
        let user = Employee.findById(req.user.id);
        if(user){
            let newReview = await Review.create({
                comment : req.body.comment,
                createdBy: req.user._id,
                createdFor : req.body.createdFor,
            });
            let createdByEmployee = await Employee.findById(req.user._id);
            createdByEmployee.completedReviews.push(newReview._id);
            createdByEmployee.save();

            let createdForEmployee = await Employee.findById(req.body.createdFor);
            createdForEmployee.myReviews.push(newReview._id);
            createdForEmployee.save();

            return res.status(200).json({
                message:"Review created successfully"
            });
        }
        else{
            return res.status(401).json({
                message:"Review creation failed"
            });
        }
    }catch(err){
        return res.status(500).json({
            message:"Review creation failed"
        });
    } 
}

module.exports.viewReviews =async function(req, res){
    try{
        let allReviews = await Review.find({}).populate('createdBy','name').populate('createdFor','name');
        return res.status(200).json({
            message:"Data fetched succesfully",
            data: allReviews
        });
    }catch(err){
        return res.status(500).json({
            message:"Unable to fetch data "+err
        });
    }

}

module.exports.deleteReview = async function(req, res){
    try{
        let thisReview =await Review.findById(req.params.id);
        let thisUser = await Employee.findById(req.user._id);
        if(thisReview.createdBy == req.user.id || thisUser.isAdmin == true){
            await Employee.findByIdAndUpdate(thisReview.createdBy, { $pull : {completedReviews : thisReview._id}});
            await Employee.findByIdAndUpdate(thisReview.createdFor, { $pull : {myReviews : thisReview._id}});
            await thisReview.remove();
            return res.status(200).json({
                message: "Review removed successfully"
            });        
        }
        else{
            return res.status(403).json({
                message: "Unauthorized / Invalid requester"
            });
        }
    }catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports.updateReview = async function(req, res){
    try{
        let thisReview = await Review.findById(req.params.id);
        console.log(req.body);
        console.log(thisReview);
        if(thisReview){
            await thisReview.update({comment: req.body.comment});
            await thisReview.save();
            return res.status(200).json({
                message: " Review updated successfully"
            });
        }
        else{
            return res.status(404).json({
                message: "No such review found"
            })
        }

    }catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

