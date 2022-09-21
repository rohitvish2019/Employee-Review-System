const Employee = require('../../../models/employeeSchema');
const jwt = require('jsonwebtoken');

module.exports.createSession =async function(req, res){
    try{
        let user = await Employee.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid username or password"
            });
        }

        return res.status(200).json({
            message:"Sign in was successful, Please use the safe token for next 2 mins",
            data:{
                token: jwt.sign(user.toJSON(), 'thisEmployee', {expiresIn:120000})
            }
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}