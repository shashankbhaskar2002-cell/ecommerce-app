import axios from "axios";


const API = axios.create({

    baseURL: "http://localhost:5000/api",

    withCredentials: true

});



// Attach Token Automatically

API.interceptors.request.use(

    (config) => {


        const token = localStorage.getItem("token");


        if (token) {


            config.headers.Authorization = `Bearer ${token}`;


        }


        return config;


    },


    (error) => {


        return Promise.reject(error);


    }

);




// Global Response Error Handler

API.interceptors.response.use(

    (response) => {


        return response;


    },


    (error) => {


        if(error.response?.status === 401){


            console.log("Unauthorized User");


        }


        return Promise.reject(error);


    }

);



export default API;