const dbConnection = require("../database/db_connection");


module.exports = (userId,groupId,userName,message,cb) => {
dbConnection.query(
  'INSERT INTO messages (user_id,group_id,user_name,message) VALUES ($1,$2,$3,$4) RETURNING id',
  [userId,groupId,userName,message],
  (err,res) =>{
    if(err) return cb(err);
    cb(null,res);
  });
}
