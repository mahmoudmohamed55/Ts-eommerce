import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  prefix: string;
  img: string;
  price: string;
  max: number;
}

export default function Product() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:3001/products")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid container spacing={2} my={5}>
      {data.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
          <Card sx={{ height: "100%" }}>
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                "&:hover": {
                  backgroundColor: "#f5f5f5", // اللون الغامق الخفيف عند hover
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
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
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
                >
                  ${item.price}
                </Typography>

                {/* زر Add to Cart */}
                <Button variant="contained" color="primary" sx={{ mt: "auto" }}>
                  Add to Cart
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
