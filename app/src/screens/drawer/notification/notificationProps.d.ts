interface NotificationProps {
  notificationList: Array<NotificationListProps>;
  loading: boolean;
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
