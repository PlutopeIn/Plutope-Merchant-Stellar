export interface PropType {
  item?: FlatListProps;
  index?: number;
  onPress?: () => void;
  showDetail?: boolean;
}

interface FlatListProps {
  _id: number;
  title: string | undefined;
  description: string | undefined;
}
