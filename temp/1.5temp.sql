select user.username,
       seat_detail.date,
       seat.seat_ID,
       seat.price,
       seat.seating_section
from reservation_list,
     user,
     seat_detail,
     seat
where user.user_ID = reservation_list.user_ID
  and reservation_list.order_ID = seat_detail.order_ID
  and seat_detail.seat_ID = seat.seat_ID;


select seat_detail.date,
       seat.seat_ID,
       seat.price,
       seat.seating_section
from seat_detail,
     seat
where seat_detail.seat_ID = seat.seat_ID
  and seat_detail.order_ID not in (select order_ID from reservation_list)
order by seat_detail.date, seat.seat_ID;

select seat_detail.date,
       seat.seat_ID,
       seat.price,
       seat.seating_section
from seat_detail,
     seat
where seat_detail.seat_ID = seat.seat_ID
  and seat_detail.order_ID not in (select order_ID from reservation_list)
  and seat_detail.date = '2022-6-16'
order by seat_detail.date, seat.seat_ID;