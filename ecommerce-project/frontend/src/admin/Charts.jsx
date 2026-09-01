import { useEffect, useState } from "react";

import API from "../api/axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";


function Charts(){


const [orderData,setOrderData] = useState([]);

const [categoryData,setCategoryData] = useState([]);



useEffect(()=>{

    fetchAnalytics();

},[]);



const fetchAnalytics = async()=>{

try{


const orderResponse = await API.get(
    "/admin/orders/analytics"
);


const productResponse = await API.get(
    "/admin/products/analytics"
);



setOrderData(

orderResponse.data.analytics.monthlySales.map(item=>({

name:`${item._id.month}/${item._id.year}`,

revenue:item.revenue,

orders:item.totalOrders

}))

);



setCategoryData(

productResponse.data.analytics.categoryAnalytics.map(item=>({

name:item._id,

value:item.totalProducts

}))

);



}

catch(error){

console.log(error);

}


};



const COLORS=[

"#0088FE",
"#00C49F",
"#FFBB28",
"#FF8042"

];



return(

<div className="grid md:grid-cols-2 gap-6 mt-6">


{/* Revenue Chart */}

<div className="bg-white shadow rounded-lg p-5">


<h2 className="text-xl font-bold mb-4">

Monthly Sales

</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={orderData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="revenue"

fill="#2563eb"

/>


</BarChart>


</ResponsiveContainer>



</div>





{/* Category Chart */}


<div className="bg-white shadow rounded-lg p-5">


<h2 className="text-xl font-bold mb-4">

Products Category

</h2>



<ResponsiveContainer width="100%" height={300}>


<PieChart>


<Pie

data={categoryData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

categoryData.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index % COLORS.length]}

/>

))

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>



</div>


);


}


export default Charts;