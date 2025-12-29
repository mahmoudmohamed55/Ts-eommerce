import { Heading } from "@components/common";
import { Avatar, Box, Stack, Typography, Divider } from "@mui/material";
import { useAppSelector } from "@store/hooks";

export default function Account() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ my: 2 }}>
      <Heading title="Account Information" align="left"/>
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: "primary.main",
          color: "#fff",
          mb: 4,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            {user?.firstName?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={600}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography sx={{ opacity: 0.9 }}>{user?.email}</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Info Section */}
      <Box sx={{ maxWidth: 600 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              First Name
            </Typography>
            <Typography fontWeight={500}>{user?.firstName}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="body2" color="text.secondary">
              Last Name
            </Typography>
            <Typography fontWeight={500}>{user?.lastName}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="body2" color="text.secondary">
              Email Address
            </Typography>
            <Typography fontWeight={500}>{user?.email}</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
