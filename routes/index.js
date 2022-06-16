const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/get_seat', function(req, res, next)
{
  let body = req.body;
  console.log(body);

  req.pool.getConnection(function (err, connection)
  {
    if (err)
    {
      res.sendStatus(500)
      return console.log(err.message)
    }
    res.send()
  })
})

module.exports = router;
