import { useEffect, useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";

import API from "../../api/axios";


function ProductDetails() {


    const { id } = useParams();


    const [product, setProduct] = useState(null);
const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");


    const [quantity, setQuantity] = useState(1);
    const { getCart } = useCart();
    const { getWishlist } = useWishlist();




    useEffect(() => {


        getProduct();


    }, []);





    const getProduct = async () => {


        try {


            setLoading(true);



            const { data } = await API.get(

                `/products/${id}`

            );



            setProduct(data.product);
const reviewData = await API.get(
    `/reviews/product/${id}`
);

setReviews(reviewData.data.reviews);


        }

        catch (error) {


            setError(

                error.response?.data?.message ||

                "Product not found"

            );


        }

        finally {


            setLoading(false);


        }


    };




    const addToCart = async () => {
        try {

            await API.post("/cart/add", {
                productId: product._id,
                quantity,
            });

            await getCart();

            alert("Product Added To Cart");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed To Add Cart"
            );

        }
    };


    const addToWishlist = async () => {

        try {


            await API.post(

                "/wishlist/add",

                {

                    productId: product._id

                }

            );


            await getWishlist();


            alert("Added To Wishlist");


        }

        catch (error) {


            alert(

                error.response?.data?.message ||

                "Wishlist Failed"

            );


        }


    };


    if (loading) {


        return (

            <h2 className="text-center py-10 text-xl">

                Loading Product...

            </h2>

        );

    }






    if (error) {


        return (

            <h2 className="text-center text-red-500 py-10">

                {error}

            </h2>

        );

    }






    return (


        <div className="max-w-6xl mx-auto px-6 py-10">


            <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-md">





                {/* Product Image */}


                <div>
                    

<img

    src={product.images?.[0]?.url}

    alt={product.name}

    className="w-full h-96 object-contain rounded-lg shadow bg-gray-100"

/>

                </div>







                {/* Product Details */}


                <div>



                    <h1 className="text-4xl font-bold">

                        {product.name}

                    </h1>





                    {/* Rating */}


                    <div className="mt-4 text-yellow-500 text-xl">

                        ⭐⭐⭐⭐⭐

                        <span className="text-gray-600 text-sm ml-2">

                            ({product.numReviews || 0} Reviews)

                        </span>

                    </div>







                    {/* Price */}


                    <h2 className="text-3xl text-green-600 font-semibold mt-4">

                        ₹{product.price}

                    </h2>







                    {/* Stock */}


                    {

                        product.stock > 0 ?

                            (

                                <p className="text-green-600 mt-4 font-semibold">

                                    In Stock ({product.stock})

                                </p>

                            )

                            :

                            (

                                <p className="text-red-600 mt-4 font-semibold">

                                    Out of Stock

                                </p>

                            )

                    }







                    {/* Quantity */}


                    <div className="flex items-center gap-4 mt-6">


                        <button


                            onClick={() =>

                                quantity > 1 &&

                                setQuantity(quantity - 1)

                            }


                            className="px-4 py-2 bg-gray-300 rounded-lg"

                        >

                            -

                        </button>





                        <span className="text-xl font-semibold">

                            {quantity}

                        </span>





                        <button


                            onClick={() =>

                                setQuantity(quantity + 1)

                            }


                            className="px-4 py-2 bg-gray-300 rounded-lg"

                        >

                            +

                        </button>


                    </div>







                    {/* Buttons */}


                    <button
                        onClick={addToCart}
                        disabled={product.stock === 0}
                        className={`
    mt-6
    w-full
    py-3
    rounded-lg
    font-semibold
    ${product.stock === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-yellow-500 hover:bg-yellow-600"
                            }
    `}
                    >
                        Add To Cart
                    </button>


                    <button

                        onClick={addToWishlist}

                        className="
    mt-3
    w-full
    py-3
    rounded-lg
    font-semibold
    text-white
    bg-pink-500
    hover:bg-pink-600
    "

                    >

                        Add To Wishlist

                    </button>




                    <button


                        disabled={product.stock === 0}


                        className={`

                        mt-3

                        w-full

                        py-3

                        rounded-lg

                        font-semibold

                        text-white

                        ${product.stock === 0

                                ?

                                "bg-gray-400"

                                :

                                "bg-orange-500 hover:bg-orange-600"

                            }

                        `}


                    >

                        Buy Now

                    </button>







                    {/* Description */}


                    <div className="mt-8">


                        <h2 className="text-2xl font-bold mb-3">

                            Description

                        </h2>



                        <p className="text-gray-700">

                            {product.description}

                        </p>


                    </div>





                    <div className="mt-10">


                        <h2 className="text-2xl font-bold">

                            Customer Reviews

                        </h2>



                        <div className="mt-3 text-yellow-500 text-xl">

                            ⭐ {product.averageRating || 0}

                        </div>



                        <p>

                            {product.numReviews || 0} Reviews

                        </p>




                        <ReviewForm

                            productId={product._id}

                            getProduct={getProduct}

                        />


<div className="mt-6">

    <h3 className="text-xl font-bold mb-3">
        Reviews
    </h3>


    {
        reviews.length === 0 ?

        (
            <p className="text-gray-500">
                No Reviews Yet
            </p>
        )

        :

        reviews.map((review)=>(

            <div
                key={review._id}
                className="border-b py-4"
            >

                <h4 className="font-bold">
                    {review.user?.name}
                </h4>


                <p>
                    ⭐ {review.rating}/5
                </p>


                <p>
                    {review.comment}
                </p>


            </div>

        ))

    }


</div>






                        <ReviewList

                            reviews={product.reviews}

                            getProduct={getProduct}

                        />



                    </div>



                    {/* Related Products */}


                    <div className="mt-10">


                        <h2 className="text-2xl font-bold">

                            Related Products

                        </h2>



                        <p className="mt-3 text-gray-600">

                            Coming Next...

                        </p>


                    </div>




                </div>



            </div>



        </div>


    );


}


export default ProductDetails;