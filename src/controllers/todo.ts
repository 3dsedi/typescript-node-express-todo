import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const Todos: Todo[] = [
  {id: '123', text: 'finish typescript course'},
  {id: '124', text: 'finish typescript + node.js course'},
  {id: '125', text: 'finish typescript + node.js + express course'},
  {id: '126', text: 'push to girhub'}
];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Date.now().toString(), text);

  Todos.push(newTodo);
  res.status(201).json({message: 'new todo created' , createTodo:newTodo})
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({todos:Todos})
};

export const updateTodos: RequestHandler<{id: string}> = (req , res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = Todos.findIndex(todo=> todo.id === todoId);
  if (todoIndex === -1){
    throw new Error ('todo not found')
  }
  Todos[todoIndex] = new Todo(Todos[todoIndex].id, updatedText);

  res.status(200).json({message: 'todo updated' , updateTodos: Todos[todoIndex]})
};

export const deleteTodos: RequestHandler<{id: string}> = (req , res, next) => {
  const todoId = req.params.id;

  const todoIndex = Todos.findIndex(todo=> todo.id === todoId);
  if (todoIndex === -1){
    throw new Error ('todo not found')
  }
  Todos.splice(todoIndex, 1)

  res.status(202).json({message: 'todo deleted'})
}
