import { Grid, Typography } from "@mui/material";
type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  col1: number;
  col2: number;
};
type hasID = { id?: number };
export default function GridList<T extends hasID>({
  records,
  renderItem,
  col1,
  col2,
}: GridListProps<T>) {
  const categoriesList =
    records.length > 0 ? (
      records.map((cat) => (
        <Grid key={cat.id} size={{ xs: 12, sm: 6, md: col1, lg: col2 }}>
          {renderItem(cat)}
        </Grid>
      ))
    ) : (
      <Typography variant="h6" textAlign="center">
        There are no Categories
      </Typography>
    );
  return categoriesList;
}
