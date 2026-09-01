import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

function UsersTable() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [stats, setStats] = useState({

        totalUsers: 0,

        verifiedUsers: 0,

        admins: 0

    });

    useEffect(() => {

        fetchUsers();

    }, [page, search]);

    const fetchUsers = async () => {

        try {

            const { data } = await API.get(

                `/users?page=${page}&search=${search}`

            );


            setUsers(data.users);


            setTotalPages(
                data.totalPages
            );


            setStats(
                data.stats
            );


        }

        catch (error) {

            console.log(error);

        }


    };


    const deleteUser = async (id) => {

        const ok = window.confirm(
            "Delete this user?"
        );


        if (!ok) return;


        try {

            await API.delete(
                `/users/${id}`
            );


            alert(
                "User Deleted"
            );


            fetchUsers();


        }
        catch (error) {

            console.log(error);


            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Users
            </h1>

            <input

                type="text"

                placeholder="Search Users..."

                value={search}

                onChange={(e) => {

                    setSearch(e.target.value);

                    setPage(1);

                }}

                className="border p-2 rounded w-full mb-5"

            />


            <table className="w-full border bg-white shadow rounded-lg">

                <thead>

                    <tr>

                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Role
                        </th>

                        <th className="p-4 text-left">
                            Verified
                        </th>

                        <th className="p-4 text-left">
                            Action
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {

                        users.map(user => (

                            <tr
                                key={user._id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">{user.name}</td>

                                <td className="p-4">{user.email}</td>

                                <td className="p-4">
                                    {user.role}
                                </td>
                                <td className="p-4">

                                    {
                                        user.isVerified
                                            ? "✅"
                                            : "❌"
                                    }

                                </td>

                               <td className="p-4 space-x-3">

<Link

to={`/admin/users/${user._id}`}

className="text-blue-600"

>

View

</Link>


<button

onClick={() => deleteUser(user._id)}

className="text-red-600 ml-3"

>

Delete

</button>


</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>
<div className="flex gap-4 mt-6">


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="border px-4 py-2"

>

Previous

</button>



<span>

Page {page} of {totalPages}

</span>



<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="border px-4 py-2"

>

Next

</button>


</div>
        </div>

    );

}

export default UsersTable;