import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
interface IProps {
  title: string;
  img: string;
  prefix?: string;
}

export default function Category({ title, img ,prefix}: IProps) {
  return (
    <Link to={`/categories/products/${prefix}`}>
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
            image={img}
            alt={title}
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
              sx={{ textAlign: "center", textTransform: "capitalize" }}
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
