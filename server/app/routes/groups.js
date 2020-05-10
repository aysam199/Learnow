const router = require('express').Router();
const addGroup = require('../../queries/addGroup');
const joinGroup = require('../../queries/joinGroup');
const getCourseGroups = require('../../queries/getCourseGroups');

router.post('/add', (req, res) => {

  const { name, description, course, creatorId } = req.body;
  addGroup(name, description, course, creatorId, (err, result) => {
    if (err) res.send(500, `Failed to create group, error : ${err}`);
    else res.send(201, `${result.rows} is added`);
  });
});

router.post('/join', (req, res) => {
  const { groupId, userId } = req.body;
  joinGroup(groupId, userId, (err, result) => {
    if (err) res.send(500, `Failed to join group, error : ${err}`);
    else res.send(201, `${result.rows} is added`);

  });
});

router.get('/get/courseid=:courseId', (req, res) => {
  const { courseId } = req.params;
  getCourseGroups(courseId, (err, result) => {
    if (err) res.send(500, `Failed to get groups: ${err}`);
    else res.json(200, result.rows);
  });
});



module.exports = router;
