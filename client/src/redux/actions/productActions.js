import axios from 'axios';
import { GET_Product_SUCCESS, GET_Product_FAILURE } from '../constants/productConstant';
import { GET_Product_DETAILS_REQUEST, GET_Product_DETAILS_SUCCESS, GET_Product_DETAILS_FAILURE } from '../constants/productConstant';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getProducts = () => async (dispatch) => {
    try {
        let response = await axios.get(`${URL}/api/products`);
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
        let response = await axios.get(`${URL}/api/product/${id}`);
        console.log(response);
       dispatch({ type: GET_Product_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_Product_DETAILS_FAILURE, payload: error.message });    
    }   
};





