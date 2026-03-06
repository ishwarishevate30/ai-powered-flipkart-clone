import { Box, Divider, Typography, styled } from "@mui/material";
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
  font-size: 14px;
    `;

  const Row = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
  `;

    const Price = styled(Box)`
        font-size: 14px;
    font-weight: 500;
    `

    const Discount = styled(Box)`
    margin-top: 16px;
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
        <Row>
          <Typography>Price ({cartItems?.length})</Typography>
          <Price component="span">₹{price}</Price>
        </Row>

        <Row>
          <Typography>Discount ({cartItems?.length})</Typography>
          <Price component="span">-₹{discount}</Price>
        </Row>

        <Row>
          <Typography>Delivery Charges</Typography>
          <Price component="span">₹40</Price>
        </Row>

        <Divider />

        <Row sx={{ marginTop: 2, marginBottom: 0 }}>
          <TotalAmount component="span">Total Amount</TotalAmount>
          <TotalAmount component="span">₹{price - discount + 40}</TotalAmount>
        </Row>

        <Discount>You will save ₹{discount} on this order</Discount>
      </Container>
    </Box>
  );
};

export default TotalView;