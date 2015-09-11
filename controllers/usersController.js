var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Hunt = require('../models/hunt');
var Task = require('../models/task');
var CompletedTask = require('../models/completedTask');

router.get('/', function(req, res){
  User.find(function(error, users){
    if (error) return res.status(404).json({message: 'There are no users in the database.'});
    return res.status(200).send(users);
  });
});

// USER CURRENT TASKS

// router.post('/tasks', function(req, res){
//   Hunt.findById(req.body.hunt_id)
//   .populate('tasks')
//   .exec(function(error, hunt){
//     var result = { completed: [], open: [] };
//     console.log(hunt);
//     return res.status(200).send(hunt);
//   });
// });

router.post('/tasks', function(req, res){
  Hunt.findById(req.body.hunt_id)
  .populate('tasks')
  .exec(populateCompleted);
  function populateCompleted(error, hunt){
    Hunt.populate(hunt, {
      path: 'tasks.completedTasks',
      model: 'CompletedTask'
    },function(error, hunt){

      var result = { completed: [], open: [] };

      hunt.tasks.forEach(function(task){
        var completedTasks = task.completedTasks;
        completedTasks.forEach(function(completedTask){
          console.log("completedTasks.userId= " + completedTask.userId + " req.body.user_id= "+req.body.user_id );
          if(completedTask.userId == req.body.user_id){
            result.completed.push(task);
          } else {
            result.open.push(task);
          }
        });
      });
      return res.status(200).send(result);
    });
  };
});


router.post('/', function(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: "User failed to create."})
      return res.status(200).send(user);
  });
});

router.get('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: 'The user does not exist.'})
      return res.status(200).send(user);
  });
});

router.post('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    if (error) return res.status(404).send({message: 'The user does not exist.'})

      if (req.body.full_name) user.full_name = req.body.full_name;
    if (req.body.email) user.email         = req.body.email;

    user.save(function(error) {
      if (error) return res.status(500).send({message: "There seems to be some error in updating your user."})
        return res.status(200).send(user);
    });
  });
});

router.delete('/:id', function(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'You seem to be mistaken, we have no user with that identity.'})
      res.status(204);
  });
  return;
});

module.exports = router