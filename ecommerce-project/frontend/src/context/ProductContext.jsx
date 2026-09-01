import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import API from "../api/axios";

const ProductContext = createContext();

export function ProductProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

const getProducts = async (filters = {}, page = 1) => {

        try {

            setLoading(true);
            setError("");

    const { data } = await API.get(

`/products?category=${filters.category || ""}&minPrice=${filters.minPrice || ""}&maxPrice=${filters.maxPrice || ""}&rating=${filters.rating || ""}&inStock=${filters.inStock || ""}&sort=${filters.sort || ""}&page=${page}&limit=8`

);

            setProducts(data.products);
setTotalPages(data.totalPages);
        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getProducts();

    }, []);

    return (

        <ProductContext.Provider
value={{

    products,

    loading,

    error,

    totalPages,

    getProducts

}}
        >

            {children}

        </ProductContext.Provider>

    );

}

export function useProducts() {

    return useContext(ProductContext);

}