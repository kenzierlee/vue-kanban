var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');
var Lists = require('../models/list');


//Create a Lists
router.post('/lists', (req, res, next) => {
  req.body.userId = req.session.uid
  Lists.create(req.body)
    .then(Lists => {
      if (!Lists) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(Lists)
    })
    .catch(next)
})

//Edit a List
router.put('/lists/:listId', (req, res, next) => {
  Lists.findByIdAndUpdate(req.params.listId, req.body, { new: true })
    .then(Lists => {
      return res.send({
        message: 'Sucessfully updated the Lists',
        data: Lists
      })
    })
    .catch(next)
})

//Delete a List
router.delete('/lists/:listId', (req, res, next) => {
  Lists.findByIdAndRemove(req.params.listId)
    .then(Lists => {
      return res.send({
        message: 'Sucessfully deleted a Lists'
      })
    })
    .catch(next)
})

//Get Users lists
router.get('/:id/lists', (req, res, next) => {
  Lists.find({ userId: req.params.id })
    .then(Lists => {
      return res.send(Lists)
    })
    .catch(next)
})

//Get lists by Board
router.get('/boards/:boardId/lists', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
    .then(Lists => {
      return res.send(Lists)
    })
    .catch(next)
})



module.exports = { router };