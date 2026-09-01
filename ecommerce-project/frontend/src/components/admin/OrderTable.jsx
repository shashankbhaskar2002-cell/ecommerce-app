import {
    useEffect,
    useState
} from "react";

import exportOrders from "../../utils/exportOrders";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";


function OrderTable(){


    const [orders,setOrders] = useState([]);
    const [date,setDate] = useState("");
    const navigate = useNavigate();

useEffect(()=>{

    fetchOrders();

},[date]);

  const fetchOrders = async()=>{

    try{

        let url="/orders/admin/all";

        if(date){

            url=`/orders/admin/all?date=${date}`;

        }


        const {data}=await API.get(url);


        console.log(data);


        setOrders(data.orders);


    }
    catch(error){

        console.log(error);

    }

};


   return(

<div>

<h1 className="text-3xl font-bold mb-6">
Orders
</h1>
<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

className="border p-2 rounded mb-5"

/>
<button

onClick={()=>exportOrders(orders)}

className="bg-green-600 text-white px-4 py-2 rounded mb-5"

>

Export CSV

</button>
<table className="w-full border">

<thead>

<tr>

<th className="border p-3">
Order ID
</th>


<th className="border p-3">
Customer
</th>


<th className="border p-3">
Amount
</th>


<th className="border p-3">
Payment
</th>


<th className="border p-3">
Status
</th>
<th className="border p-3">
Action
</th>

</tr>

</thead>



<tbody>


{

orders.map(order=>(


<tr key={order._id}>


<td className="border p-3">

{order._id.slice(-6)}

</td>



<td className="border p-3">

{order.user?.name}

</td>



<td className="border p-3">

₹{order.totalAmount}

</td>



<td className="border p-3">

{order.paymentStatus}

</td>



<td className="border p-3">

{order.orderStatus}

</td>

<td className="border p-3">

<button

onClick={()=>navigate(`/admin/orders/${order._id}`)}

className="bg-blue-600 text-white px-4 py-2 rounded"

>

View

</button>

</td>
</tr>


))


}


</tbody>


</table>


</div>

);


}


export default OrderTable;