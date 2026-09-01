import {
    useState,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../../api/axios";


function ProductForm({

    editMode=false,

    productId

}){


    const navigate = useNavigate();


    const [form, setForm] = useState({

        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""

    });


    const [image, setImage] = useState(null);
 

    useEffect(()=>{

    if(editMode){

        fetchProduct();

    }

},[editMode, productId]);



// 👇 USE EFFECT KE TURANT NICHE YE ADD KARNA HAI

    const fetchProduct = async()=>{

        try{

            const {data}=await API.get(

                `/products/${productId}`

            );


            console.log(data);


            const product=data.product;


            setForm({

                name:product.name,

                description:product.description,

                price:product.price,

                stock:product.stock,

                category:product.category

            });


        }
        catch(error){

            console.log(error);

        }

    };






    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleImage = (e) => {

        setImage(

            e.target.files[0]

        );

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            const formData = new FormData();


            formData.append(
                "name",
                form.name
            );


            formData.append(
                "description",
                form.description
            );


            formData.append(
                "price",
                form.price
            );


            formData.append(
                "stock",
                form.stock
            );


            formData.append(
                "category",
                form.category
            );


   if(image){

    formData.append(
        "images",
        image
    );

}

if(editMode){

    await API.put(

        `/products/update/${productId}`,

        formData,

        {

            headers:{
                "Content-Type":"multipart/form-data"
            }

        }

    );

}
else{

    await API.post(

        "/products/create",

        formData,

        {

            headers:{
                "Content-Type":"multipart/form-data"
            }

        }

    );

}

           alert(
    editMode
    ?
    "Product Updated Successfully"
    :
    "Product Added Successfully"
);


            navigate(
                "/admin/products"
            );



        }
catch (error) {

    console.log(
        error.response?.data || error.message
    );

    alert(
        error.response?.data?.message || "Failed"
    );

}

    };



    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-lg p-6 max-w-2xl"
        >

           <h2 className="text-2xl font-bold mb-6">

{

editMode ?

"Edit Product"

:

"Add Product"

}

</h2>


            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="border w-full p-3 mb-4 rounded"
            />


            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border w-full p-3 mb-4 rounded"
            />


            <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border w-full p-3 mb-4 rounded"
            />


            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="border w-full p-3 mb-4 rounded"
            />


            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border w-full p-3 mb-4 rounded"
            >

                <option value="">
                    Select Category
                </option>

                <option value="Mobile">
                    Mobile
                </option>

                <option value="Laptop">
                    Laptop
                </option>

                <option value="Watch">
                    Watch
                </option>

                <option value="Accessories">
                    Accessories
                </option>

            </select>



            <input

                type="file"

                accept="image/*"

                onChange={handleImage}

                className="mb-5"

            />



           <button

className="bg-black text-white px-6 py-3 rounded"

>

{

editMode ?

"Update Product"

:

"Add Product"

}

</button>

        </form>

    );

}


export default ProductForm;