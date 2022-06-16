const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/get_seat', function(req, res)
{
  try
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

      let query_line = "select seat_detail.date,\n" +
          "       seat.seat_ID,\n" +
          "       seat.price,\n" +
          "       seat.seating_section\n" +
          "from seat_detail,\n" +
          "     seat\n" +
          "where seat_detail.seat_ID = seat.seat_ID\n" +
          "  and seat_detail.order_ID not in (select order_ID from reservation_list)\n" +
          "order by seat_detail.date,seat.seat_ID;"

      let params = []

      if (body.date !== "" && body.seating_section === "DEFAULT")
      {
        query_line = "select seat_detail.date,\n" +
            "       seat.seat_ID,\n" +
            "       seat.price,\n" +
            "       seat.seating_section\n" +
            "from seat_detail,\n" +
            "     seat\n" +
            "where seat_detail.seat_ID = seat.seat_ID\n" +
            "  and seat_detail.order_ID not in (select order_ID from reservation_list)\n" +
            "  and seat_detail.date = ?\n" +
            "order by seat_detail.date, seat.seat_ID;"
        params = [body.date]
      }
      else if (body.date === "" && body.seating_section !== "DEFAULT")
      {
        query_line = "select seat_detail.date,\n" +
            "       seat.seat_ID,\n" +
            "       seat.price,\n" +
            "       seat.seating_section\n" +
            "from seat_detail,\n" +
            "     seat\n" +
            "where seat_detail.seat_ID = seat.seat_ID\n" +
            "  and seat_detail.order_ID not in (select order_ID from reservation_list)\n" +
            "  and seat.seating_section = ?\n" +
            "order by seat_detail.date, seat.seat_ID;"
        params = [body.seating_section]
      }
      else if (body.date !== "" && body.seating_section !== "DEFAULT")
      {
        query_line = "select seat_detail.date,\n" +
            "       seat.seat_ID,\n" +
            "       seat.price,\n" +
            "       seat.seating_section\n" +
            "from seat_detail,\n" +
            "     seat\n" +
            "where seat_detail.seat_ID = seat.seat_ID\n" +
            "  and seat_detail.order_ID not in (select order_ID from reservation_list)\n" +
            "  and seat_detail.date = ?\n" +
            "  and seat.seating_section = ?\n" +
            "order by seat_detail.date, seat.seat_ID;"
        params = [body.date,body.seating_section]
      }

      connection.query(query_line,params,function (err,result)
      {
        console.log(result)
        if (err)
        {
          res.send(err)
          return console.log(err)
        }

        res.send(result)
      })
    })
  }
  catch (err)
  {
    res.send(err)
    return console.error(err)
  }
})

module.exports = router;
