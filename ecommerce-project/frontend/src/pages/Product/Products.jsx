import { useState, useEffect } from "react";
import ProductFilters from "../../components/product/ProductFilters";
import { useProducts } from "../../context/ProductContext";
import { Link } from "react-router-dom";


function Products() {
    const {
        products,
        loading,
        error,
        totalPages,
        getProducts
    } = useProducts();

    const [filters, setFilters] = useState({

        category: "All",

        minPrice: "",

        maxPrice: "",

        rating: "",

        inStock: false,

        sort: ""

    });


    const [page, setPage] = useState(1);



    const limit = 8;



    useEffect(() => {

        getProducts(filters, page);

    }, [page]);


    if (loading) {

        return (

            <h2 className="text-center py-10 text-xl">
                Loading Products...
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


        <div className="max-w-7xl mx-auto px-6 py-10">


            <h1 className="text-3xl font-bold mb-8">

                All Products

            </h1>



            <ProductFilters

                onFilter={(data) => {

                    setFilters(data);

                    setPage(1);

                    getProducts(data, 1);

                }}

            />



            <div className="grid md:grid-cols-4 gap-6">


                {

                    products.map((product) => (


                        <div

                            key={product._id}

                            className="border rounded-lg shadow p-4"

                        >

                            <div className="w-full h-48 flex items-center justify-center bg-white rounded">
                                <img
                                    src={product.images?.[0]?.url}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            <h2 className="font-bold text-lg mt-3">

                                {product.name}

                            </h2>





                            <p className="text-green-600 font-semibold">

                                ₹{product.price}

                            </p>





                            <Link

                                to={`/product/${product._id}`}

                                className="block mt-4 bg-yellow-500 text-center py-2 rounded"

                            >

                                View Details

                            </Link>



                        </div>


                    ))

                }


            </div>






            <div className="flex justify-center gap-4 mt-10">

                <button

                    disabled={page === 1}

                    onClick={() => setPage(page - 1)}

                    className="border px-4 py-2 rounded"

                >

                    Previous

                </button>


                <span>

                    Page {page} of {totalPages}

                </span>


                <button

                    disabled={page === totalPages}

                    onClick={() => setPage(page + 1)}

                    className="border px-4 py-2 rounded"

                >

                    Next

                </button>


            </div>

        </div>


    );


}


export default Products;