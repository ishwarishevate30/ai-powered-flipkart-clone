import { Box, Button, styled } from '@mui/material';
import { ShoppingCart as Cart } from '@mui/icons-material';
import { FlashOn as Flash } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}));

const ImageContainer = styled(Box)({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '90%',
    maxWidth: '420px',
    height: '420px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const Image = styled('img')({
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: '50px',
    borderRadius: '2px',
    [theme.breakpoints.down('lg')]: {
        width: '46%',
        marginBottom: '10px'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%',
        marginBottom: '10px'
    }
}));

const ActionItem = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addItemToCart = () => {
        dispatch(addToCart(product.id, 1));
        navigate('/cart'); // Redirect to cart page
    };

    return (
       <LeftContainer>
        <ImageContainer>
            <Image src={product.detailUrl} alt={product.title.longTitle}  />
        </ImageContainer>
        <StyledButton variant="contained" onClick={addItemToCart} style={{marginRight: 10, backgroundColor: '#ff9f00'}} ><Cart /> Add to Cart</StyledButton>
        <StyledButton variant="contained" style={{backgroundColor: '#fb541b'}}><Flash /> Buy Now</StyledButton>
       </LeftContainer>
    );
};

export default ActionItem;