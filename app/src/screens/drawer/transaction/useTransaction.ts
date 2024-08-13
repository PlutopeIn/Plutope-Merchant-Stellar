import {useResettableState} from '@hooks/useResettableState';
import {RootState} from '@redux/type';
import Log from '@utility/log';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {detailProps} from './transactionProps';
import constant from '@config/constant';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import moment from 'moment';

const useTransactionController = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const {walletPrivateData} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  const [detail, setDetail, resetState, updateState] =
    useResettableState<detailProps>({
      transactionData: [],
      loading: false,
      refreshing: false,
      filterData: [],
      showDropdown: false,
      dropdownValue: '',
    });

  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(() => {
    if (detail?.filterData?.length != 0) {
      switch (activeTab) {
        case 1:
          updateState({...detail, transactionData: detail?.filterData});
          break;
        case 2:
          const sentFilter = detail?.filterData?.filter(
            item => item.type == 'Sent',
          );
          updateState({...detail, transactionData: sentFilter});
          break;
        case 3:
          const receiveFilter = detail?.filterData?.filter(
            item => item.type == 'Received',
          );
          updateState({...detail, transactionData: receiveFilter});
          break;

        default:
          break;
      }
    }
  }, [activeTab, detail?.filterData]);
  const refreshCall = () => {
    setDetail('refreshing', true);
    fetchTransactions();
  };
  const openDropdown = () => {
    updateState({...detail, showDropdown: !detail?.showDropdown});
  };
  const closeDropdown = (title: string) => {
    switch (title) {
      case 'Latest':
        const filterLatest = detail?.filterData.filter(item => {
          return moment().isBefore(item.created_at);
        });
        updateState({
          ...detail,
          transactionData: filterLatest,
          showDropdown: !detail?.showDropdown,
          dropdownValue: title,
        });
        break;
      case 'Oldest':
        const filterOld = detail?.filterData.filter(item => {
          return moment().isAfter(item.created_at);
        });
        updateState({
          ...detail,
          transactionData: filterOld,
          showDropdown: !detail?.showDropdown,
          dropdownValue: title,
        });
      default:
        break;
    }
  };
  const fetchTransactions = async () => {
    // #region Start integrating fetchTransaction api
    setDetail('loading', true);
    const accountId = walletPrivateData?.publicKey;
    const server = new StellarSdk.Server(url);
    try {
      let transactions = [];
      let response = await server.transactions().forAccount(accountId).call();
      transactions = response.records;

      // Handle pagination
      while (response.records.length > 0) {
        response = await response.next();
        transactions = transactions.concat(response.records);
      }
      const finalDataArray: any = [];
      // Fetch all operations for all transactions concurrently
      const fetchOperationsPromises = transactions.map(async (tx: any) => {
        let operationsResponse = await server
          .operations()
          .forTransaction(tx?.hash)
          .call();
        let operations = operationsResponse?.records;
        while (operationsResponse?.records?.length > 0) {
          operationsResponse = await operationsResponse.next();
          operations = operations.concat(operationsResponse?.records);
        }
        return {tx, operations};
      });

      const allOperations = await Promise.all(fetchOperationsPromises);
      // Process operations for each transaction
      allOperations.forEach(({tx, operations}: any) => {
        operations.forEach((op: any) => {
          if (op?.type === 'payment') {
            const transactionType =
              op?.from === accountId ? 'Sent' : 'Received';
            const counterparty = transactionType === 'Sent' ? op?.to : op?.from;
            const finalData = {
              transactionHash: tx?.hash,
              operationId: op?.id,
              amount: op?.amount,
              type: transactionType,
              counterparty: counterparty,
              created_at: tx?.created_at,
            };
            finalDataArray.push(finalData);
          }
        });
      });
      Log('fetchTransaction Success:', finalDataArray);
      updateState({
        ...detail,
        transactionData: finalDataArray?.reverse(),
        filterData: finalDataArray?.reverse(),
        loading: false,
        refreshing: false,
        dropdownValue: '',
      });
    } catch (e) {
      setDetail('loading', false);
      setDetail('refreshing', false);
      Log('fetchTransaction Error:', e);
    }
    // #region End integrating fetchTransaction api
  };
  return {
    activeTab,
    setActiveTab,
    detail,
    refreshCall,
    openDropdown,
    closeDropdown,
  };
};

export default useTransactionController;
