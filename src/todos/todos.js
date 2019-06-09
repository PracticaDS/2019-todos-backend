/* eslint-disable no-underscore-dangle */
import _ from 'lodash'
import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
})

const Todo = mongoose.model('Todo', schema)

const todos = {
  getAll: () => Todo.find({}),
  add: async ({ description, done = false }) => {
    const newTodo = new Todo({ description, done });
    await newTodo.save()
    return newTodo;
  },
  get: id => Todo.findById(id),
  update: async (id, body) => {
    const todo = await todos.get(id);
    if (_.isBoolean(body.done)) todo.done = body.done;
    if (_.isString(body.description)) todo.description = body.description;
    await todo.save()
    return todo
  },
  clear: () => Todo.remove({}),
  delete: id => Todo.remove({ _id: id })
}

export default todos
