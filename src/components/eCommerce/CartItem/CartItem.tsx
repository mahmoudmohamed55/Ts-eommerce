import {
  Paper,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { memo, useCallback, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "@store/hooks";
import { cartItemChangeQuantity, cartItemRemove } from "@store/cart/cartSlice";
import type { TProduct } from "@types";

const CartItem = memo(({ title, img, price, max, quantity, id }: TProduct) => {
  const dispatch = useAppDispatch();
  const [mount, setMount] = useState(String(quantity));

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      const newValueNumber = Number(e.target.value);
      setMount(e.target.value);

      dispatch(
        cartItemChangeQuantity({
          id,
          quantity: newValueNumber,
        })
      );
    },
    [dispatch, id]
  );

  const handleDelete = useCallback(() => {
    dispatch(cartItemRemove(id));
  }, [dispatch, id]);

  return (
    <Paper
      elevation={2}
      sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
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
          sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {price}$
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Available Quantity:</Typography>
          <Select
            size="small"
            value={mount}
            onChange={handleChange}
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
      <IconButton color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
});

export default CartItem;
