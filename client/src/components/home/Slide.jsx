import Carousel from "react-multi-carousel"

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
const Slide = ({ products }) => { // Destructured products from props
  console.log('Products data:', products); // Debugging log to check the products data in the Slide component
  return (
    <Carousel responsive={responsive}>
      {
        products && Array.isArray(products) && products.map(product => (
          <img src={product.url} alt="product" style={{ width: '100%', height: '150px' }} />
        ))
      }
    </Carousel>
  );
};
export default Slide