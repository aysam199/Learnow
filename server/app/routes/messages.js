const router = require('express').Router();
const addMessage = require('../../queries/addMessage');
const getMessages = require('../../queries/getGroupMessages');

router.post('/add', (req, res) => {
  const { userId, groupId, userName, message } = req.body;
  addMessage(userId, groupId, userName, message, (err, result) => {
    if (err) res.send(500, `Failed to add message, error : ${err}`);
    else res.send(201, `${result.rows} is added`);
  });
});

router.get('/get/:groupId', (req, res) => {
  const { groupId } = req.params;
  getMessages(groupId, (err, result) => {
    if (err) res.send(500, `Failed to get messages, error : ${err}`);
    else res.json(200, result.rows);
  });
});

module.exports = router;
