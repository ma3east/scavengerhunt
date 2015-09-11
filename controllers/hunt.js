var express = require('express');
var router = express.Router();

var Hunt = require('../models/hunt');

// INDEX 
router.get('/', function(req, res){
  Hunt.find()
  .populate('tasks')
  .exec(function(error, hunts){
    if(error)return res.status(404).json({message: 'Could not find any hunts'})
    return res.status(200).send(hunts);
  })
});

// SHOW
router.get('/:id', function(req,res){
  var id = req.params.id;
  Hunt.findById({_id: id})
  .populate('tasks')
  .exec(function(error, hunt){
    if(error) return res.status(404).send({message: 'Could not find hunt'})
    return res.status(200).send(hunt);
  });
});

// POST
router.post('/', function(req, res){
  var hunt = new Hunt(req.body);
  hunt.save(function(error){
    if(error) return res.status(403).send({message: 'Could not create hunt b/c' + error});
    return res.status(200).send(hunt);
  });
});

module.exports = router