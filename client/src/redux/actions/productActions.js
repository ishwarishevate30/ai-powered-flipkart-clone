import axios from 'axios';
import { GET_Product_SUCCESS, GET_Product_FAILURE } from '../constants/productConstant';
import { GET_Product_DETAILS_REQUEST, GET_Product_DETAILS_SUCCESS, GET_Product_DETAILS_FAILURE } from '../constants/productConstant';
const URL = 'http://localhost:8000'; // Updated the base URL to match the server configuration

export const getProducts = () => async (dispatch) => {
    try {
        let response = await axios.get(`${URL}/products`); // Updated endpoint to match the server route
        console.log(response);
        dispatch({ type: GET_Product_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_Product_FAILURE, payload: error.message });
    }
};

let obj = {config:{},
    data:[], 
    headers:{},
    request:{},
    status:200,
    statusText:'OK',
    message:''
    }
    
    const { data } = obj;
    console.log(data);

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_Product_DETAILS_REQUEST });
        let response = await axios.get(`${URL}/product/${id}`);
        console.log(response);
       dispatch({ type: GET_Product_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_Product_DETAILS_FAILURE, payload: error.message });    
    }   
};





