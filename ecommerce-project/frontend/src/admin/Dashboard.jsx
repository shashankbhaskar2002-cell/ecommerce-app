import { useEffect, useState } from "react";
import API from "../api/axios";
import Charts from "./Charts";

function Dashboard(){


const [widgets,setWidgets] = useState({

recentOrders:[],

latestUsers:[],

lowStockProducts:[]

});



useEffect(()=>{

fetchWidgets();

},[]);



const fetchWidgets = async()=>{

try{


const {data}= await API.get(

"/admin/dashboard/widgets"

);


setWidgets(data.widgets);


}

catch(error){

console.log(error);

}


};



return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">

Admin Dashboard

</h1>



{/* Recent Orders */}

<div className="bg-white shadow rounded-lg p-5 mb-6">


<h2 className="text-xl font-bold mb-4">

Recent Orders

</h2>



{

widgets.recentOrders.map(order=>(


<div 
key={order._id}
className="border-b py-3"
>


<p>

User:
{order.user?.name}

</p>


<p>

Amount:
₹{order.totalAmount}

</p>


<p>

Status:
{order.orderStatus}

</p>


</div>


))

}


</div>




{/* Latest Users */}


<div className="bg-white shadow rounded-lg p-5 mb-6">


<h2 className="text-xl font-bold mb-4">

Latest Users

</h2>



{

widgets.latestUsers.map(user=>(


<div key={user._id}

className="border-b py-2"

>


{user.name}

</div>


))

}


</div>




{/* Low Stock */}


<div className="bg-white shadow rounded-lg p-5">


<h2 className="text-xl font-bold mb-4">

Low Stock Products

</h2>



{

widgets.lowStockProducts.length === 0 ?


<p>
No low stock products
</p>


:

widgets.lowStockProducts.map(product=>(


<div key={product._id}>


{product.name}

-
Stock:

{product.stock}


</div>


))


}



</div>

<Charts />

</div>

);


}


export default Dashboard;