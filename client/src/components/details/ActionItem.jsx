
import {Box,Button, styled} from '@mui/material';
import {ShoppingCart as Cart} from '@mui/icons-material';
import {FlashOn as Flash} from '@mui/icons-material';
const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        padding: '20px'
    }
}));

const ImageContainer = styled(Box)({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '90%',
    display: 'flex',
    justifyContent: 'center'
});

const Image = styled('img')({
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain'
});

const StyledButton = styled(Button)`
    width:48%;
    height:50px;
    border-radius:2px;
`;

const ActionItem = ({ product }) => {
    return (
       <LeftContainer>
        <ImageContainer>
            <Image src={product.detailUrl} alt={product.title.longTitle}  />
        </ImageContainer>
        <StyledButton variant="contained" style={{marginRight: 10, backgroundColor: '#ff9f00'}} ><Cart /> Add to Cart</StyledButton>
        <StyledButton variant="contained" style={{backgroundColor: '#fb541b'}}><Flash /> Buy Now</StyledButton>
       </LeftContainer>
    )
}
export default ActionItem