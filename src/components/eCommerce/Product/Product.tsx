import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import type { TProduct } from "../../../types/product.types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";

export default function Product({ title, img, price, id }: TProduct) {
  const dispatch = useAppDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(id));
  };
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt={title}
          sx={{
            width: 140,
            height: 140,

            margin: "16px auto 8px",
            objectFit: "contain",
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textAlign: "center", textTransform: "capitalize" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
          >
            ${price}
          </Typography>

          {/* زر Add to Cart */}
          <Button
            onClick={addToCartHandler}
            variant="contained"
            color="primary"
            sx={{ mt: "auto" }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
