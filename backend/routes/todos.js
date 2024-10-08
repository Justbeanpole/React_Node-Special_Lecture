var express = require('express');
var router = express.Router();
const { getConnection } = require('../db')


let todos = [
  {id: 1, title: '할일1', status:"WAIT"},
  {id: 2, title: '할일2', status:"WAIT"},
  {id: 3, title: '할일3', status:"WAIT"},
]

/* 할일 전체정보 찾기 */
router.get('/', async function(req, res, next) {
  try{
    const conn = await getConnection()
    const query = "SELECT * FROM todolist"
    const result = await conn.query(query)
    res.send({
      status: 200,
      message: "success",
      data: result[0]
    });
  }
  catch(error){
    res.send({
      status: 500,
      message: error.message
    })
  }
});

/* 할일 전체정보 찾기 */
router.get('/:todoId', async function(req, res, next) {
    try{
      const { todoId } = req.params;
      const query = `SELECT * FROM todolist WHERE id = ?`
      const parameters = [Number(todoId)]
      const conn = await getConnection()
      const [data, _fields] = await conn.query(query, parameters)
      res.send({
        status: 200,
        message: "Success",
        data: data[0]
      })
    }
    catch(error){
      res.send({
        status: 500,
        message: error.message
      })
    }
});

/* 상태 변경 라우터 */
router.put('/:todoId', function(req, res, next){
    const {status} = req.body;
    const {todoId} = req.params;

    const findId = todos.findIndex(todo => todo.id === Number(todoId))
    todos = [
        ...todos.slice(0,findId),
        {
            ...todos[findId],
            status: status
        },
        ...todos.slice(findId+1)
    ]
    res.send(todos)
})



module.exports = router;
