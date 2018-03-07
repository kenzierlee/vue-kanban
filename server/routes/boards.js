var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');


//Create a Board
router.post('/boards/', (req, res, next) => {
  req.body.userId = req.session.uid
  Board.create(req.body)
    .then(board => {
      if (!board) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(board)
    })
    .catch(next)
})

//Edit a Board
router.put('/:userId/boards/:boardId', (req, res, next) => {
  Board.findByIdAndUpdate(req.params.boardId, req.body)
    .then(board => {
      return res.send(board)
    })
    .catch(next)
})

//Delete a board
router.delete('/:userId/boards/:boardId', (req, res, next) => {
  Board.findByIdAndRemove({userId: req.params.userId, _id: req.params.boardId})
    .then(board => {
      return res.send({
        message: 'Sucessfully deleted a Board'
      })
    })
    .catch(next)
})

//Get Users Boards
router.get('/:id/boards', (req, res, next) => {
  Board.find({ userId: req.params.id })
    .then(board => {
      return res.send(board)
    })
    .catch(next)
})



module.exports = { router };