var express = require('express');
var router = express.Router();

var Hunt = require('../models/hunt');
var Task = require('../models/task');

// INDEX 
router.get('/', function(req, res){
  Hunt.find()
  .populate('tasks')
  .exec(function(error, hunts){
    if(error)return res.status(404).json({message: 'Could not find any hunts'})
      return res.status(200).send(hunts);
  });
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

router.post('/join', function(req, res){
  var id = req.body.user_id
  Hunt.findByIdAndUpdate({_id: req.body.hunt_id}, {$push: {"participants": req.body.user_id}}, function(error){
    if(error) return res.status(403).send({message: 'Could not add participant b/c' + error});
    return res.status(200).send({message: 'Added participant.'});
  });
})

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Hunt.findById(id, function(error, hunt){
    for (var i = 0; i < hunt.tasks.length; i++) {
      Task.remove({_id: hunt.tasks[i]}, function(){});
    }
    Hunt.remove({_id: id}, function(error){
      if (error) res.status(404).send({message: 'No hunt with that ID. Could not delete.'})
        return res.status(204).send({message: 'Deleted!'})
    });
  });
});

module.exports = router