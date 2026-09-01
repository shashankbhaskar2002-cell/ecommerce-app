import { useState } from "react";
import API from "../../api/axios";


function ReviewForm({ productId, getProduct }) {


    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");



    const submitReview = async () => {


        try {


            await API.post(

                "/reviews/create",

                {
                    productId,
                    rating,
                    comment
                }

            );


            alert("Review Added");


            setComment("");

            setRating(5);


            getProduct();



        }

        catch (error) {


            alert(

                error.response?.data?.message ||

                "Review Failed"

            );


        }


    };





    return (

        <div className="mt-5">


            <h2 className="text-xl font-bold">

                Write Review

            </h2>





            <select

                value={rating}

                onChange={(e) =>

                    setRating(Number(e.target.value))

                }

                className="border p-2 mt-3"

            >


                <option value={5}>
                    5 ⭐
                </option>


                <option value={4}>
                    4 ⭐
                </option>


                <option value={3}>
                    3 ⭐
                </option>


                <option value={2}>
                    2 ⭐
                </option>


                <option value={1}>
                    1 ⭐
                </option>


            </select>







            <textarea


                value={comment}


                onChange={(e) =>

                    setComment(e.target.value)

                }


                placeholder="Write your review"


                className="border p-3 block mt-3 w-full"



            />








            <button


                onClick={submitReview}


                className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"



            >

                Submit Review


            </button>



        </div>


    );


}


export default ReviewForm;