import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
import CheckAdmin from "../../auth/CheckAdmin";
const EmptyStockProducts = (props) => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [deleted, setDeleted] = React.useState(false);
  const apiGETproducts = () => {
    productService
      .getAllProducts()
      .then(function (data) {
        //   console.log(data[0].image.data);
        setProducts(data);
        setDeleted(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(apiGETproducts, [deleted]);
  return (
    <CheckAdmin>
      <div>
        <Grid container>
          <Grid item xs={12} md={6} lg={4}></Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper>
              <Typography
                variant="h3"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                Update Stock
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}></Grid>
        </Grid>
        <Grid container spacing={1} align="center" justify="center">
          {products.map((product, index) => {
            return product.stock == 0 ? (
              <RecipeReviewCard
                badge={props.badge}
                setbadge={props.setbadge}
                key={index}
                image={product.image.data}
                stock={product.stock}
                product={product}
                setDeleted={setDeleted}
              ></RecipeReviewCard>
            ) : (
              <span key={index}></span>
            );
          })}
        </Grid>
      </div>
    </CheckAdmin>
  );
};
export default EmptyStockProducts;
