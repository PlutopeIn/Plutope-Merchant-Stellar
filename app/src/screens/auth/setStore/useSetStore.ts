import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ErrorObject, setStoreDetailProps} from './setStoreProps';
import {getExampleNumber} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import {countryCodes} from '@utility/countryCodes.const';
import validationMessage from '@utility/validation/validationMessage';
import {
  checkCompanyName,
  checkMobileNumber,
  checkName,
} from '@utility/validation/validation';
import {useResettableState} from '@hooks/useResettableState';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import {useAppDispatch} from '@utility/useReduxHooks';
import {navigationStep} from '@redux/user/userSlice';
//@ts-ignore
import {Keypair} from '@pigzbe/react-native-stellar-sdk';
import axios from 'axios';

const setStoreController = () => {
  const dispatch = useAppDispatch();
  const {signupDetails} = useSelector((state: RootState) => state.userReducer);
  const navigation = useNavigation<AuthNavigationProps>();
  const [setStoreDetail, setSetStoreDetail, resetState] =
    useResettableState<setStoreDetailProps>({
      type: undefined,
      category: undefined,
      businessName: '',
      contact: '',
      address: '',
      city: '',
      pincode: '',
      selectCountryCode: '+91',
      mobileLength: 10,
      country: '',
      countryData: [],
      businessTypeData: [],
      categoryTypeData: [],
      loading: false,
      refreshing: false,
    });
  const [errorObject, setErrorObject] = useState<ErrorObject>({
    typeError: undefined,
    categoryError: undefined,
    businessError: undefined,
    contactError: undefined,
    countryError: undefined,
    cityError: undefined,
    pincodeError: undefined,
    addressError: undefined,
  });

  useEffect(() => {
    getAllCategory();
    getAllBusinessType();
    const tempCountry = countryCodes.map(item => {
      return {name: `${item.country_name}`};
    });
    setSetStoreDetail('countryData', tempCountry);
  }, []);

  const refreshCall = () => {
    setSetStoreDetail('refreshing', true);
    getAllCategory();
    getAllBusinessType();
  };

  const getAllCategory = async () => {
    // #region Start integrating getAllCategory api
    try {
      const {data} = await axios.get(
        `${constant.commonURL}${constant.getAllCategory}`,
      );
      Log('getAllCategory success', JSON.stringify(data));
      const temp = data?.data.map((item: any) => {
        return {id: `${item._id}`, title: `${item?.categoryName}`};
      });
      setSetStoreDetail('categoryTypeData', temp);
      setSetStoreDetail('refreshing', false);
    } catch (e: any) {
      setSetStoreDetail('refreshing', false);
      Log('getAllCategory error', e);
    }
    // #region End integrating getAllCategory api
  };

  const getAllBusinessType = async () => {
    // #region Start integrating getAllBusinessType api
    try {
      const {data} = await axios.get(
        `${constant.commonURL}${constant.getAllBusinessType}`,
      );
      Log('getAllBusinessType success', JSON.stringify(data));
      const temp = data?.data.map((item: any) => {
        return {id: `${item._id}`, title: `${item?.businessType}`};
      });
      setSetStoreDetail('businessTypeData', temp);
      setSetStoreDetail('refreshing', false);
    } catch (e: any) {
      setSetStoreDetail('refreshing', false);
      Log('getAllBusinessType error', e);
    }
    // #region End integrating getAllBusinessType api
  };

  const validation = () => {
    let isValid = true;
    if (!setStoreDetail?.type) {
      isValid = false;
      errorObject.typeError = validationMessage.emptyTypeBusiness;
    } else {
      errorObject.typeError = '';
    }
    if (!setStoreDetail?.category) {
      isValid = false;
      errorObject.categoryError = validationMessage.emptyCategory;
    } else {
      errorObject.categoryError = '';
    }
    if (!setStoreDetail?.businessName) {
      isValid = false;
      errorObject.businessError = validationMessage.emptyBusinessName;
    } else if (!checkCompanyName(setStoreDetail?.businessName)) {
      isValid = false;
      errorObject.businessError = validationMessage.invalidBusinessName;
    } else if (setStoreDetail?.businessName?.length < 3) {
      isValid = false;
      errorObject.businessError = validationMessage.businessNameLength;
    } else {
      errorObject.businessError = '';
    }
    if (!setStoreDetail?.contact) {
      isValid = false;
      errorObject.contactError = validationMessage.emptyContactNumber;
    } else if (
      setStoreDetail?.selectCountryCode === '+91' &&
      !checkMobileNumber(setStoreDetail?.contact)
    ) {
      isValid = false;
      errorObject.contactError = validationMessage.invalidContactNumber;
    } else if (setStoreDetail?.contact.length != setStoreDetail?.mobileLength) {
      isValid = false;
      errorObject.contactError = validationMessage.invalidContactNumber;
    } else {
      errorObject.contactError = '';
    }
    if (!setStoreDetail?.country) {
      isValid = false;
      errorObject.countryError = validationMessage.emptyCountry;
    } else {
      errorObject.countryError = '';
    }
    if (!setStoreDetail?.city) {
      isValid = false;
      errorObject.cityError = validationMessage.emptyCity;
    } else if (!checkName(setStoreDetail?.city)) {
      isValid = false;
      errorObject.cityError = validationMessage.invalidCity;
    } else {
      errorObject.cityError = '';
    }
    if (!setStoreDetail?.pincode) {
      isValid = false;
      errorObject.pincodeError = validationMessage.emptyPincode;
    } else {
      errorObject.pincodeError = '';
    }
    if (!setStoreDetail?.address) {
      isValid = false;
      errorObject.addressError = validationMessage.emptyAddress;
    } else if (!checkCompanyName(setStoreDetail?.address)) {
      isValid = false;
      errorObject.addressError = validationMessage.invalidBusinessName;
    } else {
      errorObject.addressError = '';
    }
    setErrorObject({...errorObject});
    if (isValid) {
      getPublicKey();
    }
  };

  const onSelectCountryCode = (item: any) => {
    const lengthOfNumber: any = getExampleNumber(item.country_code, examples);
    setSetStoreDetail('mobileLength', lengthOfNumber?.nationalNumber?.length);
    setSetStoreDetail('selectCountryCode', item?.dialling_code);
  };

  const getPublicKey = () => {
    const keypair = Keypair.randomAsync()
      .then((keypair: any) => {
        const walletData = {
          publicKey: keypair.publicKey(),
          secretKey: keypair.secret(),
        };
        if (constant.mode == 'testnet') {
          activePublicKey(walletData?.publicKey, walletData?.secretKey);
        } else {
          storeApiCall(walletData?.publicKey, walletData?.secretKey);
        }
      })
      .catch((e: any) => {
        Log('getPublicKey error', 'Error fetching public key');
      });
  };

  const activePublicKey = async (publicKey: string, secretKey: string) => {
    setSetStoreDetail('loading', true);
    try {
      await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`,
      );
      storeApiCall(publicKey, secretKey);
      Log('balance actived', 'SuccessFully Received 10,000 XLM');
    } catch (e) {
      setSetStoreDetail('loading', false);
      Log('balance error', e);
    }
  };

  const storeApiCall = async (publicKey: string, secretKey: string) => {
    // #region Start integrating Store api
    const formData = {
      [params.publicKey]: publicKey,
      [params.secretKey]: secretKey,
      [params.businessType]: setStoreDetail?.type?.id,
      [params.category]: setStoreDetail?.category?.id,
      [params.businessName]: setStoreDetail?.businessName,
      [params.countryCode]: setStoreDetail?.selectCountryCode,
      [params.mobile]: setStoreDetail?.contact,
      [params.country]: setStoreDetail?.country,
      [params.city]: setStoreDetail?.city,
      [params.pincode]: setStoreDetail?.pincode,
      [params.address]: setStoreDetail?.address,
      [params.userId]: signupDetails?._id,
    };
    // console.log(formData);
    try {
      const {data} = await axiosInstance.post(constant.setupStore, formData);
      Log('Store response', JSON.stringify(data));
      Snackbar(data?.message);
      dispatch(navigationStep('3'));
      resetState();
      navigation.replace('customizeStore');
    } catch (e: any) {
      setSetStoreDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('Store error', e);
    }
    // End integrating Store api
  };

  return {
    validation,
    setSetStoreDetail,
    setStoreDetail,
    onSelectCountryCode,
    errorObject,
    refreshCall,
  };
};

export default setStoreController;
