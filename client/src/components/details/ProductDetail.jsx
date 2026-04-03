

import { Typography, Box, styled, Table, TableBody, TableRow, TableCell } from "@mui/material";
import {LocalOffer as Badge} from '@mui/icons-material';

const SmallText = styled(Box)`
    font-size:14px;
    vertical-align:baseline;
    & > p {
        font-size:14px;
        margin-top:10px;
    }
`;

const StyledBadge = styled(Badge)`
    margin-right:10px;
    color:#00CC02;
    font-size:15px;
`;

const ColumnText = styled(TableRow)`
    font-size:14px;
    vertical-align:baseline;
    & > td {
        font-size:14px;
        margin-top:10px;
        border:none;
    }
`;
const ProductDetail = ({product}) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const reviewCount = product?.reviews?.length || 0;
    const averageRating = reviewCount
        ? (product.reviews.reduce((total, review) => total + (review.rating || 0), 0) / reviewCount).toFixed(1)
        : '0.0';
    
    return (
        <>
        <Typography>{product.title.longTitle}</Typography>
                                    <Typography style={{marginTop:5,color: '#878787',fontSize:14  }}>
                                        <Box component="span" style={{display: 'inline-flex', alignItems: 'center'}}>
                                            {averageRating} Ratings & {reviewCount} Reviews
                                            <img src={fassured} alt="fassured" style={{width:77, marginLeft:20}} />
                                        </Box>
                                    </Typography>
                                    <Typography>
                                        <Box component ="span" style = {{fontSize:28}}>₹{product.price.cost} </Box>&nbsp;&nbsp;&nbsp;
                                        <Box component = "span" style ={{color: '#878787'}}><strike>₹{product.price.mrp}</strike> </Box>&nbsp;&nbsp;&nbsp;
                                        <Box component ="span" style ={{color: '#388E3C'}}>{product.price.discount}</Box>&nbsp;&nbsp;&nbsp;
                                        </Typography>
                                        <Typography> Available Offers</Typography>
                                        <SmallText>
                                            <Typography><StyledBadge />Get extra 20% off on first purchase</Typography>
                                            <Typography><StyledBadge />Get extra 13% off (price inclusive of discount) T&C </Typography>
                                            <Typography><StyledBadge /> Buy 2 items save 5%; Buy 3 or more save 10%</Typography>
                                            <Typography><StyledBadge /> Bank Offer: 10% off on ICICI Bank Credit Cards, up to ₹1500. On orders of ₹5000 and above</Typography>
                                            <Typography><StyledBadge /> Bank Offer: 10% off on HDFC Bank Credit Cards, up to ₹1500. On orders of ₹5000 and above</Typography>
                                            <Typography><StyledBadge /> Bank Offer: 10% off on Axis Bank Credit Cards, up to ₹1500. On orders of ₹5000 and above</Typography>
                                            <Typography><StyledBadge /> Bank Offer: 10% off on SBI Credit Cards, up to ₹1500. On orders of ₹5000 and above</Typography>

                                           
                                        </SmallText>
                                        <Table>
                                            <TableBody>
                                                <ColumnText>
                                                    <TableCell style={{color: '#878787'}}>Delivery</TableCell>
                                                    <TableCell style={{fontWeight:600}}>Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()} | ₹40</TableCell>
                                                </ColumnText> 
                                                <ColumnText>
                                                    <TableCell style={{color: '#878787'}}>Warranty</TableCell>  
                                                    <TableCell>No Warranty</TableCell>
                                                </ColumnText>
                                                <ColumnText>
                                                    <TableCell style={{color: '#878787'}}>Seller</TableCell>
                                                    <TableCell>
                                                        <Box component="span" style={{color: '#2874f0'}}>SuperComNet</Box>
                                                        <Typography>GST invoice available</Typography>
                                                        <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                                                    </TableCell>
                                                </ColumnText>
                                                <ColumnText>
                                                    <TableCell colSpan={2}>
                                                        <img src='https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50'style={{width:390}} alt="flipkartpoints" />
                                                    </TableCell>
                                                </ColumnText> 
                                            </TableBody>
                                              {/* { <ColumnText>
                                                    <TableCell style={{color: '#878787'}}>Description</TableCell>  
                                                    <TableCell>{product.description}</TableCell>
                                                </ColumnText>  } */}



                                        </Table>

                                            
                                     

            </>
    );
}   
export default ProductDetail;
