import {
  Paper,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TProduct } from "../../../types/product.types";

export default function CartItem({
  title,
  img,
  price,
  max,
  quantity,
}: TProduct) {
 

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        component="img"
        src={img}
        alt={title}
        sx={{
          width: "20%",
          height: "100px",
          objectFit: "contain",
          borderRadius: "8px",
          mr: 4,
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {price}$
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Qty:</Typography>
          <Select
            size="small"
            value={quantity}
            onChange={() => {}}
            sx={{ width: 70 }}
          >
            {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <IconButton color="error" onClick={() => {}}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
