import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const generateInvoice=(order)=>{


const doc = new jsPDF();



doc.setFontSize(20);

doc.text(
"INVOICE",
20,
20
);



doc.setFontSize(12);


doc.text(

`Order ID : ${order._id}`,

20,

35

);


doc.text(

`Customer : ${order.user?.name}`,

20,

45

);



doc.text(

`Email : ${order.user?.email}`,

20,

55

);




autoTable(doc,{

startY:70,


head:[

[
"Product",
"Qty",
"Price"
]

],


body:

order.orderItems.map(item=>[

item.product?.name,

item.quantity,

`₹${item.price}`

])


});



doc.text(

`Total Amount : ₹${order.totalAmount}`,

20,

150

);



doc.save(

`invoice-${order._id}.pdf`

);



};



export default generateInvoice;