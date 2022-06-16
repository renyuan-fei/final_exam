select seat.seat_ID,
       seat.seating_section,
       seat_detail.drama_title
from reservation_list,
     user,
     seat_detail,
     seat
where user.user_ID = reservation_list.user_ID
  and reservation_list.order_ID = seat_detail.order_ID
  and seat_detail.seat_ID = seat.seat_ID
  and seat_detail.date = '2022-06-20';