
/**
 * Module dependencies.
 */

const express = require('express')
  , routes = require('./routes')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


const app = module.exports = express.createServer();

// Configuration

// Refrence: http://stackoverflow.com/questions/16781294/passport-js-passport-initialize-middleware-not-in-use
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser())
  app.use(express.session({secret: 'jamie', cookie: { maxAge: 60000 }}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Passport

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        const user = {
            id: '1',
            username: 'admin',
            password: '123'
        }; // Can be configured to read through the database login account collections

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {// Save user object
    done(null, user);// Can be operated by means of database
});

passport.deserializeUser(function (user, done) {// Delete user object
    done(null, user);// Can be operated by means of database
});

// Routes

app.get('/', routes.login);
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users');
    });
  })(req, res, next);
});
// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/users',
//         failureRedirect: '/'
//     }));

app.all('/users', isLoggedIn);
app.get('/users', routes.user);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
