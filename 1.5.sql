select user.username,
       seat_information.date,
       seat.seat_ID,
       seat.price,
       seat.seating_section
from reservation_system,
     user,
     seat_information,
     seat
where user.user_ID = reservation_system.user_ID
and reservation_system.order_ID = seat_information.order_ID
and seat_information.seat_ID = seat.seat_ID
and seat_information.date = '2022-06-20';