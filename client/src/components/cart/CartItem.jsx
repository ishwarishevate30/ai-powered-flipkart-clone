import { Typography, Box, styled, Button } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import ButtonGroup from './ButtonGroup';
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
const Component = styled(Box)`
    padding: 30px;
    display: flex;
    border-top: 1px solid #f0f0f0;
    background: #fff;
`;

const LeftComponent = styled(Box)`
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    align-items: center;
`;

const Remove = styled(Button)`
    margin-top: 15px;
    font-size: 15px;
    color: #000;
    font-weight: 600;
`;

const CartItem = ({ item }) => {
    
    const fassured = 
    'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const dispatch = useDispatch(); 
    const removeItemFromCart = (id) => {
       dispatch(removeFromCart(id));
    }


    return (
        <Component>
            
            {/* LEFT SIDE */}
            <LeftComponent>
                <img
                    src={item.url}
                    alt="product"
                    style={{ height: 110, width: 110 }}
                />
                <ButtonGroup />
            </LeftComponent>

            {/* RIGHT SIDE */}
            <Box style={{ flex: 1 }}>
                <Typography>
                    {addEllipsis(item.title.longTitle)}
                </Typography>

                <SmallText>
                    Seller: RetailNet
                    <Box component="span">
                        <img
                            src={fassured}
                            alt="fassured"
                            style={{ width: 55, marginLeft: 10 }}
                        />
                    </Box>
                </SmallText>

                <Typography style={{ margin: '20px 0' }}>
                    <Box component="span" style={{ fontSize: 18, fontWeight: 600 }}>
                        ₹{item.price.cost}
                    </Box>
                    &nbsp;&nbsp;&nbsp;

                    <Box component="span" style={{ color: '#878787' }}>
                        <strike>₹{item.price.mrp}</strike>
                    </Box>
                    &nbsp;&nbsp;&nbsp;

                    <Box component="span" style={{ color: '#388E3C' }}>
                        {item.price.discount} off
                    </Box>
                </Typography>

                <Remove variant="outlined" onClick={() => removeItemFromCart(item.id)}   >
                    Remove
                </Remove>
            </Box>

        </Component>
    );
};

export default CartItem;