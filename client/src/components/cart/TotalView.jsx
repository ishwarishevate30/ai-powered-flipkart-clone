import { Box, Typography, styled } from "@mui/material";
import { useState, useEffect, useCallback } from "react"; 
const Header = styled(Box)`

    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
` ;
const Heading = styled(Typography)`
    color: #878787;
    font-size: 14px;
`

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
        & > h6 {
        margin-bottom: 20px;
    }
    `;
    const Price = styled(Box)`
        float: right;
        font-size: 14px;
    `
    const Discount = styled(Box)`
       
        font-size: 14px;
        color: green;
        font-weight: 500;
    `
const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 500;
    color: #000;
`

const TotalView = ({ cartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const totalAmount = useCallback(() => {
    let price = 0, discount = 0;
    cartItems.forEach(item => {
      price += item.price.mrp;
      discount += (item.price.mrp - item.price.cost);
    })    
    setPrice(price);
    setDiscount(discount);
  }, [cartItems]);

  useEffect(() => {
    totalAmount();
  }, [totalAmount]);  

  return (
    <Box>
      <Header>
        <Heading>
          <Typography> Price Details</Typography>
        </Heading>
      </Header>
      <Container>
        <Typography>Price ({cartItems?.length}) </Typography>
        <Price component="span">₹{price}</Price>
        <Typography>Discount ({cartItems?.length})</Typography>
        <Price component="span">₹{discount}</Price>
        <Typography>Delivery Charges</Typography>
        <Price component="span">₹40</Price>
        <TotalAmount component="h6">Total Amount</TotalAmount>
        <Price component="span">₹{price - discount + 40}</Price>
        <Discount>You will save ₹{discount} on this order</Discount>
      </Container>
    </Box>
  );
};

export default TotalView;