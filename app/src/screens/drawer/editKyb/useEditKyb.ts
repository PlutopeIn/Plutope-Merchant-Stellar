import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {ErrorProps, kybDetailProps} from './editKybProps';
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
import {kybSuccess, loginSuccess} from '@redux/user/userSlice';
import {useAppDispatch} from '@utility/useReduxHooks';

const editKybController = () => {
  const dispatch = useAppDispatch();
  const {userDetails, token} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation<AuthNavigationProps>();
  Log('userDetails:::', userDetails);
  const [kybDetail, setKybDetail, resetState, updateState] =
    useResettableState<kybDetailProps>({
      country: '',
      companyName: '',
      taxId: '',
      businessId: '',
      countryData: [],
      loading: false,
      businessPhoto: '',
      kycKybStatus: undefined,
    });
  const [errorObject, setErrorObject] = useState<ErrorProps>({
    countryError: undefined,
    companyNameError: undefined,
    taxIdError: undefined,
    businessIdError: undefined,
  });

  useEffect(() => {
    getKybKycStatus();
    const tempCountry = countryCodes.map(item => {
      return {name: `${item.country_name}`};
    });
    updateState({
      ...kybDetail,
      country: userDetails?.getKybDetails?.country,
      companyName: userDetails?.getKybDetails?.companyName,
      taxId: userDetails?.getKybDetails?.taxId,
      businessId: userDetails?.getKybDetails?.businessId,
      countryData: tempCountry,
      businessPhoto: userDetails?.getKybDetails?.businessImage,
    });
  }, [userDetails?.getKybDetails]);
  const getKybKycStatus = async () => {
    try {
      const {data} = await axiosInstance.get(constant.kyckybStatus, {
        headers: {
          auth: `${token}`,
        },
      });
      setKybDetail('kycKybStatus', data?.data);
    } catch (error) {}
  };
  const validation = (): void => {
    let isValid = true;
    if (!kybDetail?.country) {
      isValid = false;
      errorObject.countryError = validationMessage.emptyCountry;
    } else {
      errorObject.countryError = '';
    }
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
    if (!kybDetail?.taxId) {
      isValid = false;
      errorObject.taxIdError = validationMessage.emptyTaxId;
    } else if (!checkUniqueCode(kybDetail?.taxId)) {
      isValid = false;
      errorObject.taxIdError = validationMessage.invalidTaxId;
    } else {
      errorObject.taxIdError = '';
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
    setErrorObject({...errorObject});
    if (isValid) {
      editKybApiCall();
    }
  };

  const editKybApiCall = async () => {
    // #region Start integrating editKyb api
    setKybDetail('loading', true);
    const formData = {
      [params.country]: kybDetail?.country,
      [params.companyName]: kybDetail?.companyName,
      [params.taxId]: kybDetail?.taxId,
      [params.businessId]: kybDetail?.businessId,
      [params.id]: userDetails?.getKybDetails?._id,
    };
    try {
      const {data} = await axiosInstance.post(constant.editKyb, formData, {
        headers: {
          auth: `${token}`,
        },
      });
      Log('editKyb response', JSON.stringify(data));
      Snackbar(data?.message);
      const updatedData = {
        ...userDetails,
        getKybDetails: data?.data,
      };
      dispatch(loginSuccess(updatedData));
      dispatch(kybSuccess(data?.data?.kybStatus));
      resetState();
      navigation.goBack();
    } catch (e: any) {
      setKybDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('editKyb error', e);
    }
    // End integrating editKyb api
  };

  return {
    validation,
    kybDetail,
    setKybDetail,
    errorObject,
  };
};

export default editKybController;
