export interface acceptPaymentProps {
  data: Array<FlatListProps>;
  loading: boolean;
  refreshing: boolean;
  activeTab: number;
  filterData: Array<FlatListProps>;
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
