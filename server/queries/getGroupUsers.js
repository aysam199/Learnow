const dbConnection = require('../database/db_connection');

module.exports = (groupId, cb) => {
  dbConnection.query(
    `
    SELECT user_id,user_name,picture,total_groups FROM group_users
    INNER JOIN users ON users.id = group_users.user_id
    WHERE group_id= $1
    `,
    [groupId],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    },
  );
};
