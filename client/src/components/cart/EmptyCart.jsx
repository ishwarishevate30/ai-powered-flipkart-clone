import { Box, Typography } from "@mui/material";

const EmptyCart = () => {
    return (
        <Box style={{ marginTop: 100, textAlign: "center" }}>
            <img
                src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/empty-cart.png"
                alt="empty cart"
                style={{ width: 400 }}
            />
            <Typography style={{ fontSize: 25 }}>Your Cart is Empty!</Typography>
            <Typography style={{ fontSize: 15 }}>Add items to it now.</Typography>
        </Box>
    );
};

export default EmptyCart;
