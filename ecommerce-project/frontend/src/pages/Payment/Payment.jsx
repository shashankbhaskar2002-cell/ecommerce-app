import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../api/axios";


function Payment() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(false);



    // =========================
    // GET ORDER DETAILS
    // =========================

    useEffect(() => {

        getOrder();

    }, []);



    const getOrder = async () => {

        try {


            const { data } = await API.get(

                `/orders/${id}`

            );


            setOrder(data.order);


        }

        catch (error) {


            console.log(

                error.response?.data

            );


        }


    };






    // =========================
    // LOAD RAZORPAY SCRIPT
    // =========================


    const loadScript = () => {


        return new Promise((resolve) => {


            const script = document.createElement(
                "script"
            );


            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";



            script.onload = () => {

                resolve(true);

            };



            script.onerror = () => {

                resolve(false);

            };



            document.body.appendChild(script);


        });


    };








    // =========================
    // CREATE PAYMENT ORDER
    // =========================


    const createPayment = async () => {


        try {


            setLoading(true);



            const { data } = await API.post(

                "/payment/create-order",

                {

                    orderId: id

                }

            );



            openRazorpay(data);



        }


        catch (error) {


            console.log(

                error.response?.data

            );


            alert(

                "Payment Order Creation Failed"

            );


        }


        finally {


            setLoading(false);


        }


    };










    // =========================
    // OPEN RAZORPAY POPUP
    // =========================


    const openRazorpay = async (data) => {


        const loaded = await loadScript();



        if (!loaded) {


            alert(

                "Razorpay SDK Failed"

            );


            return;


        }

        console.log(import.meta.env.VITE_RAZORPAY_KEY);



        const options = {


            key:

                import.meta.env.VITE_RAZORPAY_KEY,



            amount:

                data.razorpayOrder.amount,



            currency:

                "INR",



            name:

                "Shashank Store",



            description:

                "Order Payment",



            order_id:

                data.razorpayOrder.id,



            handler:

                function (response) {


                    verifyPayment(response);


                }


        };





        const razorpay =

            new window.Razorpay(options);



        razorpay.open();



    };









    // =========================
    // VERIFY PAYMENT
    // =========================


    const verifyPayment = async (response) => {


        try {


            await API.post(

                "/payment/verify",

                {

                    razorpay_order_id:

                        response.razorpay_order_id,


                    razorpay_payment_id:

                        response.razorpay_payment_id,


                    razorpay_signature:

                        response.razorpay_signature


                }

            );



            navigate(

                "/payment-success"

            );


        }


        catch (error) {


            console.log(error);


            navigate(

                "/payment-failed"

            );


        }


    };









    return (


        <div className="p-10">


            <h1 className="text-3xl font-bold">

                Payment Page

            </h1>




            {

                order &&

                <div className="mt-5">


                    <p>

                        Order ID : {order._id}

                    </p>



                    <p>

                        Amount : ₹{order.totalAmount}

                    </p>


                </div>

            }





            <button


                onClick={createPayment}


                disabled={loading}


                className="bg-blue-600 text-white px-5 py-3 rounded mt-5"


            >



                {

                    loading

                        ?

                        "Loading..."

                        :

                        "Pay Now"

                }



            </button>



        </div>


    );



}


export default Payment;