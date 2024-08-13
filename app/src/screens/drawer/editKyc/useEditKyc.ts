import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useEffect, useState} from 'react';
import {ErrorObject, image, kycDetailProps} from './editKycProps';
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
import {kycSuccess, loginSuccess} from '@redux/user/userSlice';
import {countryCodes} from '@utility/countryCodes.const';

const editKycController = () => {
  const dispatch = useAppDispatch();
  const {userDetails, token} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation<AuthNavigationProps>();
  const [kycDetail, setKycDetail, resetState, updateState] =
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
      kycKybStatus: undefined,
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

  Log(
    ' userDetails?.getKycDetails',
    JSON.stringify(userDetails?.getKycDetails),
  );

  useEffect(() => {
    getKybKycStatus();
    const tempCountry = countryCodes.map(item => {
      return {name: `${item.country_name}`};
    });
    let frontImageData: image = {
      name: `image${Math.random() * 3}.png`,
      uri: constant.imageURL + userDetails?.getKycDetails?.frontPhoto,
      type: 'image/png',
    };
    let backImageData: image = {
      name: `image${Math.random() * 3}.png`,
      uri: constant.imageURL + userDetails?.getKycDetails?.backPhoto,
      type: 'image/png',
    };
    updateState({
      ...kycDetail,
      firstName: userDetails?.getKycDetails?.firstName,
      lastName: userDetails?.getKycDetails?.lastName,
      birthDate: userDetails?.getKycDetails?.dob,
      address: userDetails?.getKycDetails?.address,
      country: userDetails?.getKycDetails?.country,
      countryData: tempCountry,
      name: userDetails?.getKycDetails?.kycName,
      uniqueId: userDetails?.getKycDetails?.uniqueId,
      documentType: userDetails?.getKycDetails?.documentType,
      frontImage: frontImageData,
      backImage: backImageData,
    });
  }, [userDetails?.getKycDetails]);
  const getKybKycStatus = async () => {
    try {
      const {data} = await axiosInstance.get(constant.kyckybStatus, {
        headers: {
          auth: `${token}`,
        },
      });
      setKycDetail('kycKybStatus', data?.data);
    } catch (error) {}
  };
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
    if (!kycDetail?.documentType) {
      isValid = false;
      errorObject.documentError = validationMessage.emptyDocument;
    } else {
      errorObject.documentError = '';
    }
    if (!kycDetail?.uniqueId) {
      isValid = false;
      errorObject.uniqueIdError = validationMessage.emptyUniqueId;
    } else if (!checkUniqueCode(kycDetail?.uniqueId)) {
      isValid = false;
      errorObject.uniqueIdError = validationMessage.invalidUniqueId;
    } else {
      errorObject.uniqueIdError = '';
    }
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
    if (!kycDetail?.frontImage && !kycDetail?.backImage) {
      isValid = false;
      errorObject.imageError = validationMessage.emptyPhoto;
    } else if (!kycDetail?.frontImage) {
      isValid = false;
      errorObject.imageError = validationMessage.emptyFrontPhoto;
    } else if (!kycDetail?.backImage) {
      isValid = false;
      errorObject.imageError = validationMessage.emptyBackPhoto;
    } else {
      errorObject.imageError = '';
    }
    setErrorObject({...errorObject});
    if (isValid) {
      editKycApiCall();
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

  const editKycApiCall = async () => {
    // #region Start integrating editKyc api
    setKycDetail('loading', true);
    try {
      const formData = new FormData();
      formData.append(params.firstName, kycDetail?.firstName);
      formData.append(params.lastName, kycDetail?.lastName);
      formData.append(params.address, kycDetail?.address);
      formData.append(params.country, kycDetail?.country);
      formData.append(params.dob, kycDetail?.birthDate);
      formData.append(params.id, userDetails?.getKycDetails?._id);
      // formData.append(params.kycName, kycDetail?.name);
      formData.append(params.documentType, kycDetail?.documentType);
      formData.append(params.uniqueId, kycDetail?.uniqueId);
      if (kycDetail?.frontImage?.uri) {
        formData.append(params.frontPhoto, kycDetail?.frontImage);
      }
      if (kycDetail?.backImage?.uri) {
        formData.append(params.backPhoto, kycDetail?.backImage);
      }
      const {data} = await axiosInstance.post(constant.editKyc, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          auth: `${token}`,
        },
      });
      Log('editKyc response', JSON.stringify(data));
      Snackbar(data?.message);
      const updatedData = {
        ...userDetails,
        getKycDetails: data?.data,
      };
      dispatch(loginSuccess(updatedData));
      dispatch(kycSuccess(data?.data?.kycStatus));
      resetState();
      navigation.goBack();
    } catch (e: any) {
      setKycDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('editKyc error', e);
    }
    // End integrating editKyc api
  };

  return {
    validation,
    kycDetail,
    setKycDetail,
    errorObject,
    uploadPhoto,
  };
};

export default editKycController;
