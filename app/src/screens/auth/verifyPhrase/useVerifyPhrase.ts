import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {generateWallet} from '@coingrig/wallet-generator';
import Snackbar from 'react-native-snackbar';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';

const VerifyPhraseController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'verifyPhrase'>>();
  let originalData: string[] = route?.params?.minemonic?.split(' ');
  const [shuffelData, setShuffelData] = useState<string[]>([]);
  const [indexVal, setIndexVal] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [minemonicData, setMimemonicData] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  useEffect(() => {
    shuffelArray();
  }, []);

  const shuffelArray = () => {
    let array: string[] = route?.params?.minemonic?.split(' ');
    let currentIndex = array?.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setShuffelData(array);
  };

  const onItemPress = (item: string, index: number) => {
    let temp = [...minemonicData];
    temp[indexVal] = item;
    setMimemonicData(temp);
    shuffelData?.splice(index, 1);
    setShuffelData([...shuffelData]);
    setTimeout(() => {
      originalData.map((value: any, key: number) => {
        if (temp[key]) {
          if (originalData[key] == temp[key]) {
            if (key == 11) {
              setError('Well Done');
            }
          } else {
            setError('Invalid Order');
          }
        }
      });
    }, 1000);
    setIndexVal(indexVal + 1);
  };

  const onSelectedWord = (item: string, index: number) => {
    if (item) {
      shuffelData.push(item);
      minemonicData.splice(index, 1);
      minemonicData.push('');
      setMimemonicData([...minemonicData]);
      setIndexVal(indexVal - 1);
      setError(undefined);
    }
  };

  const onDone = () => {
    navigation.navigate('kybProcess');
    if (error == 'Well Done') {
      generateWallet(route?.params?.minemonic, 'ETH')
        .then(res => {
          const json = JSON.parse(res);
          let data = {
            minemonic: route?.params?.minemonic,
            walletAddress: json?.address,
            privateKey: json?.privateKey,
            name: `Main Wallet ${Math.floor(
              Math.random() * (999 - 100 + 1) + 100,
            )}`,
            type: 'wallet',
          };
          navigation.navigate('kybProcess');
        })
        .catch(e => {
          Snackbar.show({text: 'Invalid Minemonic'});
        });
    }
  };

  return {
    onDone,
    shuffelData,
    minemonicData,
    onItemPress,
    onSelectedWord,
    error,
  };
};

export default VerifyPhraseController;
