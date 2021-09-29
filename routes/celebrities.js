const express = require('express');
const Celebrity = require('../models/celebrity');
const celebrityRouter = express.Router();

celebrityRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebrityRouter.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndDelete(id).then(() => {
    res.redirect('/celebrities').catch((error) => {
      next(error);
    });
  });
});

celebrityRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebrityRouter.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
    //.save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(() => {
      res.render('celebrities/create');
    });
});

module.exports = celebrityRouter;
