const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const env = require('../Utils/env');

 
passport.serializeUser((done, user) =>{
    done(null, user);
});

passport.deserializeUser((done, user) =>{
    done(null, user)
});

passport.use(new GoogleStrategy(
    {
        clientID: `${env.client_id}`,
        clientSecret: `${env.client_secret}`,
        callbackURL: `${env.googlecallbackurl}`,
        passReqToCallback: true,

    },
    function(request, accessToken, refreshToken, profile, done){
        return done(null, profile);

    }
))