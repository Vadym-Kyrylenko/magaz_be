const mogoose = require('mongoose');
const model = require('../app_server/models/users');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
        usernameField: 'email'
  },
  function(username, password, done) {

      model.User.findOne({email: username}, function (err, user) {

          if(err) {return done(err);}
      if(!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)){
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
  ));
