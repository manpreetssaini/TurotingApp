const connection = require("../../connection");

module.exports = {
  verifyIdentity: (req, res, next) => {
    if (req.session.user.tutor_id) {
      const identity = req.session.user.tutor_id;
    }
  }
};
