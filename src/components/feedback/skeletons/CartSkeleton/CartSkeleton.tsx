import { Stack } from "@mui/material";
import ContentLoader from "react-content-loader";

const CartSkeleton = ({ count }: { count: number }) => {
  return (
    <Stack gap={2}>
      {Array.from({ length: count }, (_, i) => (
        <ContentLoader
          key={i}
          speed={2}
          width="100%"
          height={100}
          viewBox="0 0 600 100"
          backgroundColor="#cbc8c8"
          foregroundColor="#ecebeb"
        >
          <rect x="10" y="10" rx="8" ry="8" width="80" height="80" />

          <rect x="110" y="15" rx="4" ry="4" width="200" height="14" />

          <rect x="110" y="40" rx="4" ry="4" width="80" height="14" />

          <rect x="110" y="65" rx="4" ry="4" width="60" height="20" />

          <rect x="550" y="35" rx="4" ry="4" width="20" height="20" />
        </ContentLoader>
      ))}
    </Stack>
  );
};
export default CartSkeleton;
