export interface detailProps {
  transactionData: Array<transactionProps>;
  loading: boolean;
  refreshing: boolean;
}

export interface transactionProps {
  transactionHash: string | undefined;
  operationId: string | undefined;
  amount: string | undefined;
  type: string | undefined;
  counterparty: string | undefined;
  created_at: string | undefined;
  assetCode: string | undefined;
}
