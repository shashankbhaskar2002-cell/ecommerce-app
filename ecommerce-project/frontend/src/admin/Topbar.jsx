import { useAuth } from "../context/AuthContext";


function Topbar(){

    const {user}=useAuth();


    return (

        <header className="bg-white shadow p-4 flex justify-between">


            <h2 className="text-xl font-semibold">

                Dashboard

            </h2>


            <div>

                Welcome, 

                <strong className="ml-2">

                    {user?.name}

                </strong>

            </div>


        </header>

    );

}


export default Topbar;