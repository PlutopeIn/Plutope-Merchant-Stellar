import {useEffect} from 'react';
import {FaqProps} from './helpSupportProps';
import constant from '@config/constant';
import axios from 'axios';
import Log from '@utility/log';
import {useResettableState} from '@hooks/useResettableState';
import {axiosInstance} from '@api/api';

const useHelpSupport = () => {
  const [faq, setFaq, resetState] = useResettableState<FaqProps>({
    selectedItemIndex: null,
    loading: false,
    refreshing: false,
    faqData: [],
    staticFaqData: [],
    linkData: '',
    search: '',
  });

  useEffect(() => {
    getFaq();
    getLink();
  }, []);

  const onPress = (itemIndex: number) => {
    setFaq(
      'selectedItemIndex',
      faq?.selectedItemIndex == itemIndex ? -1 : itemIndex,
    );
  };

  const refreshCall = () => {
    setFaq('refreshing', true);
    getFaq();
    getLink();
  };

  const handleSearch = (text: string) => {
    setFaq('search', text);
    const filterData = faq?.staticFaqData?.filter((item: any) => {
      return item?.title.toUpperCase().indexOf(text.toUpperCase()) !== -1;
    });
    setFaq('faqData', filterData);
  };

  const getFaq = async () => {
    // #region Start integrating getFaq api
    setFaq('loading', true);
    try {
      const {data} = await axios.get(
        `${constant.commonURL}${constant.getAllFaq}`,
      );
      Log('getFaq success', JSON.stringify(data));
      setFaq('faqData', data?.data);
      setFaq('staticFaqData', data?.data);
      setFaq('refreshing', false);
      setFaq('loading', false);
    } catch (e: any) {
      setFaq('loading', false);
      setFaq('refreshing', false);
      Log('getFaq error', e);
    }
    // #region End integrating getAllCategory api
  };

  const getLink = async () => {
    // #region Start integrating getLink api
    setFaq('loading', true);
    try {
      const {data} = await axiosInstance.get(`${constant.getContactDetails}`);
      Log('getLink success', JSON.stringify(data));
      setFaq('linkData', data?.data);
      setFaq('refreshing', false);
    } catch (e: any) {
      setFaq('refreshing', false);
      Log('getLink error', e);
    }
    // #region End integrating getLink api
  };

  return {faq, onPress, refreshCall, handleSearch};
};

export default useHelpSupport;
