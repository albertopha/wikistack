var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;


// const router = require('./index');

router.get('/', function(req, res, next) {
  Page.findAll({})
  .then(pages => {
    res.render('index', {
      pages: pages
    })
  })
  .catch(next)
  // res.redirect('/');
});

router.post('/add', function(req, res, next) {
  console.log(req.body);  
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .spread(function(user){
    return Page.create(req.body).then(function(page){
      return page.setAuthor(user);
    });
  })
  .then(function(page){
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

// router.post('/add', function(req, res, next){
//   // STUDENT ASSIGNMENT:
//   // add definitions for `title` and `content`

//   var page = Page.build({
//     title: req.body.title,
//     content: req.body.content,
//     email: req.body.email,
//     status: req.body.status
//   });

//   page.save()
//   .then(page => res.redirect(page.route));
// });

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(foundPage => {
    if (!foundPage) {
      throw new Error("no page found");
    } else {
        res.render('wikipage', {
          page: foundPage
        })
    }
  })
  .catch(next)
  // res.send('dynamic routing: ' + req.params.urlTitle);
})
