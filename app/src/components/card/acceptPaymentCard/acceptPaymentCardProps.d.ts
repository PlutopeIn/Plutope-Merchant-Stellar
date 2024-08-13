export interface PropType {
  item: FlatListProps;
  index: number;
  onClick?: () => void;
  onCancelClick: () => void;
}

interface FlatListProps {
  _id?: string;
  requestFrom?: string;
  amount?: number;
  currency?: string;
  message?: string;
  link?: string;
  userId?: string;
  status?: string;
  isDeleted: false;
  memoId?: string;
  fromAddress?: string;
  createdAt?: string;
  updatedAt?: string;
  shareLink?: string;
  transactionID?: string;
}
