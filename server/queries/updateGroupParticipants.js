const dbConnection = require('../database/db_connection');
module.exports = (groupId, cb) => {
  dbConnection.query(
    `UPDATE groups
      SET participants = participants + 1
      WHERE
      id = $1`,
    [groupId],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    },
  );
};
