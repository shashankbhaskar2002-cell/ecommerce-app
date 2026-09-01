import OrderDetails from "../../components/admin/OrderDetails";
import { useParams } from "react-router-dom";


function OrderDetailsPage(){

    const { id } = useParams();


    return(

        <div className="p-6">

            <OrderDetails orderId={id}/>

        </div>

    );

}


export default OrderDetailsPage;