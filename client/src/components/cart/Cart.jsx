import { useSelector } from 'react-redux';
import { Box, Grid, Typography, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
const Container = styled(Grid)`
    padding: 30px 20px;
    max-width: 1200px;
    margin: auto;

    @media (max-width: 600px) {
        padding: 15px 10px;
    }
`;

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;

    & > button {
        display: flex;
        margin-left: auto;
        background: #fb541b;
        color: #fff;
        border-radius: 2px;
        width: 250px;
        height: 51px;

        @media (max-width: 600px) {
            width: 100%;
        }
    }
`;

const Cart = () => {
    const { cartItems = [] } = useSelector(state => state.cart || {});
    const navigate = useNavigate();

    const placeOrder = () => {
        navigate('/paytm', {
            state: {
                items: cartItems,
                source: 'place-order'
            }
        });
    };

    return (
        <>
            {cartItems.length ? (
                <Container container spacing={2}>
                    
                    {/* LEFT SECTION */}
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <Header>
                            <Typography variant="h6">
                                My Cart ({cartItems.length})
                            </Typography>
                        </Header>

                        {cartItems.map((item, index) => (
                            <CartItem item={item} key={index} />
                        ))}

                        <ButtonWrapper>
                            <Button variant="contained" onClick={placeOrder}>
                                Place Order
                            </Button>
                        </ButtonWrapper>
                    </Grid>

                    {/* RIGHT SECTION */}
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>

                </Container>
            ) : (
               

                <EmptyCart />           
            )}
        </>
    );
};

export default Cart;