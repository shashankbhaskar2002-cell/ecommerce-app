import { Routes, Route } from "react-router-dom";


import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import AdminRoute from "./AdminRoute";



import Home from "../pages/Home/Home";

import Login from "../pages/Auth/Login";

import Register from "../pages/Auth/Register";

import VerifyOTP from "../pages/Auth/VerifyOTP";



import Products from "../pages/Product/Products";

import ProductDetails from "../pages/Product/ProductDetails";



import Cart from "../pages/Cart/Cart";

import Wishlist from "../pages/Wishlist/Wishlist";

import Profile from "../pages/Profile/Profile";

import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/Orders/OrderDetails";
import Checkout from "../pages/Checkout/Checkout";



import AdminDashboard from "../pages/Admin/AdminDashboard";

import NotFound from "../pages/NotFound/NotFound";

import Payment from "../pages/Payment/Payment";

import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import Search from "../pages/search/Search";
import AdminLayout from "../admin/AdminLayout";

import DashboardPage from "../pages/admin/DashboardPage";


import ProductListPage from "../pages/admin/ProductListPage";
import AddProductPage from "../pages/admin/AddProductPage";
import EditProductPage from "../pages/admin/EditProductPage";

import OrderListPage from "../pages/admin/OrderListPage";
import OrderDetailsPage from "../pages/admin/OrderDetailsPage";

import UsersPage from "../pages/admin/UsersPage";
import UserDetailsPage from "../pages/admin/UserDetailsPage";



function AppRoutes() {


    return (


        <Routes>




            {/* Main Website Layout */}


            <Route element={<MainLayout />}>



                <Route

                    path="/"

                    element={<Home />}

                />





                <Route

                    path="/products"

                    element={<Products />}

                />




                <Route
                    path="/search"
                    element={<Search />}
/>





                {/* Single Product Details */}


                <Route

                    path="/product/:id"

                    element={<ProductDetails />}

                />






                {/* Protected Routes */}



                <Route

                    path="/cart"

                    element={

                        <ProtectedRoute>

                            <Cart />

                        </ProtectedRoute>

                    }

                />






                <Route

                    path="/wishlist"

                    element={<Wishlist />}

                />







                <Route

                    path="/profile"

                    element={

                        <ProtectedRoute>

                            <Profile />

                        </ProtectedRoute>

                    }

                />








                <Route

                    path="/orders"

                    element={

                        <ProtectedRoute>

                            <Orders />

                        </ProtectedRoute>

                    }

                />







                <Route

                    path="/checkout"

                    element={

                        <ProtectedRoute>

                            <Checkout />

                        </ProtectedRoute>

                    }

                />





            </Route>








            {/* Authentication Routes */}



            <Route

                path="/login"

                element={<Login />}

            />





            <Route

                path="/register"

                element={<Register />}

            />





            <Route

                path="/verify-otp"

                element={<VerifyOTP />}

            />







            {/* Admin Route */}



         <Route
    path="/admin"
    element={
        <AdminRoute>
            <AdminLayout />
        </AdminRoute>
    }
>

    <Route
        index
        element={<DashboardPage />}
    />


    <Route
        path="products"
        element={<ProductListPage />}
    />


    <Route
        path="products/add"
        element={<AddProductPage />}
    />


    <Route
        path="products/edit/:id"
        element={<EditProductPage />}
    />


<Route
    path="orders"
    element={<OrderListPage />}

/>

<Route

    path="users"

    element={<UsersPage />}

/>


<Route
    path="users/:id"
    element={<UserDetailsPage/>}
/>


<Route
    path="orders/:id"
    element={<OrderDetailsPage />}
/>

</Route>

            <Route

                path="/payment/:id"

                element={<Payment />}

            />

            <Route
                path="/payment-success"
                element={<PaymentSuccess />}
            />


            <Route
                path="/payment-failed"
                element={<PaymentFailed />}
            />






            {/* 404 Page */}



            <Route

                path="*"

                element={<NotFound />}

            />





        </Routes>




    );


}





export default AppRoutes;