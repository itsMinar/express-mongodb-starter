const router = require('express').Router();

const todoRouter = require('./todo.routes.js');

// Todo Route
router.use('/todos', todoRouter);

module.exports = router;
