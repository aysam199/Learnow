const dbConnection = require('../database/db_connection');

module.exports = (courseId, cb) => {
  dbConnection.query(
    `SELECT groups.id,groups.name,groups.description,
    groups.course AS course_id,groups.participants,
    groups.creator_id,users.user_name AS creator_name,
    groups.updated_at
     FROM groups 
        INNER JOIN users ON groups.creator_id = users.id
          WHERE course=$1`,
    [courseId],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    },
  );
};
