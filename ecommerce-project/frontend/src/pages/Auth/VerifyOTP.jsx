import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../../api/axios";


function VerifyOTP() {


    const navigate = useNavigate();

    const location = useLocation();


    const email = location.state?.email;



    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);




    const handleSubmit = async (e) => {


        e.preventDefault();



        if(!otp){

            alert("Enter OTP");

            return;

        }




        try {


            setLoading(true);



            const { data } = await API.post(

                "/users/verify-otp",

                {

                    email,

                    otp

                }

            );



            alert(data.message);



            navigate("/login");



        }

        catch(error){


            alert(

                error.response?.data?.message ||

                "OTP Verification Failed"

            );


        }

        finally{


            setLoading(false);


        }


    };






    return (



        <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl">



            <h2 className="text-3xl font-bold mb-6 text-center">

                Verify OTP

            </h2>




            <p className="mb-4 text-center">

                OTP sent to:

                <br />

                <b>{email}</b>

            </p>




            <form onSubmit={handleSubmit}>




                <input

                    type="text"

                    placeholder="Enter OTP"

                    value={otp}

                    onChange={(e)=>setOtp(e.target.value)}

                    className="w-full border p-3 rounded-lg mb-6"

                />





                <button

                    type="submit"

                    disabled={loading}

                    className="w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-400"

                >

                    {

                    loading

                    ?

                    "Verifying..."

                    :

                    "Verify OTP"

                    }


                </button>




            </form>


        </div>


    );


}


export default VerifyOTP;