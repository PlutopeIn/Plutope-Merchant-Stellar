export interface PropType {
  item: FlatListProps;
  index: number;
  onClick?: () => void;
}

interface FlatListProps {
  id: number;
  label: string | undefined;
}
