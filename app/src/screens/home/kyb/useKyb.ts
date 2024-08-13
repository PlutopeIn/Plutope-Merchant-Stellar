import {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {ErrorProps, image, kybDetailProps} from './kybProps';
import {countryCodes} from '@utility/countryCodes.const';
import {useResettableState} from '@hooks/useResettableState';
import validationMessage from '@utility/validation/validationMessage';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import {
  checkCompanyName,
  checkUniqueCode,
} from '@utility/validation/validation';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import {
  kybSuccess,
  loginSuccess,
  walletPrivateDataSuccess,
} from '@redux/user/userSlice';
import {useAppDispatch} from '@utility/useReduxHooks';
import ImageCropPicker from 'react-native-image-crop-picker';

const kybController = () => {
  const route = useRoute<RouteProp<AuthParams, 'kyb'>>();
  const dispatch = useAppDispatch();
  const {signupDetails} = useSelector((state: RootState) => state.userReducer);
  const navigation = useNavigation<AuthNavigationProps>();
  const [kybDetail, setKybDetail, resetState] =
    useResettableState<kybDetailProps>({
      country: '',
      companyName: '',
      taxId: '',
      businessId: '',
      countryData: [],
      loading: false,
      businessPhoto: undefined,
    });
  const [errorObject, setErrorObject] = useState<ErrorProps>({
    countryError: undefined,
    companyNameError: undefined,
    taxIdError: undefined,
    businessIdError: undefined,
    businessPhotoError: undefined,
  });

  useEffect(() => {
    const tempCountry = countryCodes.map(item => {
      return {name: `${item.country_name}`};
    });
    setKybDetail('countryData', tempCountry);
  }, []);

  const validation = (): void => {
    let isValid = true;

    if (!kybDetail?.companyName) {
      isValid = false;
      errorObject.companyNameError = validationMessage.emptyCompanyName;
    } else if (!checkCompanyName(kybDetail?.companyName)) {
      isValid = false;
      errorObject.companyNameError = validationMessage.invalidCompanyName;
    } else if (kybDetail?.companyName?.length < 2) {
      isValid = false;
      errorObject.companyNameError = validationMessage.companyNameLength;
    } else {
      errorObject.companyNameError = '';
    }
    if (!kybDetail?.businessId) {
      isValid = false;
      errorObject.businessIdError = validationMessage.emptyBusinessId;
    } else if (!checkUniqueCode(kybDetail?.businessId)) {
      isValid = false;
      errorObject.businessIdError = validationMessage.invalidBusinessId;
    } else {
      errorObject.businessIdError = '';
    }
    if (!kybDetail?.businessPhoto) {
      isValid = false;
      errorObject.businessPhotoError = validationMessage.emptyBusinessPhoto;
    } else {
      errorObject.businessPhotoError = '';
    }

    setErrorObject({...errorObject});
    if (isValid) {
      kybApiCall();
    }
  };
  const uploadPhoto = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      height: 300,
      width: 400,
      cropping: false,
    })
      .then(image => {
        setKybDetail('businessPhoto', image.path);
      })
      .catch(e => {});
  };

  const kybApiCall = async () => {
    // #region Start integrating kyb api
    setKybDetail('loading', true);
    let formData = new FormData();
    formData.append(params.companyName, kybDetail?.companyName);
    formData.append(params.businessId, kybDetail?.businessId);
    formData.append(params.userId, signupDetails?._id);
    formData.append(params.image, {
      name: `image${Date.now()}.png`,
      uri: kybDetail?.businessPhoto,
      type: 'image/png',
    });
    try {
      const {data} = await axiosInstance.post(constant.userKyb, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Log('data.data', data?.data);
      Log('kyb response', JSON.stringify(data));
      decryptKey(data?.data?.getUser);
      Snackbar(data?.message);
      dispatch(loginSuccess(data?.data));
      dispatch(kybSuccess(data?.data?.getKybDetails?.kybStatus));
    } catch (e: any) {
      setKybDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('kyb error', e);
    }
    // End integrating kyb api
  };

  const decryptKey = async (keys: any) => {
    // #region Start integrating decryptKey api
    Log(keys, 'keys');
    const formData = {
      [params.secretKey]: keys?.secretKey,
    };
    try {
      const {data} = await axiosInstance.post(constant.getDecryptKey, formData);
      const walletData = {
        publicKey: keys?.publicKey,
        secretKey: data?.data,
      };
      Log('decryptKey success', JSON.stringify(data));
      dispatch(walletPrivateDataSuccess(walletData));
      resetState();
      setTimeout(() => {
        navigation.navigate('kybProcess');
      }, 300);
    } catch (e: any) {
      setKybDetail('loading', false);
      Log('decryptKey error', e);
    }
    // #region End integrating decryptKey api
  };

  return {
    validation,
    kybDetail,
    setKybDetail,
    errorObject,
    uploadPhoto,
  };
};

export default kybController;
