import { Grid, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <Grid mt={3} container spacing={2}>

      <Grid size={{ xs: 12, md: 3 }}>
        <Paper elevation={1}>
          <List sx={{ p: 1 }}>
            <ListItemButton
              component={NavLink}
              to=""
              end
              sx={{
                mb: 1,
                borderRadius: 2,
                px: 2,
                py: 1.2,
                transition: "all 0.2s ease",
                "&.active": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemText primary="Account Info" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="orders"
              sx={{
                mb: 1,
                borderRadius: 2,
                px: 2,
                py: 1.2,
                transition: "all 0.2s ease",
                "&.active": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                },
             
              }}
            >
              <ListItemText primary="Orders" />
            </ListItemButton>
          </List>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ProfileLayout;
