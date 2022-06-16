let app = new Vue({
    el: '#main',
    data:
        {
            date: "",
            seating_section: "DEFAULT",
            seat_list: [
                {date: '2022-6-10', seat_ID: 1, price: 100, seating_section: 'Privilege Seat'}]
        },
    methods:
        {
            check()
            {
                let that = this;

                console.log(that.date,that.seating_section)

                MY_AJAX({
                    type: 'post',
                    url: '/get_seat',
                    header:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            date:that.date,
                            seating_section:that.seating_section
                        },
                    success: function (response)
                    {
                        that.seat_list = response
                    },
                    error: function ()
                    {
                        console.log('get seat list failed')
                    }
                })
            }
        },
})