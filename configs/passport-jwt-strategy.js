const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Employee = require('../models/employeeSchema');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'thisEmployee'
};

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    
    Employee.findById(jwtPayLoad._id, function(err, user){
        if(err){console.log("Error finding user from DB"); return};
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }

    });
}))

module.exports = passport;