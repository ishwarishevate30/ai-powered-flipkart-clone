import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import {Box, Typography, Button,Divider,styled } from '@mui/material';  
import Countdown from 'react-countdown';
import {Link} from 'react-router-dom';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
const Component = styled(Box)`
    margin-top: 10px;
    background : #FFFFFF;
`;

const Deal = styled(Box)`
    padding: 15px 20px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
`;

const Timer = styled('img')({
    width: 24,
    marginLeft: 10
});

const DealText = styled(Typography)`
    font-size: 15px;
    font-weight: 600;
    margin-right: 15px;
    line-height: 32px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
    font weight: 600;
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
});

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
    text-align: center;
`;


const Slide = ({ products, title, timer }) => { // Destructured products, title, and timer from props
  const timerURL = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";
  console.log('Products data:', products); // Debugging log to check the products data in the Slide component
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <div>No products available</div>; // Fallback UI for undefined or empty products
  }
  return (
    <Component>
      <Deal>
        <DealText>{title}</DealText>
        {
          timer && 
            <>
              <Timer src={timerURL} alt="timer" />
              <Countdown date={Date.now() + 5.04e+7} renderer={({ hours, minutes, seconds }) => (
                <Box style={{ color: '#7f7f7f', marginLeft: 10, fontWeight: 600 }}>
                  {hours} : {minutes} : {seconds} Left
                </Box>
              )} />
            </>
        }
        <ViewAllButton variant="contained">View All</ViewAllButton>
      </Deal>
      <Divider/>

    <Carousel
     responsive={responsive}
     infinite={true}
     autoPlay={false}
     swipeable={true}
     draggable={false}
     autoPlaySpeed={1000}
     keyBoardControl={true}
     slidesToSlide={1}
     centerMode={true}
     dotListClass="custom-dot-list-style"
     arrows
     >
      {products && Array.isArray(products) && products.map(product => (
        <Link to = {`/product/${product.id}`} style={{ textDecoration: 'none' }} key={product.id}>
        <Box key={product.id} textAlign="center" style={{ padding: '25px 15px' }}>
          <Image src={product.url} alt="product" />
          <Text style={{ fontWeight: 600, marginTop: 10 }}>{product.title.shortTitle}</Text>
          <Text style={{ color: 'green', fontWeight: 600 }}>{product.discount}</Text>
          <Text style={{ color: '#7f7f7f', fontSize: 12 }}>{product.tagline}</Text>
        </Box>
        </Link>
      ))}
    </Carousel>
    </Component>
  );
};
export default Slide