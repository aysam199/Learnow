const router = require('express').Router();
const addUser = require('../../queries/addUser');
const getGroupUsers = require('../../queries/getGroupUsers');

router.post('/add', (req, res) => {
  const { id, username, picture } = req.body;
  addUser(id, username, picture, (err, result) => {
    if (err) res.send(500, `Failed to add user, error : ${err}`);
    else res.send(201, `${username} is added`);
  });
});

router.get('/get/groupid=:groupId', (req, res) => {
  const { groupId } = req.params;
  getGroupUsers(groupId, (err, result) => {
    if (err) res.send(500, `Failed to get users: ${err}`);
    else res.json(200, result.rows);
  });
});

module.exports = router;
