import axios from 'axios';
import { GET_Product_SUCCESS, GET_Product_FAILURE } from '../constants/productConstant';
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




