const dbConnection = require('../database/db_connection');

module.exports = (groupId, cb) => {
  dbConnection.query(
    `
    SELECT messages.id,messages.user_name,user_id,picture, message, updated_at 
    FROM messages INNER JOIN users
    ON messages.user_id = users.id
    WHERE group_id = $1
    `,
    [groupId],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    },
  );
};
