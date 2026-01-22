import {  useEffect } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Slide from './Slide';
import {Box} from '@mui/material';  
import { getProducts } from '../../redux/actions/productActions';

import {styled} from '@mui/material';   
import { useDispatch,useSelector } from 'react-redux';

const Component = styled(Box)`
    padding : 10px;
    background : #F2F2F2;
`


const Home = () =>
{
     const getProductsState = useSelector(state => state.getProducts);
    const { products } = getProductsState;  
    
    const dispatch = useDispatch();
   
    useEffect(()=>
    {
        dispatch(getProducts());
    
    },[dispatch])

    console.log('Redux products state:', products); // Debugging log to check the products data in Redux state

    return (
        < >
            <Navbar/>
            <Component>
                <Banner/> 
                <Slide products={products} />
            </Component>
           

        </>
       
    )
}
export default Home;