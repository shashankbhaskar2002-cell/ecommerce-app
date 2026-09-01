import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import API from "../../api/axios";


function Search() {


    const [searchParams] = useSearchParams();


    const keyword = searchParams.get("keyword");


    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");




    useEffect(() => {


        if (keyword) {

            searchProducts();

        }


    }, [keyword]);





    const searchProducts = async () => {


        try {


            setLoading(true);

            setError("");


            const { data } = await API.get(
                `/products/search?keyword=${keyword}`
            );


            setProducts(

                data.products || []

            );



        } catch (err) {


            console.log(err);


            setError(

                "Something went wrong while searching products"

            );


            setProducts([]);


        } finally {


            setLoading(false);


        }


    };





    if (loading) {


        return (

            <div className="text-center py-10">

                <h2 className="text-xl font-semibold">

                    Loading Products...

                </h2>

            </div>

        );


    }






    return (


        <div className="max-w-7xl mx-auto px-6 py-8">

<div className="flex justify-between items-center mb-4">

    <h1 className="text-2xl font-bold">

        Search Results for "{keyword}"

    </h1>


    <button

        onClick={() => navigate("/products")}

        className="bg-gray-900 text-white px-4 py-2 rounded"

    >

        Clear Search

    </button>


</div>

<p className="text-gray-600 mb-6">

    Found {products.length} Products

</p>

            {
                error && (

                    <p className="text-red-500 mb-4">

                        {error}

                    </p>

                )
            }







            {

                products.length === 0 ? (


                <div>

    <h2 className="text-xl font-bold">

        😔 No Products Found

    </h2>


    <p className="text-gray-600">

        Try another keyword.

    </p>

</div>


                ) : (



                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">



                        {

                            products.map((product) => (


                                <div

                                    key={product._id}

                                    className="border rounded-lg p-4 shadow hover:shadow-lg transition"

                                >

<img
    src={
        product.images?.[0]?.url ||
        "https://via.placeholder.com/300"
    }
    alt={product.name}
    className="w-full h-48 object-contain rounded bg-white"
/>


                                    <h2 className="text-lg font-bold mt-3">

                                        {product.name}

                                    </h2>



                                    <p className="text-gray-600 mt-2">

                                        {product.description}

                                    </p>



                                    <p className="font-semibold text-lg mt-3">

                                        ₹ {product.price}

                                    </p>



                                </div>


                            ))

                        }



                    </div>


                )

            }



        </div>


    );

}



export default Search;