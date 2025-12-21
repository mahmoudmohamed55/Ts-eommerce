import { Grid } from "@mui/material";
import ContentLoader from "react-content-loader";

type ProductSkeletonProps = {
  count: number;
};
const ProductSkeleton = ({ count }: ProductSkeletonProps) => {
  return (
    <Grid mb={5} container spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ContentLoader
            speed={2}
            width="100%"
            height={420}
            viewBox="0 0 300 420"
            preserveAspectRatio="xMidYMid meet"
            backgroundColor="#cbc8c8"
            foregroundColor="#ecebeb"
          >
            <rect x="70" y="20" rx="20" ry="8" width="160" height="150" />

            <circle cx="260" cy="40" r="10" />

            <rect x="80" y="210" rx="4" ry="4" width="150" height="14" />

            <rect x="110" y="240" rx="4" ry="4" width="80" height="14" />

            <rect x="95" y="270" rx="4" ry="4" width="110" height="12" />

            <rect x="70" y="300" rx="6" ry="6" width="160" height="36" />
          </ContentLoader>
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductSkeleton;
