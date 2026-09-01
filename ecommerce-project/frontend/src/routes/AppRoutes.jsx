import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../admin/AdminLayout";

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

import NotFound from "../pages/NotFound/Notfound";

import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";

import Search from "../pages/search/Search";

// Admin Pages
import DashboardPage from "../pages/Admin/DashboardPage";
import ProductListPage from "../pages/Admin/ProductListPage";
import AddProductPage from "../pages/Admin/AddProductPage";
import EditProductPage from "../pages/Admin/EditProductPage";

import OrderListPage from "../pages/Admin/OrderListPage";
import OrderDetailsPage from "../pages/Admin/OrderDetailsPage";

import UsersPage from "../pages/Admin/UsersPage";
import UserDetailsPage from "../pages/Admin/UserDetailsPage";


function AppRoutes() {
    return (
        <Routes>

            {/* ================= MAIN WEBSITE ================= */}

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

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />


                {/* ================= PROTECTED ROUTES ================= */}

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
                    path="/orders/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetails />
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


            {/* ================= AUTHENTICATION ================= */}

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


            {/* ================= ADMIN PANEL ================= */}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >

                {/* /admin */}

                <Route
                    index
                    element={<DashboardPage />}
                />

                {/* /admin/products */}

                <Route
                    path="products"
                    element={<ProductListPage />}
                />

                {/* /admin/products/add */}

                <Route
                    path="products/add"
                    element={<AddProductPage />}
                />

                {/* /admin/products/edit/:id */}

                <Route
                    path="products/edit/:id"
                    element={<EditProductPage />}
                />

                {/* /admin/orders */}

                <Route
                    path="orders"
                    element={<OrderListPage />}
                />

                {/* /admin/orders/:id */}

                <Route
                    path="orders/:id"
                    element={<OrderDetailsPage />}
                />

                {/* /admin/users */}

                <Route
                    path="users"
                    element={<UsersPage />}
                />

                {/* /admin/users/:id */}

                <Route
                    path="users/:id"
                    element={<UserDetailsPage />}
                />

            </Route>


            {/* ================= PAYMENT ================= */}

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


            {/* ================= 404 ================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}


export default AppRoutes;