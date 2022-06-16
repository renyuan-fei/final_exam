let app = new Vue({
    el: '#main',
    data:
        {
            time: 0,
            seating_section: "DEFAULT",
            seat_list: [
                {date: '2022-6-10', seat_ID: 1, price: 100, seating_section: 'Privilege Seat'}]
        },
    methods:
        {
            check()
            {
                let that = this;

                MY_AJAX({
                    type: 'POST',
                    url: '/get_seat',
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    success: function (response)
                    {
                        that.seat_list = response
                    },
                    error: function (response)
                    {
                        console.log('get seat list failed')
                    }
                })
            }
        },
})