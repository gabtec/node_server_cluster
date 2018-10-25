const db = require('./users.data');

module.exports = {
  getUser,
  getAllUsers,
};

/**
 * Full route GET /user/:id
 */
function getUser(req, res) {
  return res.status(200).json({
    user: db[req.params.id]
  });
}

function getAllUsers(req, res) {
  return res.status(200).json({
    users: db
  });
}
