var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  let body = req.body
  res.send(body)

})

module.exports = router;
