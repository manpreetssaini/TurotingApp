"use strict";

function parseUser(req, res, next) {
  if (req.session.user === undefined || req.session.user === null) {
    req.session.user = null;
  } else {
    console.log(`${req.session.user.user_name}\'s session is active`);
  }
  next();
}

module.exports = {
  parseUser
};
