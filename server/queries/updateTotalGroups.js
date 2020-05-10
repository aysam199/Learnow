const dbConnection = require('../database/db_connection');
module.exports = (userId, cb) => {
  dbConnection.query(
    `UPDATE users
    SET total_groups = total_groups + 1
    WHERE
       id = $1;`,
    [userId],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    },
  );
};