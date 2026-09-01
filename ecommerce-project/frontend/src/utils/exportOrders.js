const exportOrders = (orders)=>{


    const headers = [
        "Order ID",
        "Customer",
        "Amount",
        "Payment Status",
        "Order Status"
    ];


    const rows = orders.map(order=>[

        order._id,

        order.user?.name || "N/A",

        order.totalAmount,

        order.paymentStatus,

        order.orderStatus

    ]);



    const csv = [

        headers,

        ...rows

    ]

    .map(row=>row.join(","))

    .join("\n");



    const blob = new Blob(

        [csv],

        {
            type:"text/csv"
        }

    );



    const url = window.URL.createObjectURL(blob);



    const link = document.createElement("a");


    link.href=url;


    link.download="orders.csv";


    link.click();



    window.URL.revokeObjectURL(url);


};


export default exportOrders;