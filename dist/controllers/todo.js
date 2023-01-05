"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.updateTodos = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const Todos = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Date.now().toString(), text);
    Todos.push(newTodo);
    res.status(201).json({ message: 'new todo created', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: Todos });
};
exports.getTodos = getTodos;
const updateTodos = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = Todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        throw new Error('todo not found');
    }
    Todos[todoIndex] = new todo_1.Todo(Todos[todoIndex].id, updatedText);
    res.status(200).json({ message: 'todo updated', updateTodos: Todos[todoIndex] });
};
exports.updateTodos = updateTodos;
const deleteTodos = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = Todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        throw new Error('todo not found');
    }
    Todos.splice(todoIndex, 1);
    res.status(202).json({ message: 'todo deleted' });
};
exports.deleteTodos = deleteTodos;
