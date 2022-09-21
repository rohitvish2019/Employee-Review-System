const passport = require('passport');
const crypto = require('crypto');
const passportGoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Users = require('../models/user');

passport.use(new passportGoogleStrategy({
    clientID:     '621967297781-7jh89i92hd1ucuvfmiuqf226cfvelpsm.apps.googleusercontent.com',
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  async function(request, accessToken, refreshToken, profile, done) {
    let user = await Users.findOne({email:profile.emails[0].value});
    if(user){
        return done(null, user);
    }
    else{
        Users.create({
            name : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString('hex')
        }, function(err){
            if(err){
                console.log("Error creating new user in DB");
                return;
            }
        });
    }
  }
));

module.exports = passport;