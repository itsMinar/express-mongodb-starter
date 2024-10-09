const addTodo = require('../controllers/todo/addTodo.controller');
const deleteTodoById = require('../controllers/todo/deleteTodoById.controller');
const getAllTodos = require('../controllers/todo/getAllTodos.controller');
const getTodoById = require('../controllers/todo/getTodoById.controller');
const updateTodoById = require('../controllers/todo/updateTodoById.controller');

const router = require('express').Router();

// add new todo
router.route('/').post(addTodo);
// get all todos
router.route('/').get(getAllTodos);
// get todo by ID
router.route('/:todoId').get(getTodoById);
// update todo by ID
router.route('/:todoId').patch(updateTodoById);
// delete todo by ID
router.route('/:todoId').delete(deleteTodoById);

module.exports = router;
