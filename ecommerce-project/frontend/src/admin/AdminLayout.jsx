import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen">

                <Topbar />

                <main>

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;