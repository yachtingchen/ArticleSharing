const Work = require('gstore-node').model('Work');
const Category = require('gstore-node').model('Category');

const express = require('express');
const router = new express.Router();

router.get('/categories', (req, res, next) => {
  Category.query().run().then((data) => {
    return res.json(data[0].entities);
  }).catch((err) => {
    next(err);
  });
});

router.get('/category/:id', (req, res, next) => {
  Category.get(req.params.id).then((result) => {
    return res.json(result[0].plain());
  }).catch((err) => {
    next(err);
  });
});

router.get('/works', (req, res, next) => {

  // let query = Work.query();

  // if (req.query.sortBy) {
  //   if (req.query.isDesc) {
  //     query = query.order(req.query.sortBy, { descending: true });
  //   } else {
  //     query = query.order(req.query.sortBy);
  //   }
  // }

  // if ()    

  Work.query()
  .filter('isVisible', true)
  .filter('showInFrontPage', true)
  //.order('title', { descending: true })
  .run().then((data) => {
    return res.json(data[0].entities);
  }).catch((err) => {
    next(err);
  });
});

router.get('/work/:id', (req, res, next) => {
  Work.get(req.params.id).then((result) => {
    return res.json(result[0].plain());
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;