import {
    useEffect,
    useState
}
from "react";


import API from "../../api/axios";



function UserDetails({userId}){


const [user,setUser] = useState(null);

const [role,setRole] = useState("");


useEffect(()=>{

    fetchUser();

},[]);



const fetchUser = async()=>{

    try{

        const {data}=await API.get(
            `/users/${userId}`
        );


        setUser(data.user);
        setRole(data.user.role);


    }
    catch(error){

        console.log(error);

    }

};



if(!user){

    return <h2>Loading...</h2>;

}


const updateRole = async()=>{

    try{

        await API.put(

            `/users/${userId}/role`,

            {
                role
            }

        );


        alert(
            "Role Updated Successfully"
        );


        fetchUser();


    }
   catch(error){

    console.log(error.response?.data || error.message);

    alert(
        error.response?.data?.message || "Failed to Update Role"
    );

}

};
return(

<div>


<h1 className="text-3xl font-bold mb-6">

User Details

</h1>



<div className="bg-white shadow rounded p-6">


<img

src={
user.profileImage?.url ||
"https://via.placeholder.com/150"
}

className="w-32 h-32 rounded-full object-cover mb-5"

/>



<p>

<strong>Name :</strong>

{user.name}

</p>


<p>

<strong>Email :</strong>

{user.email}

</p>

<div className="mt-5">

<label className="font-semibold block mb-2">

Role

</label>


<select

value={role}

onChange={(e)=>setRole(e.target.value)}

className="border p-2 rounded w-full text-black bg-white"

>

<option value="user">

User

</option>


<option value="admin">

Admin

</option>


</select>



<button

onClick={updateRole}

className="bg-black text-white px-5 py-2 rounded mt-5"

>

Update Role

</button>


</div>

<p>

<strong>Verified :</strong>

{
user.isVerified
?
"Yes"
:
"No"
}

</p>


<p>

<strong>Joined :</strong>

{
new Date(user.createdAt)
.toLocaleDateString()
}

</p>



</div>


</div>

);


}


export default UserDetails;