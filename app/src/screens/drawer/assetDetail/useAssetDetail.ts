import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import constant from '@config/constant';
import {useResettableState} from '@hooks/useResettableState';
import {detailProps} from './assetDetailProps';
import Log from '@utility/log';
import axios from 'axios';
import params from '@config/params';
import {axiosInstance} from '@api/api';

const useAssetDetail = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'assetDetail'>>();
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
    });
  const [data, setData] = useState<any>([]);
  const [graphLoader, setGraphLoader] = useState(false);
  const [activeIndex, setActiveIndex] = useState('1');
  const [timeData, setTimeData] = useState([]);
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [mainBalance, setMainBalance] = useState<number>(0);
  const [reserveBalance, setReserveBalance] = useState<number>(0);
  useEffect(() => {
    // onDayChange('1', '1D');
    // onTimeChange('1D');
    fetchTransactions();
    getBalance();
    calculateReservedBalance();
    setMainBalance(route?.params?.data?.balance * 1);
  }, []);
  const getBalance = async () => {
    try {
      const {data} = await axiosInstance.get(constant.coinGeckoCurrency);
      let final = data?.filter(
        (item: any) =>
          item.symbol?.toUpperCase() ==
          route?.params?.data?.code?.toUpperCase(),
      );
      let balanceNew =
        parseFloat(final[0]?.current_price) *
        parseFloat(route?.params?.data?.balance);

      setFinalBalance(balanceNew);
    } catch (error) {
      Log('err', error);
    }
  };

  const refreshCall = () => {
    setDetail('refreshing', true);
    fetchTransactions();
  };

  const onDayChange = (id: string, days: string) => {
    setActiveIndex(id);
    onTimeChange(days);
    let startTime: any;
    let endTime: any;
    if (route?.params?.data?.code != 'XLM') {
      const now = new Date();
      if (days == '1D' || days == 'ALL') {
        startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds(),
        ).getTime();
        endTime = now.getTime();
      } else if (days == '1W') {
        startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7,
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds(),
        ).getTime();
        endTime = now.getTime();
      } else if (days == '1M') {
        const targetDay = now.getDate();
        const targetHour = now.getHours();
        const targetMinute = now.getMinutes();
        let startYear = now.getFullYear();
        let startMonth = now.getMonth() - 1;
        if (startMonth < 0) {
          startMonth = 11;
          startYear--;
        }
        startTime = new Date(
          startYear,
          startMonth,
          targetDay,
          targetHour,
          targetMinute,
          0,
          0,
        ).getTime();
        endTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          targetDay,
          targetHour,
          targetMinute,
          0,
          0,
        ).getTime();
      } else if (days == '1Y') {
        const targetHour = now.getHours();
        const targetMinute = now.getMinutes();
        startTime = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
          targetHour,
          targetMinute,
          0,
          0,
        ).getTime();
        endTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          targetHour,
          targetMinute,
          0,
          0,
        ).getTime();
      }
    } else {
      let tempCode = route?.params?.data?.code;
      const currentTimestamp =
        tempCode == 'XLM' ? Math.floor(Date.now() / 1000) : Date.now();
      endTime = currentTimestamp;
      if (days == '1D' || days == 'ALL') {
        const oneDayInSeconds = 86400; // Number of seconds in a day
        const startTime1D = currentTimestamp - oneDayInSeconds;
        startTime = startTime1D;
      } else if (days == '1W') {
        const oneWeekInSeconds = 7 * 86400;
        const startTime1W = currentTimestamp - oneWeekInSeconds;
        startTime = startTime1W;
      } else if (days == '1M') {
        const oneMonthInSeconds = 30 * 24 * 60 * 60;
        const startTime1Month = currentTimestamp - oneMonthInSeconds;
        startTime = startTime1Month;
      } else if (days == '1Y') {
        const currentDate = new Date(currentTimestamp * 1000);
        const startDate = new Date(currentDate);
        startDate.setFullYear(startDate.getFullYear() - 1);
        const startTime1Year = Math.floor(startDate.getTime() / 1000);
        startTime = startTime1Year;
      }
    }
    setGraphLoader(true);
    fetchGraphData(startTime, endTime);
  };

  const onTimeChange = (days: string) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let startTime = `${hours}:${minutes}`;
    if (days == '1D' || days == 'ALL') {
      const hourDifferences = [3, 4, 4, 4, 4, 4];
      const intervals: any = [];
      let [startHours, startMinutes] = startTime.split(':').map(Number);
      startMinutes = 0;
      startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes
        .toString()
        .padStart(2, '0')}`;
      intervals.push(startTime);
      hourDifferences.forEach(diff => {
        startHours = (startHours + diff) % 24;
        const time = `${startHours.toString().padStart(2, '0')}:${startMinutes
          .toString()
          .padStart(2, '0')}`;
        intervals.push(time);
      });
      intervals.push(startTime);
      setTimeData(intervals);
    } else if (days == '1W') {
      const now = new Date();
      const currentDay = now.toLocaleString('en-US', {weekday: 'short'});
      const dayLabels: any = [];
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const startDayIndex = daysOfWeek.indexOf(currentDay);
      for (let i = 0; i < 7; i++) {
        const dayIndex = (startDayIndex + i) % 7;
        dayLabels.push(daysOfWeek[dayIndex]);
      }
      dayLabels.push(daysOfWeek[startDayIndex]);
      setTimeData(dayLabels);
    } else if (days == '1M') {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      now.setDate(5);
      const dayDifferences = [5, 5, 5, 5, 5, 5];
      const intervals: any = [];
      let currentDate = new Date(now);
      const formatDate = (date: any) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}`;
      };
      intervals.push(formatDate(currentDate));
      dayDifferences.forEach(diff => {
        currentDate.setDate(currentDate.getDate() + diff);
        intervals.push(formatDate(currentDate));
      });
      setTimeData(intervals);
    } else if (days == '1Y') {
      const now = new Date();
      const currentMonth = now.getMonth();
      const monthsPattern = [currentMonth];
      for (let i = 1; i < 5; i++) {
        const nextMonth = (currentMonth + i * 2) % 12;
        monthsPattern.push(nextMonth);
      }
      monthsPattern.push(monthsPattern[0]);
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const intervals: any = monthsPattern.map(
        monthIndex => monthNames[monthIndex],
      );
      setTimeData(intervals);
    }
  };

  const fetchGraphData = async (startTime: any, endTime: any) => {
    const url =
      route?.params?.data?.code == 'XLM'
        ? `https://lobstr.co/api/new-exchange-rates/?page_size=all&currency=INR&end_timestamp=${endTime}&start_timestamp=${startTime}`
        : `https://horizon.stellar.lobstr.co/trade_aggregations?base_asset_type=credit_alphanum4&base_asset_code=${route?.params?.data?.code}&base_asset_issuer=${route?.params?.data?.issuer}&counter_asset_type=native&start_time=${startTime}&end_time=${endTime}&resolution=900000&offset=0&limit=200`;
    try {
      const {data} = await axios.get(url);
      let temp: any = [];
      if (route?.params?.data?.code != 'XLM') {
        temp = data?._embedded?.records
          ?.filter(
            (item: any) =>
              item?.timestamp !== undefined && item?.avg !== undefined,
          )
          ?.map((item: any) => ({
            timestamp: item?.timestamp,
            value: Number(item?.avg),
          }));
      } else {
        temp = data?.results?.map((item: any) => {
          return {
            timestamp: item?.timestamp,
            value: item?.reverse_rate,
          };
        });
      }
      setData(temp);
      setGraphLoader(false);
      Log('graphData', temp);
    } catch (e: any) {
      setGraphLoader(false);
      Log('fetchGraphData error', e);
    }
  };
  const calculateReservedBalance = async () => {
    try {
      // Fetch the account details from the Stellar network
      const accountId = walletPrivateData?.publicKey;
      const server = new StellarSdk.Server(url);
      const account = await server.loadAccount(accountId);

      // Base reserve per entry in the Stellar ledger (as of now, it is 0.5 XLM per entry)
      const baseReserve = 0.5;

      // Calculate the reserved balance
      const reservedBalance = baseReserve * (2 + account.subentry_count);
      Log('reserve::::', reservedBalance);
      setReserveBalance(reservedBalance);
    } catch (error) {
      Log('Error fetching account details:', error);
      throw error;
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
      var finalFilter: Array<any> = [];
      allOperations.forEach(({tx, operations}: any) => {
        getUpdatedStatus(tx?.memo == undefined ? '' : tx?.memo, tx?.hash);
        operations.forEach((op: any) => {
          let transactionType = op?.from === accountId ? 'Sent' : 'Received';
          let counterparty = transactionType === 'Sent' ? op?.to : op?.from;
          let assetCode = op?.asset_code ? op?.asset_code : 'XLM';
          finalFilter.push({
            transactionHash: tx?.hash,
            operationId: op?.id,
            amount: op?.amount,
            type: transactionType,
            counterparty: counterparty,
            created_at: tx?.created_at,
            assetCode: assetCode,
          });
        });
      });
      updateState({
        ...detail,
        transactionData: finalFilter
          .filter(
            item =>
              item &&
              item.assetCode == route?.params?.data?.code &&
              item.amount,
          )
          ?.reverse(),
        loading: false,
        refreshing: false,
      });
    } catch (e) {
      setDetail('loading', false);
      setDetail('refreshing', false);
      Log('fetchTransaction Error:', e);
    }
    // #region End integrating fetchTransaction api
  };

  const getUpdatedStatus = async (memo: string, transactionHash: string) => {
    // #region Start integrating getUpdatedStatus api
    const formData = {
      [params.memoId]: memo,
      [params.transactionID]: transactionHash,
    };
    try {
      const {data} = await axios.post(
        `${constant.commonURL}${constant.updateTransactionStatus}`,
        formData,
      );
      Log('getUpdatedStatus success', JSON.stringify(data));
    } catch (e: any) {
      Log('getUpdatedStatus error', e);
    }
    // #region End integrating getUpdatedStatus api
  };

  const onSend = () => {
    // console.log('route?.params?.data', route?.params?.data);
    navigation.navigate('scanner', {data: route?.params?.data});
  };

  const onReceive = () => {
    // navigation.navigate('myQrPayment');
    navigation.navigate('receivePayment', {
      screen: 'receiveAsset',
      data: route?.params?.data,
    });
  };

  const onSell = () => {
    navigation.navigate('sell');
  };

  const onBuy = () => {
    navigation.navigate('buy');
  };

  return {
    onSend,
    onReceive,
    route,
    onSell,
    detail,
    refreshCall,
    onBuy,
    data,
    graphLoader,
    onDayChange,
    activeIndex,
    timeData,
    finalBalance,
    mainBalance,
    reserveBalance,
  };
};

export default useAssetDetail;
