import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {useEffect, useState} from 'react';
import {ErrorObject, image, kycDetailProps} from './kycProps';
import validationMessage from '@utility/validation/validationMessage';
import {useResettableState} from '@hooks/useResettableState';
import {
  checkCompanyName,
  checkName,
  checkUniqueCode,
  isValidDate,
} from '@utility/validation/validation';
import ImagePicker from 'react-native-image-crop-picker';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import {useAppDispatch} from '@utility/useReduxHooks';
import {kycSuccess} from '@redux/user/userSlice';
import {countryCodes} from '@utility/countryCodes.const';
import {
  Onfido,
  OnfidoCaptureType,
  OnfidoTheme,
  OnfidoResult,
} from '@onfido/react-native-sdk';
import moment from 'moment';
const kycController = () => {
  const route = useRoute<RouteProp<AuthParams, 'kyc'>>();
  const dispatch = useAppDispatch();
  const {signupDetails} = useSelector((state: RootState) => state.userReducer);
  const navigation = useNavigation<AuthNavigationProps>();
  const [kycDetail, setKycDetail, resetState] =
    useResettableState<kycDetailProps>({
      firstName: '',
      lastName: '',
      birthDate: '',
      address: '',
      country: '',
      countryData: [],
      name: '',
      uniqueId: '',
      documentType: '',
      frontImage: null,
      backImage: null,
      loading: false,
      showDatePicker: false,
    });
  const [errorObject, setErrorObject] = useState<ErrorObject>({
    firstNameError: undefined,
    lastNameError: undefined,
    birthDateError: undefined,
    addressError: undefined,
    countryError: undefined,
    nameError: undefined,
    uniqueIdError: undefined,
    documentError: undefined,
    imageError: undefined,
  });
  Log('signup:::', signupDetails);
  useEffect(() => {
    const tempCountry = countryCodes.map(item => {
      return {name: `${item.country_name}`};
    });
    setKycDetail('countryData', tempCountry);
  }, []);

  const validation = () => {
    let isValid = true;
    if (!kycDetail?.firstName) {
      isValid = false;
      errorObject.firstNameError = validationMessage.emptyFirstName;
    } else if (!checkName(kycDetail?.firstName)) {
      isValid = false;
      errorObject.firstNameError = validationMessage.invalidFirstName;
    } else if (kycDetail?.firstName?.length < 2) {
      isValid = false;
      errorObject.firstNameError = validationMessage.firstNameLength;
    } else {
      errorObject.firstNameError = '';
    }
    if (!kycDetail?.lastName) {
      isValid = false;
      errorObject.lastNameError = validationMessage.emptyLastName;
    } else if (!checkName(kycDetail?.lastName)) {
      isValid = false;
      errorObject.lastNameError = validationMessage.invalidLastName;
    } else if (kycDetail?.lastName?.length < 2) {
      isValid = false;
      errorObject.lastNameError = validationMessage.lastNameLength;
    } else {
      errorObject.lastNameError = '';
    }
    if (!kycDetail?.birthDate) {
      isValid = false;
      errorObject.birthDateError = validationMessage.emptyBirthDate;
    } else if (!isValidDate(kycDetail?.birthDate)) {
      isValid = false;
      errorObject.birthDateError = validationMessage.invalidBirthDate;
    } else {
      errorObject.birthDateError = '';
    }
    // if (!kycDetail?.name) {
    //   isValid = false;
    //   errorObject.nameError = validationMessage.emptyName;
    // } else if (!checkName(kycDetail?.name)) {
    //   isValid = false;
    //   errorObject.nameError = validationMessage.invalidName;
    // } else if (kycDetail?.name?.length < 2) {
    //   isValid = false;
    //   errorObject.nameError = validationMessage.nameLength;
    // } else {
    //   errorObject.nameError = '';
    // }
    // if (!kycDetail?.documentType) {
    //   isValid = false;
    //   errorObject.documentError = validationMessage.emptyDocument;
    // } else {
    //   errorObject.documentError = '';
    // }
    // if (!kycDetail?.uniqueId) {
    //   isValid = false;
    //   errorObject.uniqueIdError = validationMessage.emptyUniqueId;
    // } else if (!checkUniqueCode(kycDetail?.uniqueId)) {
    //   isValid = false;
    //   errorObject.uniqueIdError = validationMessage.invalidUniqueId;
    // } else {
    //   errorObject.uniqueIdError = '';
    // }
    if (!kycDetail?.country) {
      isValid = false;
      errorObject.countryError = validationMessage.emptyCountry;
    } else {
      errorObject.countryError = '';
    }
    if (!kycDetail?.address) {
      isValid = false;
      errorObject.addressError = validationMessage.emptyAddress;
    } else if (!checkCompanyName(kycDetail?.address)) {
      isValid = false;
      errorObject.addressError = validationMessage.invalidBusinessName;
    } else {
      errorObject.addressError = '';
    }
    // if (!kycDetail?.frontImage && !kycDetail?.backImage) {
    //   isValid = false;
    //   errorObject.imageError = validationMessage.emptyPhoto;
    // } else if (!kycDetail?.frontImage) {
    //   isValid = false;
    //   errorObject.imageError = validationMessage.emptyFrontPhoto;
    // } else if (!kycDetail?.backImage) {
    //   isValid = false;
    //   errorObject.imageError = validationMessage.emptyBackPhoto;
    // } else {
    //   errorObject.imageError = '';
    // }
    setErrorObject({...errorObject});
    if (isValid) {
      kycApiCall();
    }
  };
  const closeDatePicker = () => {
    setKycDetail('showDatePicker', false);
  };
  const confirmDate = (date: Date) => {
    setKycDetail('showDatePicker', false);
    setKycDetail('birthDate', moment(date).format('DD/MM/YYYY'));
  };
  const handleOnfidoResponse = async (
    applicantId: string | null,
    frontId: string | null,
    backId: string | null,
    faceId: string | null,
  ) => {
    let formData;
    if (applicantId) {
      formData = {
        [params.applicantId]: applicantId,
        [params.userId]: signupDetails?._id,
      };
    } else {
      formData = {
        [params.frontId]: frontId,
        [params.backId]: backId,
        [params.faceId]: faceId,
        [params.userId]: signupDetails?._id,
      };
    }

    try {
      const {data} = await axiosInstance.post(
        constant.updateKycDetail,
        formData,
      );
      navigation.navigate('kyb');
      Log('data final ::::', data);
    } catch (error) {
      Log('error final ::::', error);
    }
  };
  const generateApplicants = async () => {
    const applicant = {
      first_name: kycDetail?.firstName,
      last_name: kycDetail?.lastName,
    };
    try {
      const {data} = await axiosInstance.post(
        `${constant.onfidoUrl}applicants`,
        applicant,
        {
          headers: {
            Authorization: `Token token=${constant.onfidoToken}`,
          },
        },
      );
      Log('data::', data);
      handleOnfidoResponse(data?.id, null, null, null);
      generateSdkToken(data?.id);
    } catch (error) {
      Log('err', JSON.stringify(error));
    }
  };

  const generateSdkToken = async (id: any) => {
    const formData = {
      applicant_id: id,
    };
    try {
      const {data} = await axiosInstance.post(
        `${constant.onfidoUrl}sdk_token`,
        formData,
        {
          headers: {
            Authorization: `Token token=${constant.onfidoToken}`,
          },
        },
      );
      Log('sdk token data:::', data);
      setKycDetail('loading', false);
      initOnfidoSdk(data?.token);
    } catch (error) {
      Log('err', JSON.stringify(error));
    }
  };
  const initOnfidoSdk = async (token: string) => {
    Onfido.start({
      sdkToken: token,
      workflowRunId: '',
      localisation: {
        ios_strings_file_name: 'Localizable',
      },
      flowSteps: {
        captureFace: {
          type: OnfidoCaptureType.PHOTO,
        },
        captureDocument: {},
      },
      theme: OnfidoTheme.LIGHT,
    })
      .then((response: OnfidoResult) => {
        Log('sdk res', response);

        handleOnfidoResponse(
          null,
          //@ts-ignore
          response?.document?.front?.id,
          response?.document?.back?.id,
          response?.face?.id,
        );
        // generateImage(response);
      })
      .catch((error: any) => {
        Log('reject', error);
      });
  };
  const generateImage = async (response: any) => {
    try {
      const {data} = await axiosInstance.get(
        `${constant.onfidoUrl}documents/${response?.document?.front?.id}/download`,
        {
          headers: {
            Authorization: `Token token=${constant.onfidoToken}`,
          },
        },
      );
      Log('documents data:', data);
    } catch (error) {
      Log('document error', error);
    }
  };
  const uploadPhoto = (type: 'front' | 'back') => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      height: 300,
      width: 400,
      cropping: false,
    })
      .then(image => {
        let imageData: image = {
          name: `image${Math.random() * 3}.png`,
          uri: image.path,
          type: 'image/png',
        };
        type == 'front'
          ? setKycDetail('frontImage', imageData)
          : setKycDetail('backImage', imageData);
      })
      .catch(e => {});
  };

  const kycApiCall = async () => {
    // #region Start integrating kyc api
    setKycDetail('loading', true);
    try {
      let formData = {
        [params.firstName]: kycDetail?.firstName,
        [params.lastName]: kycDetail?.lastName,
        [params.address]: kycDetail?.address,
        [params.country]: kycDetail?.country,
        [params.dob]: kycDetail?.birthDate,
        [params.userId]: signupDetails?._id,
      };
      const {data} = await axiosInstance.post(constant.userKyc, formData);
      Log('kyc response', JSON.stringify(data));
      Snackbar(data?.message);
      // dispatch(kycSuccess(data?.data?.kycStatus));
      // resetState();
      setTimeout(() => {
        setKycDetail('loading', false);
        navigation.navigate('onfidoVerify', {userId: signupDetails?._id});
      }, 300);
    } catch (e: any) {
      setKycDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('kyc error', e);
    }
    // End integrating kyc api
  };

  return {
    validation,
    kycDetail,
    setKycDetail,
    errorObject,
    uploadPhoto,
    generateApplicants,
    closeDatePicker,
    confirmDate,
  };
};

export default kycController;
