var express = require('express');
var router = express.Router();

/* GET product page. */
router.get('/', function(req, res, next) {
  res.render('product', { title: 'Product Page' });
});

module.exports = router;
