const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminData = require('./admin');
const {
  runInNewContext
} = require('vm');

const router = express.Router();

router.get('/shop', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    path: '/shop',
    pageTitle: 'Shop',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
//exports.routes = router;