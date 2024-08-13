import {axiosInstance} from '@api/api';
import Log from './log';
import {useAppSelector} from './useReduxHooks';
import constant from '@config/constant';
import params from '@config/params';

export const sendPayload = async (
  fromAddress: string,
  toAddress: string,
  amount: string,
  transactionHash: string,
  assetType: string,
  type: string,
) => {
  // console.log('call function ======');
  const {token} = useAppSelector(state => state.userReducer);
  let formData = {
    [params.fromAddress]: fromAddress,
    [params.toAddress]: toAddress,
    [params.amount]: amount,
    [params.transactionHash]: transactionHash,
    [params.assetType]: assetType,
    [params.type]: type,
  };
  // console.log('call function step 1 ======', formData);
  try {
    // console.log('call function step 2 ======');
    const {data} = await axiosInstance.post(
      constant.sendPushNotification,
      formData,
      {
        headers: {
          auth: token,
        },
      },
    );
    console.log('send notification data:::', data?.data);
  } catch (error) {
    console.log('error send notification data:::', error);
  }
};
