const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register
router.post('/register', async function (req, res, next)
{
  try
  {
    const body = req.body
    console.log(body)
    req.pool.getConnection(function (err, connection)
    {
      if (err)
      {
        res.sendStatus(500)
        return console.log(err.message)
      }
      const query_line = 'select * from user where username = ?'
      connection.query(query_line, [body.username, body.email], function (err, rows, fields)
      {
        connection.release()

        if (err)
        {
          res.sendStatus(500)
          return console.log(err.message)
        }

        if (rows.length === 0)
        {
          let username = req.body.username
          let firstname = req.body.first_name
          let lastname = req.body.last_name
          let password = req.body.password

          const query_line = 'insert into user(first_name,last_name,username,password) value (?,?,?,?)'
          connection.query(query_line, [firstname, lastname, username, password, email], function (err, rows, fields)
          {
            if (rows.affectedRows !== 1)
            {
              return res.send({
                status: 0,
                message: "Register failed!",
              })
            }
            return res.send({
              status: 1,
              message: "Register successful!",
            })
          })
        } else
        {
          res.send({
            status: 0,
            message: "username or email is existed!",
          })
        }
      })
    })
  } catch (error)
  {
    res.send({
      message: error,
    })
  }
})

// login with username
router.post('/login', async function (req, res, next)
{
  try
  {
    const body = req.body
    console.log(body)
    req.pool.getConnection(function (err, connection)
    {
      if (err)
      {
        res.sendStatus(500)
        return console.log(err.message)
      }

      const check = 'select * from user where username = ?'

      connection.query(check, body.username, function (err, result)
      {
        connection.release()
        console.log(result)

        if (err)
        {
          res.sendStatus(500)
          return console.log(err.message)
        }

        if (result.length === 0)
        {
          console.log('login failed')
          return res.send({
            status: 0,
            message: "username does not exist!",
          })
        } else
        {
          if (body.username === result[0].username && body.password === result[0].password)
          {
            // session
            // console.log(req)
            req.session.user = result[0]

            res.send({
              status: 1,
              message: "login successful"
            })
          } else
          {
            console.log('login failed')
            return res.send({
              status: 0,
              message: "password wrong",
            })
          }
        }
      })
    })
  } catch (error)
  {
    res.send({
      message: error,
    })
  }
})

router.get('/logout',function (req,res)
{
  req.session.destroy(function ()
  {
    console.log('session end')
    res.send({status: 1, message: "Logout succeeded"})
  })
})

module.exports = router;
