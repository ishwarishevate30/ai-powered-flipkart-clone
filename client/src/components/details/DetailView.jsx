import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";
import ReviewIntelligence from "./ReviewIntelligence";

import { Box, Typography, Grid, styled } from "@mui/material";

const Component = styled(Box)`
  margin-top: 55px;
  background: #f2f2f2;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#ffffff",
  display: "flex",
  padding: "20px",
  [theme.breakpoints.down("md")]: {
    margin: 0
  }
}));

const RightContainer = styled(Grid)`
  padding-left: 25px;

  & > p {
    margin-top: 10px;
  }
`;

const ReviewSection = styled(Box)`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 20px;
`;

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product } = useSelector(
    (state) => state.getProductDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <Component>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        product &&
        Object.keys(product).length > 0 && (
          <>
            <Container container>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <ActionItem product={product} />
              </Grid>

              <RightContainer item lg={8} md={8} sm={12} xs={12}>
                <ProductDetail product={product} />
              </RightContainer>
            </Container>

            <ReviewSection>
              <ReviewIntelligence productId={product.id} />
            </ReviewSection>
          </>
        )
      )}
    </Component>
  );
};

export default DetailView;



