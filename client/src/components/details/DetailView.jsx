import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { getProductDetails } from "../../redux/actions/productActions";
import ActionItem from './ActionItem.jsx';
import {Box, Typography ,Grid, styled} from '@mui/material';

const Component = styled(Box)`
    margin-top:55px;
    background : #F2F2F2;
`;
const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}));
const RightContainer = styled(Grid)`
    margin-top:50px;
    padding-left:20px;
`;
const DetailView = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const { loading, product } = useSelector(state => state.getProductDetails);

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    console.log('Product Details from Redux:', product);

    return (
       <Component>
        {
            loading ? (
                <Typography>Loading...</Typography>
            ) : (
                product && Object.keys(product).length > 0 && (
                    <Container container>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <ActionItem product={product} />
                        </Grid>

                        <RightContainer item lg={8} md={8} sm={8} xs={12}>  
                            <Typography>{product.title.longTitle}</Typography>
                            <Typography style={{marginTop:5,color: '#878787',fontSize:14  }}>
                                <Box component="span" style={{display: 'inline-flex', alignItems: 'center'}}>
                                    8 Ratings & 1 Reviews
                                    <img src={fassured} alt="fassured" style={{width:77, marginLeft:20}} />
                                </Box>
                            </Typography>
                            <Typography>
                                <Box component ="span" style = {{fontSize:28}}>₹{product.price.cost} </Box>&nbsp;&nbsp;&nbsp;
                                <Box component = "span" style ={{color: '#878787'}}><strike>₹{product.price.mrp}</strike> </Box>&nbsp;&nbsp;&nbsp;
                                <Box component ="span" style ={{color: '#388E3C'}}>{product.price.discount}</Box>&nbsp;&nbsp;&nbsp;
                                </Typography>
                          
                        </RightContainer>
                    </Container>
                )
            )
        }
       </Component>
    );
}
export default DetailView;







