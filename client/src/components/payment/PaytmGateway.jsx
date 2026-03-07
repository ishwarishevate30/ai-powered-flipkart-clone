import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    styled
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrapper = styled(Box)(({ theme }) => ({
    minHeight: 'calc(100vh - 70px)',
    padding: '24px 16px',
    background: 'linear-gradient(135deg, #e6f7ff 0%, #f8fcff 45%, #dff3ff 100%)',
    [theme.breakpoints.down('sm')]: {
        padding: '16px 10px'
    }
}));

const GatewayCard = styled(Paper)(({ theme }) => ({
    maxWidth: 980,
    margin: '0 auto',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(22, 94, 153, 0.15)',
    border: '1px solid #d6ebf8',
    [theme.breakpoints.down('sm')]: {
        borderRadius: 8
    }
}));

const Header = styled(Box)({
    background: '#00baf2',
    color: '#fff',
    padding: '18px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const Brand = styled(Typography)({
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 0.5
});

const Section = styled(Box)({
    background: '#fff',
    padding: '20px'
});

const Amount = styled(Typography)({
    fontSize: 32,
    color: '#022b54',
    fontWeight: 700,
    marginTop: 2
});

const ItemRow = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    padding: '10px 0',
    borderBottom: '1px dashed #e4edf5'
});

const SummaryLine = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12
});

const PaytmGateway = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = location.state?.items || [];
    const source = location.state?.source || 'checkout';

    const [method, setMethod] = useState('upi');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);

    const summary = useMemo(() => {
        const subtotal = items.reduce((total, item) => total + item.price.cost * (item.quantity || 1), 0);
        const mrpTotal = items.reduce((total, item) => total + item.price.mrp * (item.quantity || 1), 0);
        const savings = Math.max(mrpTotal - subtotal, 0);
        const delivery = items.length ? 40 : 0;

        return {
            subtotal,
            savings,
            delivery,
            total: subtotal + delivery
        };
    }, [items]);

    const openHome = () => navigate('/');

    const openCart = () => navigate('/cart');

    const handlePayment = () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            setError('Enter a valid 10 digit mobile number.');
            return;
        }

        setError('');
        setProcessing(true);

        setTimeout(() => {
            setProcessing(false);
            setPaymentDone(true);
        }, 1400);
    };

    if (!items.length) {
        return (
            <Wrapper>
                <GatewayCard>
                    <Header>
                        <Brand>Paytm</Brand>
                        <Typography variant="body2">Secure Checkout</Typography>
                    </Header>
                    <Section>
                        <Typography variant="h6" sx={{ color: '#1f3b57', mb: 1 }}>
                            No items found for payment.
                        </Typography>
                        <Typography sx={{ color: '#5c6f80', mb: 2 }}>
                            Add products to cart or choose Buy Now to continue.
                        </Typography>
                        <Button variant="contained" onClick={openHome}>
                            Go To Home
                        </Button>
                    </Section>
                </GatewayCard>
            </Wrapper>
        );
    }

    if (paymentDone) {
        return (
            <Wrapper>
                <GatewayCard>
                    <Header>
                        <Brand>Paytm</Brand>
                        <Typography variant="body2">Payment Successful</Typography>
                    </Header>
                    <Section>
                        <Typography variant="h5" sx={{ color: '#05612f', fontWeight: 700, mb: 1 }}>
                            Payment Completed
                        </Typography>
                        <Typography sx={{ color: '#49647f', mb: 3 }}>
                            Your payment of Rs {summary.total} was successful via {method.toUpperCase()}.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            <Button variant="contained" onClick={openHome}>
                                Continue Shopping
                            </Button>
                            <Button variant="outlined" onClick={openCart}>
                                Back To Cart
                            </Button>
                        </Box>
                    </Section>
                </GatewayCard>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <GatewayCard>
                <Header>
                    <Brand>Paytm</Brand>
                    <Typography variant="body2">Fast and Secure Payments</Typography>
                </Header>

                <Grid container>
                    <Grid item md={7} sm={12} xs={12}>
                        <Section>
                            <Typography variant="body2" sx={{ color: '#46627e', mb: 0.5 }}>
                                Source: {source}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#09315a', fontWeight: 700 }}>
                                Complete Your Payment
                            </Typography>
                            <Amount>Rs {summary.total}</Amount>

                            <Typography sx={{ mt: 3, mb: 1, color: '#234567', fontWeight: 600 }}>
                                Select Payment Method
                            </Typography>

                            <RadioGroup
                                value={method}
                                onChange={(event) => setMethod(event.target.value)}
                            >
                                <FormControlLabel value="upi" control={<Radio />} label="UPI / Paytm Wallet" />
                                <FormControlLabel value="card" control={<Radio />} label="Debit / Credit Card" />
                                <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                            </RadioGroup>

                            <TextField
                                fullWidth
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value.replace(/\D/g, '').slice(0, 10))}
                                label="Paytm Mobile Number"
                                placeholder="Enter 10 digit number"
                                sx={{ mt: 1, mb: 1 }}
                                error={Boolean(error)}
                                helperText={error}
                            />

                            <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
                                <Button variant="contained" onClick={handlePayment} disabled={processing}>
                                    {processing ? 'Processing...' : `Pay Rs ${summary.total}`}
                                </Button>
                                <Button variant="outlined" onClick={openCart}>
                                    Cancel
                                </Button>
                            </Box>
                        </Section>
                    </Grid>

                    <Grid item md={5} sm={12} xs={12}>
                        <Section sx={{ background: '#f8fcff', height: '100%' }}>
                            <Typography variant="h6" sx={{ color: '#09315a', fontWeight: 700, mb: 1.5 }}>
                                Order Summary
                            </Typography>

                            <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 0.5 }}>
                                {items.map((item) => (
                                    <ItemRow key={item.id}>
                                        <Box>
                                            <Typography sx={{ color: '#2e4a63', fontSize: 14 }}>
                                                {item.title.shortTitle}
                                            </Typography>
                                            <Typography sx={{ color: '#6a8299', fontSize: 12 }}>
                                                Qty: {item.quantity || 1}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: '#102b44', fontWeight: 600 }}>
                                            Rs {item.price.cost * (item.quantity || 1)}
                                        </Typography>
                                    </ItemRow>
                                ))}
                            </Box>

                            <Box sx={{ mt: 2.5 }}>
                                <SummaryLine>
                                    <Typography sx={{ color: '#526f89' }}>Subtotal</Typography>
                                    <Typography sx={{ color: '#233f59', fontWeight: 600 }}>Rs {summary.subtotal}</Typography>
                                </SummaryLine>
                                <SummaryLine>
                                    <Typography sx={{ color: '#526f89' }}>Delivery</Typography>
                                    <Typography sx={{ color: '#233f59', fontWeight: 600 }}>Rs {summary.delivery}</Typography>
                                </SummaryLine>
                                <SummaryLine>
                                    <Typography sx={{ color: '#388e3c' }}>Savings</Typography>
                                    <Typography sx={{ color: '#388e3c', fontWeight: 600 }}>- Rs {summary.savings}</Typography>
                                </SummaryLine>
                                <SummaryLine>
                                    <Typography sx={{ color: '#022b54', fontWeight: 700 }}>Total</Typography>
                                    <Typography sx={{ color: '#022b54', fontSize: 18, fontWeight: 800 }}>
                                        Rs {summary.total}
                                    </Typography>
                                </SummaryLine>
                            </Box>
                        </Section>
                    </Grid>
                </Grid>
            </GatewayCard>
        </Wrapper>
    );
};

export default PaytmGateway;
