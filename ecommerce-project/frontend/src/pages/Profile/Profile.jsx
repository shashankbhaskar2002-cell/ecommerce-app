import { useEffect, useState } from "react";
import API from "../../api/axios";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaSave
} from "react-icons/fa";


function Profile() {


    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);

    const [saving,setSaving] = useState(false);

    const [error,setError] = useState("");

    const [success,setSuccess] = useState("");

    const [image,setImage] = useState(null);

const [uploading,setUploading] = useState(false);
    



    const [formData,setFormData] = useState({

        name:"",
        email:"",
        phone:""

    });






    useEffect(()=>{

        getProfile();

    },[]);







    const getProfile = async()=>{


        try{


            setLoading(true);


            const {data}=await API.get(
                "/users/profile"
            );


            setUser(data.user);


            setFormData({

                name:data.user.name || "",

                email:data.user.email || "",

                phone:data.user.phone || ""

            });


        }

        catch(error){


            setError(

                error.response?.data?.message ||

                "Unable to load profile"

            );


        }

        finally{


            setLoading(false);


        }


    };









    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };









    const updateProfile=async(e)=>{


        e.preventDefault();


        try{


            setSaving(true);

            setSuccess("");



            const {data}=await API.put(

                "/users/profile",

                formData

            );



            setSuccess(

                data.message ||

                "Profile updated successfully"

            );


            getProfile();


        }


        catch(error){


            setError(

                error.response?.data?.message ||

                "Update failed"

            );


        }






        finally{


            setSaving(false);


        }


    };



const uploadProfileImage = async()=>{


    if(!image){

        alert("Please select image");

        return;

    }


    try{


        setUploading(true);


        const formData = new FormData();


        formData.append(
            "image",
            image
        );



        const {data}=await API.put(

            "/users/profile/image",

            formData,

            {
                headers:{
                    "Content-Type":
                    "multipart/form-data"
                }
            }

        );



        alert(data.message);


        getProfile();



    }
    catch(error){


        alert(

            error.response?.data?.message ||

            "Image upload failed"

        );


    }
    finally{


        setUploading(false);


    }


};




    if(loading){


        return (

            <div className="text-center mt-20 text-xl">

                Loading Profile...

            </div>

        );

    }






    return (



<div className="
min-h-screen
bg-gray-100
py-10
px-5
">



<div className="
max-w-5xl
mx-auto
grid
md:grid-cols-3
gap-8
">







{/* PROFILE CARD */}



<div className="
bg-white
rounded-2xl
shadow-lg
p-8
text-center
h-fit
">



<img

src={
user.profileImage?.url ||

"/default-user.png"
}

alt={user.name}

className="
w-32
h-32
rounded-full
mx-auto
object-cover
border-4
border-yellow-400
"
/>



<input

type="file"

accept="image/*"

onChange={(e)=>setImage(e.target.files[0])}

className="mt-4"

/>


<button

onClick={uploadProfileImage}

disabled={uploading}

className="
mt-3
bg-yellow-500
px-5
py-2
rounded-lg
font-bold
"

>

{

uploading

?

"Uploading..."

:

"Upload Photo"

}

</button>


<h2 className="
text-2xl
font-bold
mt-5
">

{user.name}

</h2>



<p className="
text-gray-500
mt-1
">

Customer Account

</p>





<div className="
mt-5
bg-yellow-100
text-yellow-700
px-4
py-2
rounded-full
inline-block
font-semibold
">

⭐ Premium Member

</div>







<div className="
text-left
mt-8
space-y-4
text-gray-700
">


<p className="flex gap-3 items-center">

<FaEnvelope className="text-yellow-500"/>

{user.email}

</p>



<p className="flex gap-3 items-center">

<FaPhone className="text-yellow-500"/>

{user.phone || "No Phone"}

</p>



<p className="flex gap-3 items-center">

<FaCalendarAlt className="text-yellow-500"/>

{

new Date(
user.createdAt
).toLocaleDateString()

}

</p>


</div>




</div>









{/* EDIT FORM */}



<div className="
md:col-span-2
bg-white
rounded-2xl
shadow-lg
p-8
">



<h1 className="
text-3xl
font-bold
mb-8
">

Account Settings

</h1>






{
success &&

<div className="
bg-green-100
text-green-700
p-3
rounded-lg
mb-5
">

✅ {success}

</div>

}







{
error &&

<div className="
bg-red-100
text-red-600
p-3
rounded-lg
mb-5
">

{error}

</div>

}







<form

onSubmit={updateProfile}

className="space-y-6"

>




<div>

<label className="font-semibold">

Full Name

</label>


<div className="
flex
items-center
border
rounded-lg
mt-2
px-3
">


<FaUser className="text-gray-400"/>


<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

className="
w-full
p-3
outline-none
"

/>


</div>

</div>









<div>

<label className="font-semibold">

Email Address

</label>


<div className="
flex
items-center
border
rounded-lg
mt-2
px-3
">


<FaEnvelope className="text-gray-400"/>


<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

className="
w-full
p-3
outline-none
"

/>


</div>


</div>









<div>

<label className="font-semibold">

Phone Number

</label>


<div className="
flex
items-center
border
rounded-lg
mt-2
px-3
">


<FaPhone className="text-gray-400"/>


<input

type="text"

name="phone"

value={formData.phone}

onChange={handleChange}

className="
w-full
p-3
outline-none
"

/>


</div>


</div>









<button

disabled={saving}

className="
w-full
bg-yellow-500
hover:bg-yellow-600
text-black
font-bold
py-3
rounded-lg
flex
justify-center
items-center
gap-3
transition
"

>


<FaSave/>


{

saving

?

"Saving..."

:

"Save Changes"

}


</button>






</form>





</div>






</div>


</div>



    );


}


export default Profile;