import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
interface Category {
  id: number;
  img: string;
  prefix: string;
  title: string;
  price: string;
}
function App() {
  const [data, setData] = useState<Category[]>([]);
  console.log(data);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);
  return (
    <Container>
      <Grid container spacing={2} mt={5}>
        {data.map((item) => {
          return (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card >
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.img}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.prefix}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
