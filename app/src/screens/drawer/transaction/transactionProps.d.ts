export interface detailProps {
  transactionData: Array<transactionProps>;
  loading: boolean;
  refreshing: boolean;
  filterData: Array<transactionProps>;
  showDropdown: boolean;
  dropdownValue: string;
}

export interface transactionProps {
  transactionHash: string | undefined;
  operationId: string | undefined;
  amount: string | undefined;
  type: string | undefined;
  counterparty: string | undefined;
  created_at: string | undefined;
}
