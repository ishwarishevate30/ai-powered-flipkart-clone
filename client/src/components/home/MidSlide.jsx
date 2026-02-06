import { Box , styled} from '@mui/material';
import Slide from './Slide';


const Component = styled(Box)`
    display: flex;
   
`; 

const LeftComponent = styled(Box)`
    width: 83%;
`;

const RightComponent = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    margin-top: 10px;
    margin-left: 10px;
    width: 17%;
    text-align: center;
`;

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'contain'
});

const MidSlide = ({products, title, timer}) => {
    const adURL = "https://rukminim2.flixcart.com/fk-p-flap/1060/1620/image/ce3cf81edb760559.jpg?q=60"; 
  return (
  <Component>
    <LeftComponent>
     <Slide
      products={products} 
      title={title}
       timer={timer} />
    </LeftComponent>
    <RightComponent>
    <Image src={adURL} alt="mid-slide-ad"/>
    </RightComponent>
  </Component>

    )
}
export default MidSlide;