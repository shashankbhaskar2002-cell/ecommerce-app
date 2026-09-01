import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import API from "../../api/axios";


function Wishlist() {


    const {
        wishlistItems,
        getWishlist
    } = useWishlist();


    const {
        getCart
    } = useCart();





    const removeWishlist = async (productId) => {

        try {

            await API.delete(
                `/wishlist/remove/${productId}`
            );


            await getWishlist();


            alert("Removed From Wishlist");


        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Remove Failed"
            );

        }

    };







    const moveToCart = async (productId) => {


        try {


            await API.post(

                "/cart/add",

                {
                    productId,
                    quantity: 1
                }

            );



            await API.delete(

                `/wishlist/remove/${productId}`

            );



            await getCart();

            await getWishlist();



            alert("Moved To Cart");


        }

        catch (error) {


            alert(
                error.response?.data?.message ||
                "Move Failed"
            );


        }


    };







    if (wishlistItems.length === 0) {


        return (

            <div className="text-center py-20">


                <h1 className="text-3xl font-bold">

                    Your Wishlist Is Empty ❤️

                </h1>


                <p className="mt-3 text-gray-600">

                    Save products you like.

                </p>


            </div>

        );


    }







    return (


        <div className="max-w-6xl mx-auto px-6 py-10">


            <h1 className="text-3xl font-bold mb-8">

                My Wishlist ❤️

            </h1>





            <div className="grid md:grid-cols-4 gap-6">


                {

                    wishlistItems.map((item) => (


                        <div

                            key={item._id}

                            className="border p-4 rounded-lg shadow"

                        >


                            <img

                                src={item.images?.[0]?.url}

                                alt={item.name}

                                className="w-full h-48 object-contain rounded bg-gray-100"

                            />



                            <h2 className="font-bold mt-3">

                                {item.name}

                            </h2>





                            <p className="text-green-600 font-semibold">

                                ₹{item.price}

                            </p>





                            <button

                                onClick={() => removeWishlist(item._id)}

                                className="bg-red-500 text-white w-full mt-4 py-2 rounded"

                            >

                                Remove

                            </button>





                            <button

                                onClick={() => moveToCart(item._id)}

                                className="bg-yellow-500 w-full mt-3 py-2 rounded"

                            >

                                Move To Cart

                            </button>


                        </div>


                    ))

                }


            </div>


        </div>


    );


}


export default Wishlist;