const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProducts: true
  });
});

router.post('/add-product', (req, res, next) => {
  products.push({
    title: req.body.title,
    image: req.body.image,
    price: req.body.price,
    condition: req.body.condition
  })
  res.redirect('/shop');
})

router.post('/remove-product', (req, res, next) => {
  const remProd = req.body.remProd;
  for (const product of products) {

    // Splice method removes from a const array
    if (remProd === product.title) {
      const index = products.indexOf(product);
      if (index !== -1) {
        products.splice(index, 1);
      }
    }
  }
  res.redirect('/shop');
});

exports.routes = router;
exports.products = products;