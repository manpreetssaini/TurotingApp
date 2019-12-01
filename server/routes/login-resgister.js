module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage ') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/studentDashboard',
    failureRedirect: '/login',
    failureFlash: true
  }),
    function (req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  app.get('/register', function (req, res) {
    res.render('register.ejs', { messagee: req.flash('signupMessage') });
  });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/studentDashboard',
    failureRedirect: '/register',
    failureFlash: true
  }));

  app.get('/studentDashboard', isLoggedIn, function (req, res) {
    res.render('studentDashboard.ejs', {
      user: req.user
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  })
};

function isLoggedIn(req, res, next) {
  is(req.isAuthenticated())
  return next();
}