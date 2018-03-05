var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');
var Lists = require('../models/list');
var Tasks = require('../models/task')
var Comments = require('../models/comment')


//Create a Comments
router.post('/comments', (req, res, next) => {
  req.body.userId = req.session.uid
  Comments.create(req.body)
    .then(Comments => {
      if (!Comments) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(Comments)
    })
    .catch(next)
})

//Edit a Comment
router.put('/comments/:commentId', (req, res, next) => {
  Comments.findByIdAndUpdate(req.params.commentId, req.body, { new: true })
    .then(Comments => {
      return res.send({
        message: 'Sucessfully updated the Comments',
        data: Comments
      })
    })
    .catch(next)
})

//Delete a Comment
router.delete('/comments/:commentId', (req, res, next) => {
  req.body.userId = req.session.uid
  Comments.findByIdAndRemove(req.params.commentId)
    .then(Comments => {
      return res.send({
        message: 'Sucessfully deleted a Comments'
      })
    })
    .catch(next)
})

//Get Users comments
router.get('/:id/comments', (req, res, next) => {
  Comments.find({ userId: req.params.id })
    .then(Comments => {
      return res.send(Comments)
    })
    .catch(next)
})

//Get comments by tasks
router.get('/tasks/:taskId/comments', (req, res, next) => {
  Comments.find({ listId: req.params.id })
    .then(Comments => {
      return res.send(Comments)
    })
    .catch(next)
})



module.exports = { router };