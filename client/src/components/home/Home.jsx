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
                    <MidSlide products={products} title="Deal of the Day" timer={true} />
                    <MidSection/>
                    <Slide products={products} title="Top Picks for You" timer={false} />
                    <Slide products={products} title="Discounts for You" timer={false} />
                    <Slide products={products} title="Suggested Items"timer={false} />
                    <Slide products={products} title="Top Sellers"timer={false} />
                    <Slide products={products} title="Recommended Items" timer={false} />
                    <Slide products={products} title="Trending Offers" timer={false} />
                     <Slide products={products} title="Top Deals on Accessories" timer={false} />

                    
                </Component>
            </>
        </ErrorBoundary>
    );
}

export default Home;