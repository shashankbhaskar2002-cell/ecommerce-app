import ProductForm from "../../components/admin/ProductForm";
import { useParams } from "react-router-dom";


function EditProductPage(){

    const { id } = useParams();


    return(

        <div className="p-6">

            <ProductForm

                editMode={true}

                productId={id}

            />

        </div>

    );

}


export default EditProductPage; 