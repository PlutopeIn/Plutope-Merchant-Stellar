export interface PropType {
  item: TransactionProps;
  index: number;
}

export interface TransactionProps {
  transactionHash: string | undefined;
  operationId: string | undefined;
  amount: string | any;
  type: string | undefined;
  counterparty: string | undefined;
  created_at: string | undefined;
  assetCode: string | undefined;
}
