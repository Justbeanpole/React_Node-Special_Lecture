var express = require('express');
var router = express.Router();

const users = [
  {id: 'ksh', name: '김성훈'},
  {id: 'lsh', name: '이성훈'},
  {id: 'psh', name: '박성훈'},
]

/* 유저 상세정보 찾기 */
router.get('/:userId', function(req, res, next) {
  const { userId } = req.params;  
  const findId = users.findIndex(user => user.id === (userId))
  res.send(users[findId]);
});

/* 유저 전체정보 찾기 */
router.get('/', function(req, res, next) {
  res.send(users);
});



module.exports = router;
