import {useNavigation} from '@react-navigation/native';

const useEditDetailsController = () => {
  const navigation = useNavigation<any>();

  const onClick = (screen: string | undefined) => {
    navigation.navigate(screen);
  };
  return {onClick};
};

export default useEditDetailsController;
