import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";


function ProductTable() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {

        fetchProducts();

    }, [search, page]);


    const fetchProducts = async () => {

        try {

            const { data } = await API.get(

                `/products?keyword=${search}&page=${page}&limit=${limit}`

            );


            setProducts(data.products);

            setTotalPages(data.totalPages);


        }

        catch (error) {

            console.log(error);

        }

    };


    const toggleProduct = (id) => {

        if (selectedProducts.includes(id)) {

            setSelectedProducts(

                selectedProducts.filter(

                    item => item !== id

                )

            );

        }

        else {

            setSelectedProducts([

                ...selectedProducts,

                id

            ]);

        }

    };




    const bulkDelete = async () => {


        if (selectedProducts.length === 0) {

            return alert("Select Products");

        }


        const ok = window.confirm(
            "Delete selected products?"
        );


        if (!ok) return;



        try {


            await API.post(

                "/products/bulk-delete",

                {
                    ids: selectedProducts
                }

            );


            alert(
                "Products Deleted"
            );


            setSelectedProducts([]);


            fetchProducts();



        }
        catch (error) {

            console.log(error);

            alert(
                "Bulk Delete Failed"
            );

        }


    };



    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );


        if (!confirmDelete) return;


        try {

            await API.delete(
                `/products/delete/${id}`
            );


            alert(
                "Product deleted successfully"
            );


            fetchProducts();


        }

        catch (error) {

            console.log(
                error.response?.data || error.message
            );


            alert(
                error.response?.data?.message || "Failed to delete product"
            );

        }

    };



    return (

        <div>




            <div className="flex justify-between mb-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Products
                    </h1>

                    <p className="mt-2">
                        Total Products : {products.length}
                    </p>

                </div>


                <Link

                    to="/admin/products/add"

                    className="bg-black text-white px-5 py-2 rounded"

                >

                    Add Product

                </Link>


            </div>


           <div className="mb-5 flex gap-4">

    <input

        type="text"

        placeholder="Search Product..."

        value={search}

        onChange={(e)=>{

            setSearch(e.target.value);

            setPage(1);

        }}

        className="border p-2 rounded w-80"

    />


    <button

        onClick={bulkDelete}

        className="bg-red-600 text-white px-4 py-2 rounded"

    >

        Delete Selected

    </button>


</div>


            <table className="w-full bg-white shadow rounded-lg overflow-hidden">


                <thead className="bg-gray-100">

                    <tr>

                       <th className="p-4">

<input

type="checkbox"

checked={
products.length > 0 &&
products.every(
product => selectedProducts.includes(product._id)
)
}

onChange={(e)=>{

if(e.target.checked){

setSelectedProducts(

products.map(
product=>product._id
)

);

}
else{

setSelectedProducts([]);

}

}}

/>

</th>


                        <th className="text-left p-4">
                            Name
                        </th>

                        <th className="text-left p-4">
                            Price
                        </th>


                        <th className="text-left p-4">
                            Category
                        </th>


                        <th className="text-left p-4">
                            Stock
                        </th>


                        <th className="text-left p-4">
                            Actions
                        </th>


                    </tr>

                </thead>


                <tbody>

                    {

                        products.map((product) => {

                            return (

                                <tr

                                    key={product._id}

                                    className="border-b hover:bg-gray-50"

                                >


                                    <td className="p-4">

                                        <input

                                            type="checkbox"

                                            checked={selectedProducts.includes(product._id)}

                                            onChange={() => toggleProduct(product._id)}

                                        />

                                    </td>



                                    <td className="p-4 font-medium">

                                        {product.name}

                                    </td>



                                    <td className="p-4">

                                        ₹{product.price}

                                    </td>



                                    <td className="p-4">

                                        {product.category}

                                    </td>



                                    <td className="p-4">

                                        {product.stock}

                                    </td>



                                    <td className="p-4">

                                        <div className="flex gap-3">


                                            <Link

                                                to={`/admin/products/edit/${product._id}`}

                                                className="text-blue-600"

                                            >

                                                Edit

                                            </Link>



                                            <button

                                                onClick={() => deleteProduct(product._id)}

                                                className="text-red-600"

                                            >

                                                Delete

                                            </button>


                                        </div>

                                    </td>


                                </tr>

                            );

                        })

                    }

                </tbody>


            </table>

            <div className="flex justify-center gap-5 mt-8">

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


export default ProductTable;