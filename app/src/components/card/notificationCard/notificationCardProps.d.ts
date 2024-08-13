export interface PropType {
  item: NotificationListProps;
  index: number;
  onClick?: () => void;
}

interface NotificationListProps {
  _id?: string;
  userId?: string;
  title?: string;
  fromAddress?: string;
  toAddress?: string;
  transactionHash?: string;
  amount?: string;
  message?: string;
  readUnread: false;
  type?: string;
  assetType?: string;
  notificationType?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DetailFlatListProps {
  id: number;
  image: React.JSX;
  text: string | undefined;
  time: string | undefined;
}
