const dbConnection = require("../database/db_connection");
const joinGroup = require ("./joinGroup")
// Assuming the verification if this user exists or not is done elsewhere for now
module.exports = (name,description,course,creatorId,cb) => {
dbConnection.query(
  'insert into groups  (name,description,course,participants,creator_id) values ($1,$2,$3,0,$4) RETURNING id',[name,description,course,creatorId],
  (err,res) =>{
    if(err) return cb(err);
    joinGroup(res.rows[0].id,creatorId,cb);
  });
}
