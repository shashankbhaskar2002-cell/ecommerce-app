import { useParams } from "react-router-dom";


function OrderDetails(){

    const { id } = useParams();


    return (

        <div className="max-w-5xl mx-auto py-10">

            <h1 className="text-3xl font-bold">

                Order Details

            </h1>


            <p className="mt-5">

                Order ID : {id}

            </p>


        </div>

    );

}


export default OrderDetails;