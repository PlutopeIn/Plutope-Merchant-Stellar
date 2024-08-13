import {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {ErrorObject, image, storeDetailProps} from './editCustomizeStoreProps';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import validationMessage from '@utility/validation/validationMessage';
import {useResettableState} from '@hooks/useResettableState';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import {useAppDispatch, useAppSelector} from '@utility/useReduxHooks';
import {RootState} from '@redux/type';
import {loginSuccess} from '@redux/user/userSlice';
import axios from 'axios';

const editCustomizeStoreController = () => {
  const dispatch = useAppDispatch();
  const {userDetails, token} = useAppSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation<AuthNavigationProps>();
  const [storeDetail, setStoreDetail, resetState, updateState] =
    useResettableState<storeDetailProps>({
      logo: null,
      coverImage: null,
      // fonts: undefined,
      colors: undefined,
      loading: false,
      refreshing: false,
      // fontData: [],
      colorData: [],
    });
  const [errorObject, setErrorObject] = useState<ErrorObject>({
    logoError: undefined,
    coverImageError: undefined,
    fontsError: undefined,
    colorsError: undefined,
  });

  useEffect(() => {
    let logoData: image = {
      name: `image${Math.random() * 3}.png`,
      uri: constant.imageURL + userDetails?.customizeStoreDetails?.logo,
      type: 'image/png',
    };
    let coverImageData: image = {
      name: `image${Math.random() * 3}.png`,
      uri: constant.imageURL + userDetails?.customizeStoreDetails?.coverPhoto,
      type: 'image/png',
    };
    updateState({
      ...storeDetail,
      logo: logoData,
      coverImage: coverImageData,
      // fonts: userDetails?.customizeStoreDetails?.customFonts,
      colors: userDetails?.customizeStoreDetails?.colorCode,
    });
  }, [userDetails?.customizeStoreDetails]);

  useEffect(() => {
    // getAllFont();
    getAllColor();
  }, []);

  const refreshCall = () => {
    setStoreDetail('refreshing', true);
    // getAllFont();
    getAllColor();
  };

  const getAllColor = async () => {
    // #region Start integrating getAllColor api
    try {
      const {data} = await axios.get(
        `${constant.commonURL}${constant.getAllColor}`,
      );
      const temp = data?.data.map((item: any) => {
        return {id: `${item._id}`, title: `${item?.color}`};
      });
      Log('getAllColor success', JSON.stringify(data));
      setStoreDetail('colorData', temp);
      setStoreDetail('refreshing', false);
    } catch (e: any) {
      setStoreDetail('refreshing', false);
      Log('getAllColor error', e);
    }
    // #region End integrating getAllColor api
  };

  const getAllFont = async () => {
    // #region Start integrating getAllFont api
    try {
      const {data} = await axios.get(
        `${constant.commonURL}${constant.getAllFont}`,
      );
      const temp = data?.data.map((item: any) => {
        return {id: `${item._id}`, title: `${item?.font}`};
      });
      Log('getAllFont success', JSON.stringify(data));
      // setStoreDetail('fontData', temp);
      setStoreDetail('refreshing', false);
    } catch (e: any) {
      setStoreDetail('refreshing', false);
      Log('getAllFont error', e);
    }
    // #region End integrating getAllFont api
  };

  const uploadPhoto = (type: 'logo' | 'cover') => {
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
        type == 'logo'
          ? setStoreDetail('logo', imageData)
          : setStoreDetail('coverImage', imageData);
      })
      .catch(e => {});
  };

  const validation = () => {
    let isValid = true;
    if (!storeDetail?.logo) {
      isValid = false;
      errorObject.logoError = validationMessage.emptyLogo;
    } else {
      errorObject.logoError = '';
    }
    if (!storeDetail?.coverImage) {
      isValid = false;
      errorObject.coverImageError = validationMessage.emptyCoverImage;
    } else {
      errorObject.coverImageError = '';
    }
    // if (!storeDetail?.fonts) {
    //   isValid = false;
    //   errorObject.fontsError = validationMessage.emptyFonts;
    // } else {
    //   errorObject.fontsError = undefined;
    // }
    // if (!storeDetail?.colors) {
    //   isValid = false;
    //   errorObject.colorsError = validationMessage.emptyColors;
    // } else {
    //   errorObject.colorsError = undefined;
    // }
    setErrorObject({...errorObject});
    if (isValid) {
      editCustomizeStoreApiCall();
    }
  };

  const editCustomizeStoreApiCall = async () => {
    // #region Start integrating editCustomizeStore api
    setStoreDetail('loading', true);
    try {
      const formData = new FormData();
      formData.append(params.id, userDetails?.customizeStoreDetails?._id);
      {
        storeDetail?.colors &&
          formData.append(params.colorCode, storeDetail?.colors);
      }
      // {
      //   storeDetail?.fonts &&
      //     formData.append(params.customFonts, storeDetail?.fonts);
      // }
      if (storeDetail?.logo?.uri) {
        formData.append(params.logo, storeDetail?.logo);
      }
      if (storeDetail?.coverImage?.uri) {
        formData.append(params.coverPhoto, storeDetail?.coverImage);
      }
      const {data} = await axiosInstance.post(
        constant.editCustomizeStore,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            auth: `${token}`,
          },
        },
      );
      Log('editCustomizeStore response', JSON.stringify(data));
      Snackbar(data?.message);
      const updatedData = {
        ...userDetails,
        customizeStoreDetails: data?.data,
      };
      dispatch(loginSuccess(updatedData));
      resetState();
      navigation.goBack();
    } catch (e: any) {
      setStoreDetail('loading', false);
      Snackbar(e?.data?.message);
      Log('editCustomizeStore error', e);
    }
    // End integrating editCustomizeStore api
  };

  return {
    storeDetail,
    uploadPhoto,
    validation,
    errorObject,
    setStoreDetail,
    refreshCall,
  };
};

export default editCustomizeStoreController;
