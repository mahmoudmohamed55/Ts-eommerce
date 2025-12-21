import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Grid } from "@mui/material";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  col1: number;
  col2: number;
  emptyMessage?: string;
};

type hasID = { id?: number };

export default function GridList<T extends hasID>({
  records,
  renderItem,
  col1,
  col2,
  emptyMessage,
}: GridListProps<T>) {
  if (records.length === 0) {
    return (
      <LottieHandler type="empty" message={emptyMessage || "No items found"} />
    );
  }

  return (
    <>
      {records.map((cat) => (
        <Grid key={cat.id} size={{ xs: 12, sm: 6, md: col1, lg: col2 }}>
          {renderItem(cat)}
        </Grid>
      ))}
    </>
  );
}
