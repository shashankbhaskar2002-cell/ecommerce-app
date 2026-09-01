import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";


function Cart(){

    const {
        cartItems,
        cartTotal
    } = useCart();




    if(cartItems.length === 0){

        return(

            <h2 className="text-center text-2xl py-10">

                Your Cart Is Empty

            </h2>

        );

    }




    return(

        <div className="max-w-5xl mx-auto px-6 py-10">


            <h1 className="text-3xl font-bold mb-8">

                My Cart

            </h1>




            {
                cartItems.map((item)=>(


                    <div
                    key={item._id}
                    className="flex gap-5 bg-white shadow p-5 rounded-lg mb-5"
                    >

<div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">

    <img

        src={item.product.images?.[0]?.url}

        alt={item.product.name}

        className="w-full h-full object-contain rounded"

    />

</div>



                        <div>


                            <h2 className="text-xl font-bold">

                                {item.product.name}

                            </h2>




                            <p className="text-green-600">

                                ₹{item.product.price}

                            </p>




                            <p>

                                Qty : {item.quantity}

                            </p>



                        </div>



                    </div>


                ))
            }





            <div className="mt-10">


                <h2 className="text-2xl font-bold">

                    Grand Total :
                    ₹{cartTotal}

                </h2>





                <Link

                to="/checkout"

                className="
                inline-block
                mt-5
                bg-green-600
                text-white
                px-5
                py-3
                rounded-lg
                "

                >

                    Proceed To Checkout

                </Link>




            </div>




        </div>

    );

}


export default Cart;