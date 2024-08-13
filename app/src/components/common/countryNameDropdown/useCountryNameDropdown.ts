import {useCallback, useEffect, useState} from 'react';
import {DataProps, userStateProps} from './countryNameDropdownProps';

const useCountryNameModal = (data: Array<any>) => {
  const [userState, setUserState] = useState<userStateProps>({
    search: '',
    openCodeModal: false,
    dropdownData: [],
  });
  useEffect(() => {
    updateUserStateValue('dropdownData', data);
  }, [data, userState?.openCodeModal]);
  const updateUserStateValue = useCallback(
    (key: string, value: string | boolean | Object) => {
      setUserState(prevState => ({...prevState, [key]: value}));
    },
    [userState],
  );

  const handleSearch = useCallback(
    (text: string) => {
      updateUserStateValue('search', text);
      const filter = data?.filter((item: DataProps) => {
        const itemData = item?.name;
        const textData = text.toLowerCase();
        return itemData.toLowerCase().includes(textData);
      });
      updateUserStateValue('dropdownData', filter);
    },
    [userState?.search],
  );

  return {
    handleSearch,
    userState,
    updateUserStateValue,
  };
};

export default useCountryNameModal;
