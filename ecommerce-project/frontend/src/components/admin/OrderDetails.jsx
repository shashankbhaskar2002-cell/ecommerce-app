import {
    useEffect,
    useState
}
from "react";

import generateInvoice from "../../utils/generateInvoice";
import API from "../../api/axios";



function OrderDetails({orderId}){


const [order,setOrder]=useState(null);
const [status,setStatus] = useState("");

const [paymentStatus,setPaymentStatus] = useState("");


useEffect(()=>{

    fetchOrder();

},[orderId]);

const fetchOrder=async()=>{

    try{


        const {data}=await API.get(

            `/orders/${orderId}`

        );


        setOrder(data.order);
setStatus(
    data.order.orderStatus

    
);


setPaymentStatus(
    data.order.paymentStatus
);

    }
    catch(error){

        console.log(error);

    }


};



if(!order){

    return <h2>Loading...</h2>;

}




const updateStatus = async()=>{

    try{

        await API.put(

            `/orders/${orderId}/status`,

            {
                orderStatus:status
            }

        );


        alert(
            "Order Status Updated"
        );


        fetchOrder();


    }
    catch(error){

        console.log(error);

        alert(
            "Update Failed"
        );

    }

};



const updatePayment = async()=>{

    try{

        await API.put(

            `/orders/${orderId}/payment`,

            {
                paymentStatus
            }

        );


        alert(
            "Payment Updated"
        );


        fetchOrder();


    }
  catch(error){

    console.log(error.response);

    alert(
        error.response?.data?.message || "Payment Update Failed"
    );

}
};



return(

<div>


<h1 className="text-3xl font-bold mb-6">

Order Details

</h1>



<div className="bg-white shadow rounded p-5">


<h2 className="text-xl font-bold mb-4">

Order Status

</h2>



<p className="mb-3">

Current Status:

{order.orderStatus}

</p>




<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="border p-2 rounded w-full"

>


<option value="Pending">

Pending

</option>


<option value="Processing">

Processing

</option>


<option value="Shipped">

Shipped

</option>


<option value="Out For Delivery">

Out For Delivery

</option>



<option value="Delivered">

Delivered

</option>


<option value="Cancelled">

Cancelled

</option>


</select>

<div className="mt-5">


<label className="block mb-2 font-semibold">

Payment Status

</label>


<select

value={paymentStatus}

onChange={(e)=>setPaymentStatus(e.target.value)}

className="border p-2 rounded w-full"

>


<option value="Pending">

Pending

</option>


<option value="Paid">

Paid

</option>


<option value="Refunded">

Refunded

</option>


</select>


</div>


<button

onClick={updateStatus}

className="bg-black text-white px-5 py-2 rounded mt-4"

>

Update Status

</button>

<button

onClick={updatePayment}

className="bg-green-600 text-white px-5 py-2 rounded mt-4 ml-3"

>

Update Payment

</button>


<button

onClick={()=>generateInvoice(order)}

className="bg-blue-600 text-white px-5 py-2 rounded mt-4 ml-3"

>

Download Invoice

</button>

<button

onClick={()=>window.print()}

className="bg-gray-700 text-white px-5 py-2 rounded mt-4 ml-3"

>

Print Invoice

</button>


</div>

<div className="bg-white shadow rounded p-5 mt-5">


<h2 className="text-xl font-bold mb-4">

Payment Details

</h2>


<p>

Method :

{order.paymentMethod}

</p>


<p>

Transaction ID :

{order.transactionId}

</p>


<p>

Payment Status :

{order.paymentStatus}

</p>


</div>

</div>

);


}


export default OrderDetails;