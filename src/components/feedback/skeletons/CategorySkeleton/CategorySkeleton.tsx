import { Grid } from "@mui/material";
import ContentLoader from "react-content-loader";
type CategorySkeletonProps = {
  count?: number;
};

const CategorySkeleton = ({ count = 6 }: CategorySkeletonProps) => {
  return (
    <Grid mb={5} container spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <ContentLoader
            speed={2}
            width="100%"
            height={240}
            viewBox="0 0 340 235"
            preserveAspectRatio="xMidYMid meet"
            backgroundColor="#cbc8c8"
            foregroundColor="#ecebeb"
          >
            <circle cx="170" cy="70" r="61" />
            <rect x="120" y="150" rx="4" ry="4" width="100" height="10" />
          </ContentLoader>
        </Grid>
      ))}
    </Grid>
  );
};
export default CategorySkeleton;
