var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
  User.findAll({})
  .then(users => {
    console.log("user: ",users);
    res.render('user', {
      users: users
    })
  })
  .catch(next)
});

router.post('/', function(req, res, next) {
  res.send('got to POST /user/');
});

router.get('/:userId', function(req, res, next) {
  var userID = User.findById(req.params.userId);
  var pages = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  })

  Promise.all([userId, pages])
  .then(values => {
    var user = values[0];
    var pages1 = values[1];
    res.render('userPages', {
      users: user,
      pages: pages1
    })
  })
  .catch(next);
});

module.exports = router;
