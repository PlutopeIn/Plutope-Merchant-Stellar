export interface PropType {
  item: FlatListProps;
  index: number;
  onClick?: () => void;
}

interface FlatListProps {
  id: number;
  image: React.JSX;
  label: string | undefined;
}
