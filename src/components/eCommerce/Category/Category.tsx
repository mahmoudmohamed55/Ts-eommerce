import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface Cat {
  id: number;
  title: string;
  prefix: string;
  img: string;
}

export default function Category() {
  const [data, setData] = useState<Cat[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/category")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid my={5} container spacing={2}>
      {data.map((cat) => (
        <Grid  size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cat.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <CardActionArea sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={cat.img}
                alt={cat.title}
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  margin: "16px auto 8px",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "center" ,textTransform:"capitalize"}}
                >
                  {cat.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
