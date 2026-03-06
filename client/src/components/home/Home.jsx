import {  useEffect } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Slide from './Slide';
import {Box} from '@mui/material';  
import { getProducts } from '../../redux/actions/productActions';
import MidSlide from './MidSlide';
import {styled} from '@mui/material';   
import { useDispatch,useSelector } from 'react-redux';
import ErrorBoundary from '../ErrorBoundary';
import MidSection from './MidSection';

const Component = styled(Box)`
    padding : 10px;
    background : #F2F2F2;
`


const Home = () =>
{
     const { products } = useSelector(state => state.products);  
    const sortedProducts = [...(products || [])].sort((a, b) => Number(a.id) - Number(b.id));

    const firstSlideProducts = sortedProducts.slice(0, 6);
    const secondSlideProducts = sortedProducts.slice(6, 12);
    const thirdSlideProducts = sortedProducts.slice(12, 18);
    const fourthSlideProducts = sortedProducts.slice(18, 24);
    
    const dispatch = useDispatch();
   
    useEffect(()=>
    {
        dispatch(getProducts());
    
    },[dispatch])

    console.log('Redux products state:', products); // Debugging log to check the products data in Redux state

    return (
        <ErrorBoundary>
            < >
                <Navbar/>
                <Component>
                    <Banner/> 
                    <MidSlide products={firstSlideProducts} title="Deal of the Day" timer={true} />
                    <MidSection/>
                    <Slide products={secondSlideProducts} title="Top Picks for You" timer={false} />
                    <Slide products={thirdSlideProducts} title="Discounts for You" timer={false} />
                    <Slide products={fourthSlideProducts} title="Suggested Items"timer={false} />
                  
                    
                </Component>
            </>
        </ErrorBoundary>
    );
}

export default Home;