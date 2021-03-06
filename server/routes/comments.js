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
    .then(comments => {
      if (!comments) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(comments)
    })
    .catch(next)
})

//Edit a Comment
router.put('/comments/:commentId', (req, res, next) => {
  Comments.findByIdAndUpdate(req.params.commentId, req.body)
    .then(comments => {
      return res.send({
        message: 'Sucessfully updated the Comments',
        data: comments
      })
    })
    .catch(next)
})

//Delete a Comment
router.delete('/comments/:commentId', (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      if(comment.userId.toString() !== req.session.uid.toString()){
        return res.send('invalid user')
      }
      comment.remove()
      return res.send({
        message: 'Sucessfully deleted a Comment'
      })
    })
    .catch(next)
})

// //Get Users comments
// router.get('/:id/comments', (req, res, next) => {
//   Comments.find({ userId: req.params.id })
//     .then(comments => {
//       return res.send(comments)
//     })
//     .catch(next)
// })

//Get comments by tasks
router.get('/tasks/:taskId/comments', (req, res, next) => {
  Comments.find({ taskId: req.params.taskId })
    .then(comments => {
      return res.send(comments)
    })
    .catch(next)
})

module.exports = { router };