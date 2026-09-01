import { useParams } from "react-router-dom";
import UserDetails from "../../components/admin/UserDetails";


function UserDetailsPage(){

    const { id } = useParams();


    return(

        <div className="p-6">

            <UserDetails userId={id}/>

        </div>

    );

}


export default UserDetailsPage;