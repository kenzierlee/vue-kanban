var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');
var Lists = require('../models/list');


//Create a Lists
router.post('/lists', (req, res, next) => {
  req.body.userId = req.session.uid
  Lists.create(req.body)
    .then(lists => {
      if (!lists) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(lists)
    })
    .catch(next)
})

//Edit a List
router.put('/lists/:listId', (req, res, next) => {
  Lists.findByIdAndUpdate(req.params.listId, req.body)
    .then(lists => {
      return res.send({
        message: 'Sucessfully updated the Lists',
        data: lists
      })
    })
    .catch(next)
})

//Delete a List
router.delete('/lists/:listId', (req, res, next) => {
  Lists.findById(req.params.listId)
    .then(list => {
      if(req.session.uid != list.userId){
        return
      }
      list.remove()
      return res.send({
        message: 'Successfully deleted a List'
      })
    })
    .catch(next)
})

// //Get Users lists
// router.get('/:id/lists', (req, res, next) => {
//   Lists.find({ userId: req.params.id })
//     .then(lists => {
//       return res.send(lists)
//     })
//     .catch(next)
// })

//Get lists by Board
router.get('/boards/:boardId/lists', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
    .then(lists => {
      return res.send(lists)
    })
    .catch(next)
})



module.exports = { router };