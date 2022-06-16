select user.username,
       order_details.date,
       seat.seat_ID,
       seat.price,
       seating_section.seating_section_type
from reservation_system,
     user,
     order_details,
     seat,
     seating_section
where user.user_ID = reservation_system.user_ID
and reservation_system.order_ID = order_details.order_ID
and order_details.seat_ID = seat.seat_ID
and seat.seating_section_ID = seating_section.seating_section_ID
and order_details.date = '2022-06-20';