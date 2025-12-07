import { Grid, Typography } from "@mui/material";
type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};
type hasID = { id?: number };
export default function GridList<T extends hasID>({
  records,
  renderItem,
}: GridListProps<T>) {
  const categoriesList =
    records.length > 0 ? (
      records.map((cat) => (
        <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
