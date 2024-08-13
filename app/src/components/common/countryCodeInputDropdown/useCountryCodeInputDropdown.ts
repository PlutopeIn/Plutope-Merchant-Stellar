import {countryCodes} from '@utility/countryCodes.const';
import {useCallback, useEffect, useState} from 'react';

const useCountryCodeModal = () => {
  const [userState, setUserState] = useState({
    search: '',
    filterData: countryCodes,
    openCodeModal: false,
  });

  useEffect(() => {
    updateUserStateValue('filterData', countryCodes);
  }, [countryCodes, userState?.openCodeModal]);

  const updateUserStateValue = useCallback(
    (key: string, value: string | boolean | Object) => {
      setUserState(prevState => ({...prevState, [key]: value}));
    },
    [userState],
  );

  const handleSearch = useCallback(
    (text: string) => {
      updateUserStateValue('search', text);
      const filter = countryCodes?.filter((item: any) => {
        const itemData = item?.country_name;
        const textData = text.toLowerCase();
        return itemData.toLowerCase().includes(textData);
      });
      updateUserStateValue('filterData', filter);
    },
    [userState?.search],
  );

  return {
    handleSearch,
    updateUserStateValue,
    userState,
  };
};

export default useCountryCodeModal;
