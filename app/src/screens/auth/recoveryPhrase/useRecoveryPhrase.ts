import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useEffect} from 'react';
import {CaptureProtection} from 'react-native-capture-protection';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import Log from '@utility/log';
import {useResettableState} from '@hooks/useResettableState';
import {recoveryPhraseProps} from './recoveryPhraseProps';
import Snackbar from '@utility/snackbar';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Clipboard from '@react-native-clipboard/clipboard';

const RecoveryPhraseController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'recoveryPhrase'>>();
  const focus = useIsFocused();
  const [phraseData, setPhraseData, resetState] =
    useResettableState<recoveryPhraseProps>({
      minemonic: route?.params?.pharseKey,
      loading: false,
    });

  useEffect(() => {
    if (focus) {
      CaptureProtection.preventScreenRecord();
      CaptureProtection.preventScreenshot();
    } else {
      CaptureProtection.allowScreenshot();
      CaptureProtection.allowScreenRecord();
    }
  }, [focus]);

  const onContinue = async () => {
    // #region Start integrating phrase api
    setPhraseData('loading', true);
    const formData = {
      [params.id]: route?.params?.id,
      [params.phraseKey]: route?.params?.pharseKey,
    };
    try {
      const {data} = await axiosInstance.post(constant.addPhraseKey, formData);
      Log('phrase response', JSON.stringify(data));
      setPhraseData('loading', false);
      navigation.replace('setStore');
    } catch (e: any) {
      setPhraseData('loading', false);
      Snackbar(e?.data?.message);
      Log('phrase error', e);
    }
    // End integrating phrase api
  };

  const onClickCopy = () => {
    Clipboard.setString(phraseData?.minemonic);
    Snackbar('Copied to clipboard !!');
  };

  return {onContinue, phraseData, onClickCopy};
};

export default RecoveryPhraseController;
