function ReviewList({

    reviews,

    getProduct

}) {


    if(!reviews || reviews.length === 0){

        return (

            <h2 className="mt-5 text-gray-500">

                No Reviews Yet

            </h2>

        );

    }



    return (

        <div className="mt-5">


            {

                reviews.map((review)=>(


                    <div

                    key={review._id}

                    className="border-b py-4"

                    >


                        <h3 className="font-bold">

                            {review.user?.name}

                        </h3>



                        <p className="text-yellow-500">

                            ⭐ {review.rating}/5

                        </p>



                        <p>

                            {review.comment}

                        </p>



                    </div>


                ))

            }


        </div>

    );


}


export default ReviewList;