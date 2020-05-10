const dbConnection = require('../database/db_connection');
const updateParticipants = require('../queries/updateGroupParticipants');
const updateTotalGroups = require('../queries/updateTotalGroups');

module.exports = (groupId, userId, cb) => {
  dbConnection.query(
    `INSERT INTO group_users(group_id,user_id) VALUES ($1,$2);`,
    [groupId, userId],
    (err, res) => {
      if (err) return cb(err);
      updateParticipants(groupId, (err, res) => {
        if (err) return cb(err);
        updateTotalGroups(userId, (err, res) => {
          if (err) return cb(err);
          cb(null, res);
        });
      });
    },
  );
};
