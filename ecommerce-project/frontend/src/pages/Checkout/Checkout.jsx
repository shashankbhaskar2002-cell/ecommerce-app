
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import { useCart } from "../../context/CartContext";


function Checkout() {


    const navigate = useNavigate();

    const { cartItems } = useCart();


    const [loading, setLoading] = useState(false);



    const [shipping, setShipping] = useState({

        fullName: "",

        phone: "",

        address: "",

        city: "",

        state: "",

        postalCode: "",

        country: "India"

    });





    const handleChange = (e) => {


        setShipping({

            ...shipping,

            [e.target.name]: e.target.value

        });


    };





const handleSubmit = async (e) => {

    e.preventDefault();


    if(cartItems.length === 0){

        alert("Your Cart Is Empty");

        return;

    }



    try {


        setLoading(true);



        // STEP 1: CREATE ADDRESS

       

const addressResponse = await API.post(

    "/address/add",

    {
        fullName: shipping.fullName,

        mobile: shipping.phone,

        addressLine: shipping.address,

        city: shipping.city,

        state: shipping.state,

        country: shipping.country,

        pincode: shipping.postalCode
    }

);



        console.log(

            "ADDRESS CREATED:",

            addressResponse.data

        );



        const addressId = 

        addressResponse.data.address._id;



        // STEP 2: PLACE ORDER


        const { data } = await API.post(

            "/orders/place",

            {

                shippingAddress: addressId,

                paymentMethod: "COD"

            }

        );



        console.log(

            "ORDER CREATED:",

            data

        );



        navigate(

            `/payment/${data.order._id}`

        );


    }


    catch(error){


        console.log(

            "ORDER ERROR:",

            error.response?.data

        );


        alert(

            error.response?.data?.message ||

            "Order Failed"

        );


    }


    finally {


        setLoading(false);


    }


};





    return (


        <div className="max-w-3xl mx-auto px-6 py-10">


            <h1 className="text-3xl font-bold mb-8">

                Checkout

            </h1>





            <form

                onSubmit={handleSubmit}

                className="space-y-4"

            >




                <input

                    name="fullName"

                    placeholder="Full Name"

                    value={shipping.fullName}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />




                <input

                    name="phone"

                    placeholder="Phone Number"

                    value={shipping.phone}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />





                <input

                    name="address"

                    placeholder="Address"

                    value={shipping.address}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />





                <input

                    name="city"

                    placeholder="City"

                    value={shipping.city}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />





                <input

                    name="state"

                    placeholder="State"

                    value={shipping.state}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />





                <input

                    name="postalCode"

                    placeholder="Postal Code"

                    value={shipping.postalCode}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />





                <button

                    type="submit"

                    disabled={loading}

                    className="bg-green-600 text-white px-6 py-3 rounded"

                >


                    {

                        loading

                        ?

                        "Placing Order..."

                        :

                        "Place Order"

                    }


                </button>




            </form>



        </div>


    );


}


export default Checkout;

