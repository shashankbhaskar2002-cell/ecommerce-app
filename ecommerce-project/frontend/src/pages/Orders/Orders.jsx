import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../../api/axios";


function Orders(){

    const [orders,setOrders] = useState([]);

    const [loading,setLoading] = useState(true);

    const [error,setError] = useState("");



    useEffect(()=>{

        getOrders();

    },[]);



    const getOrders = async()=>{

        try{

            const {data} = await API.get(
                "/orders/my-orders"
            );


            setOrders(data.orders);


        }
        catch(error){

            setError(

                error.response?.data?.message ||
                "Failed To Fetch Orders"

            );

        }
        finally{

            setLoading(false);

        }

    };





    if(loading){

        return(

            <h2 className="text-center py-10">

                Loading Orders...

            </h2>

        );

    }




    if(error){

        return(

            <h2 className="text-red-500 text-center py-10">

                {error}

            </h2>

        );

    }




    if(orders.length===0){

        return(

            <h2 className="text-center py-10 text-2xl">

                No Orders Found

            </h2>

        );

    }




    return(

        <div className="max-w-5xl mx-auto px-6 py-10">


            <h1 className="text-3xl font-bold mb-8">

                My Orders 📦

            </h1>



            {

            orders.map((order)=>(


                <div

                key={order._id}

                className="border rounded-lg p-5 mb-5 shadow"

                >


                    <h2 className="font-bold">

                        Order #{order._id}

                    </h2>


                    <p className="mt-2">

                        Total :
                        ₹{order.totalAmount}

                    </p>



                    <p>

                        Payment :
                        {order.paymentStatus}

                    </p>



                    <p>

                        Status :
                        {order.orderStatus}

                    </p>



                    <Link

                    to={`/orders/${order._id}`}

                    className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"

                    >

                        View Details

                    </Link>



                </div>


            ))

            }


        </div>


    );


}


export default Orders;