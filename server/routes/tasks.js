var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');
var Lists = require('../models/list');
var Tasks = require('../models/task')


//Create a Tasks
router.post('/tasks', (req, res, next) => {
  req.body.userId = req.session.uid
  Tasks.create(req.body)
    .then(tasks => {
      if (!tasks) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(tasks)
    })
    .catch(next)
})

//Edit a Task
router.put('/tasks/:taskId', (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.taskId, req.body)
    .then(tasks => {
      return res.send({
        message: 'Sucessfully updated the Tasks',
        data: tasks
      })
    })
    .catch(next)
})

//Delete a Task
router.delete('/tasks/:taskId', (req, res, next) => {
  req.body.userId = req.session.uid
  Tasks.findByIdAndRemove(req.params.taskId)
    .then(tasks => {
      return res.send({
        message: 'Sucessfully deleted a Tasks'
      })
    })
    .catch(next)
})

//Get Users tasks
router.get('/:id/tasks', (req, res, next) => {
  Tasks.find({ userId: req.params.id })
    .then(tasks => {
      return res.send(tasks)
    })
    .catch(next)
})

router.get('/boards/:boardId/tasks', (req,res,next)=>{
  Tasks.find({boardId: req.params.boardId}).then(tasks =>{
    return res.send(tasks)
  })
  .catch(next)
})

//Get tasks by lists
router.get('/lists/:listId/tasks', (req, res, next) => {
  Tasks.find({ listId: req.params.listId })
    .then(tasks => {
      return res.send(tasks)
    })
    .catch(next)
})



module.exports = { router };