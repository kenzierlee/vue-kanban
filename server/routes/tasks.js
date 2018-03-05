var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');
var Lists = require('../models/list');
var Tasks = require('../models/task')


//Create a Tasks
router.post('/tasks', (req, res, next) => {
  req.body.userId = req.session.uid
  Tasks.create(req.body)
    .then(Tasks => {
      if (!Tasks) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(Tasks)
    })
    .catch(next)
})

//Edit a Task
router.put('/tasks/:taskId', (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
    .then(Tasks => {
      return res.send({
        message: 'Sucessfully updated the Tasks',
        data: Tasks
      })
    })
    .catch(next)
})

//Delete a Task
router.delete('/tasks/:taskId', (req, res, next) => {
  req.body.userId = req.session.uid
  Tasks.findByIdAndRemove(req.params.taskId)
    .then(Tasks => {
      return res.send({
        message: 'Sucessfully deleted a Tasks'
      })
    })
    .catch(next)
})

//Get Users tasks
router.get('/:id/tasks', (req, res, next) => {
  Tasks.find({ userId: req.params.id })
    .then(Tasks => {
      return res.send(Tasks)
    })
    .catch(next)
})

//Get tasks by lists
router.get('/lists/:listId/tasks', (req, res, next) => {
  Tasks.find({ listId: req.params.id })
    .then(Tasks => {
      return res.send(Tasks)
    })
    .catch(next)
})



module.exports = { router };