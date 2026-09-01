import { useState } from "react";

const categories = [

    "All",
"Mobile",
    "Electronics",

    "Fashion",

    "Books",

    "Furniture",

    "Sports"

];

function ProductFilters({ onFilter }) {

    const [category, setCategory] = useState("All");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");
    const [rating, setRating] = useState("");

const [inStock, setInStock] = useState(false);
const [sort, setSort] = useState("");
const applyFilters = () => {

    onFilter({

        category,
        minPrice,
        maxPrice,
        rating,
        inStock,
        sort

    });

};
    return (

        <div className="bg-white p-5 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">

                Filters

            </h2>

            <label className="block mb-2">

                Category

            </label>

            <select

                value={category}

                onChange={(e) => setCategory(e.target.value)}

                className="border p-2 rounded w-full"

            >

                {

                    categories.map(cat => (

                        <option

                            key={cat}

                            value={cat}

                        >

                            {cat}

                        </option>

                    ))

                }

            </select>

            <label className="block mt-4">

                Min Price

            </label>

            <input

                type="number"

                value={minPrice}

                onChange={(e) =>

                    setMinPrice(e.target.value)

                }

                className="border p-2 rounded w-full"

            />

            <label className="block mt-4">

                Max Price

            </label>

            <input

                type="number"

                value={maxPrice}

                onChange={(e) =>

                    setMaxPrice(e.target.value)

                }

                className="border p-2 rounded w-full"

            />



                <label className="block mt-4">

Minimum Rating

</label>


<select

value={rating}

onChange={(e)=>setRating(e.target.value)}

className="border p-2 rounded w-full"

>

<option value="">
All Ratings
</option>

<option value="5">
5 Stars
</option>

<option value="4">
4 Stars & Above
</option>

<option value="3">
3 Stars & Above
</option>

<option value="2">
2 Stars & Above
</option>

<option value="1">
1 Star & Above
</option>

</select>





<label className="flex items-center gap-2 mt-4">


<input

type="checkbox"

checked={inStock}

onChange={(e)=>setInStock(e.target.checked)}

/>


In Stock Only


</label>


<label className="block mt-4">

Sort By

</label>


<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

className="border p-2 rounded w-full"

>

<option value="">
Default
</option>

<option value="price_asc">
Price : Low to High
</option>

<option value="price_desc">
Price : High to Low
</option>

<option value="latest">
Newest First
</option>

<option value="rating">
Highest Rated
</option>


</select>


            <button

                onClick={applyFilters}

                className="bg-black text-white w-full mt-5 py-2 rounded"

            >

                Apply Filters

            </button>


<button
onClick={()=>{

setCategory("All");
setMinPrice("");
setMaxPrice("");
setRating("");
setInStock(false);
setSort("");


onFilter({

category:"All",
minPrice:"",
maxPrice:"",
rating:"",
inStock:false,
sort:""

});


}}

className="border w-full mt-3 py-2 rounded"

>

Reset Filters

</button>





        </div>

    );

}

export default ProductFilters;