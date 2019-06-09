import { Router } from 'express'
import _ from 'lodash'

import todos from '../todos/todos';

const router = Router()

function validate(condition, message) {
  return (req, res, next) => {
    if (!condition(req, res)) {
      res.status(400).json({ status: 'error', message })
    } else {
      next();
    }
  }
}

const validateTodoBody = validate(req => _.isString(req.body.description), 'La descripción es requerida como string');

function findTodo(id, res, ifFound) {
  todos.get(id)
    .then(ifFound)
    .catch(() => res.status(404).json({ status: 'not-found' }))
}

router.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

router.get('/todos', async (req, res) => {
  res.json(await todos.getAll())
})

router.get('/todos/:id', (req, res) => {
  findTodo(req.params.id, res, todo => res.json(todo))
})

router.post('/todos', [
  validateTodoBody,
  async (req, res) => res.json(await todos.add(req.body))
])

router.put('/todos/:id', [
  validateTodoBody,
  (req, res) => findTodo(req.params.id, res, 
    async () => res.json(await todos.update(req.params.id, req.body)))
])

router.delete('/todos', async (req, res) => {
  await todos.clear();
  res.json(await todos.getAll());
})

router.delete('/todos/:id', async (req, res) => {
  findTodo(req.params.id, res, async (_) => {
    await todos.delete(req.params.id);
    res.status(204).send();
  })
})

export default router
