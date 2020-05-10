const dbConnection = require('../database/db_connection');

// Assuming the verification if this user exists or not is done elsewhere for now
module.exports = (id, username, picture, cb, totalGroups = 0) => {
  dbConnection.query(
    'INSERT INTO users (id, user_name, picture, total_groups) VALUES ($1,$2,$3,$4)',
    [id, username, picture, totalGroups],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    },
  );
};
