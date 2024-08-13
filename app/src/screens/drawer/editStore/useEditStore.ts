import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ErrorObject, setStoreDetailProps} from './editStoreProps';
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
import {loginSuccess} from '@redux/user/userSlice';
import axios from 'axios';

const editStoreController = () => {
  const dispatch = useAppDispatch();
  const {userDetails, token} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation<AuthNavigationProps>();
  const [setStoreDetail, setSetStoreDetail, resetState, updateState] =
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
  // console.log(
  //   'userDetails?.storeDetails?.businessType',
  //   userDetails?.storeDetails,
  // );
  useEffect(() => {
    getAllCategory();
    getAllBusinessType();
  }, [userDetails?.storeDetails]);
  useEffect(() => {
    const tempCountry = countryCodes.map(item => {
      return {name: `${item.country_name}`};
    });
    const tempCat = setStoreDetail?.categoryTypeData?.filter(
      item => item.id == userDetails?.storeDetails?.category,
    );
    const tempBusiness = setStoreDetail?.businessTypeData?.filter(
      item => item.id == userDetails?.storeDetails?.businessType,
    );
    const tempType = {
      id: tempBusiness[0]?.id,
      title: tempBusiness[0]?.title,
    };
    const tempCategory = {
      id: tempCat[0]?.id,
      title: tempCat[0]?.title,
    };
    updateState({
      ...setStoreDetail,
      type: tempType,
      category: tempCategory,
      businessName: userDetails?.storeDetails?.businessName,
      contact: userDetails?.storeDetails?.mobileNumber,
      address: userDetails?.storeDetails?.address,
      city: userDetails?.storeDetails?.city,
      pincode: userDetails?.storeDetails?.pincode,
      selectCountryCode: userDetails?.storeDetails?.countryCode,
      mobileLength: 10,
      country: userDetails?.storeDetails?.country,
      countryData: tempCountry,
    });
  }, [setStoreDetail?.categoryTypeData, setStoreDetail?.businessTypeData]);
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

  const refreshCall = () => {
    setSetStoreDetail('refreshing', true);
    getAllCategory();
    getAllBusinessType();
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
      editStoreApiCall();
    }
  };

  const onSelectCountryCode = (item: any) => {
    const lengthOfNumber: any = getExampleNumber(item.country_code, examples);
    setSetStoreDetail('mobileLength', lengthOfNumber?.nationalNumber?.length);
    setSetStoreDetail('selectCountryCode', item?.dialling_code);
  };

  const editStoreApiCall = async () => {
    // #region Start integrating EditStore api
    setSetStoreDetail('loading', true);
    const formData = {
      [params.businessType]: setStoreDetail?.type?.id,
      [params.category]: setStoreDetail?.category?.id,
      [params.businessName]: setStoreDetail?.businessName,
      [params.countryCode]: setStoreDetail?.selectCountryCode,
      [params.mobile]: setStoreDetail?.contact,
      [params.country]: setStoreDetail?.country,
      [params.city]: setStoreDetail?.city,
      [params.pincode]: setStoreDetail?.pincode,
      [params.address]: setStoreDetail?.address,
      [params.id]: userDetails?.storeDetails?._id,
    };
    try {
      const {data} = await axiosInstance.post(constant.editStore, formData, {
        headers: {
          auth: `${token}`,
        },
      });
      Log('EditStore response', JSON.stringify(data));
      Snackbar(data?.message);
      const updatedData = {
        ...userDetails,
        storeDetails: data?.data,
      };
      dispatch(loginSuccess(updatedData));
      resetState();
      navigation.goBack();
    } catch (e: any) {
      setSetStoreDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('EditStore error', e);
    }
    // End integrating EditStore api
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

export default editStoreController;
