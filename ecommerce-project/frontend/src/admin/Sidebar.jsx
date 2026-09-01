import { NavLink } from "react-router-dom";

function Sidebar() {

    const menus = [

        {
            name: "Dashboard",
            path: "/admin"
        },

        {
            name: "Products",
            path: "/admin/products"
        },

        {
            name: "Orders",
            path: "/admin/orders"
        },



        {

            name: "Users",

            path: "/admin/users"

        },

        {
            name: "Users",
            path: "/admin/users"
        },

        {
            name: "Reviews",
            path: "/admin/reviews"
        },

        {
            name: "Payments",
            path: "/admin/payments"
        }

    ];


    return (

        <aside className="w-64 bg-gray-900 text-white min-h-screen">


            <h1 className="text-2xl font-bold p-6">

                Admin Panel

            </h1>


            {
                menus.map(menu => (

                    <NavLink

                        key={menu.path}

                        to={menu.path}

                        className="block px-6 py-3 hover:bg-gray-700"

                    >

                        {menu.name}

                    </NavLink>

                ))
            }


        </aside>

    );

}


export default Sidebar;