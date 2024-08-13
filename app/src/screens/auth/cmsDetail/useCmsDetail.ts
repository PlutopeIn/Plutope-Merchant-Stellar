import constant from '@config/constant';
import {useResettableState} from '@hooks/useResettableState';
import Log from '@utility/log';
import axios from 'axios';
import {CmsProps} from './cmsDetailProps';
import {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthParams} from '@navigation/authStack/authStack';

const useCmsDetail = () => {
  const route = useRoute<RouteProp<AuthParams, 'cmsDetail'>>();
  const [cmsData, setCmsData, resetState, updateState] =
    useResettableState<CmsProps>({
      data: undefined,
      loading: false,
      refreshing: false,
    });

  useEffect(() => {
    getCmsDetail();
  }, []);

  const onRefreshCall = () => {
    setCmsData('refreshing', true);
    getCmsDetail();
  };

  const getCmsDetail = async () => {
    // #region Start integrating getCmsDetail api
    setCmsData('loading', true);
    try {
      const {data} = await axios.get(`${constant.commonURL}${constant.getCms}`);
      Log('getCmsDetail success', JSON.stringify(data));
      updateState({
        data: data?.data[0],
        loading: false,
        refreshing: false,
      });
    } catch (e: any) {
      setCmsData('loading', false);
      setCmsData('refreshing', false);
      Log('getCmsDetail error', e);
    }
    // #region End integrating getCmsDetail api
  };

  return {cmsData, onRefreshCall, route};
};

export default useCmsDetail;
