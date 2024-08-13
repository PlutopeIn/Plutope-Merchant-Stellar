import {createSlice} from '@reduxjs/toolkit';
import {UserReducerProps} from './userProps';

const initialState: UserReducerProps = {
  signupDetails: undefined,
  userDetails: undefined,
  token: undefined,
  passcode: undefined,
  isVerify: undefined,
  kybStatus: undefined,
  kycStatus: undefined,
  step: undefined,
  walletPrivateData: undefined,
  balance: '0.0',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState: initialState,
  reducers: {
    navigationStep: (state, action) => {
      return {...state, step: action.payload};
    },
    signupStepSuccess: (state, action) => {
      return {...state, signupDetails: action.payload};
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
        token: action?.payload?.token,
      };
    },
    kybSuccess: (state, action) => {
      return {...state, kybStatus: action.payload};
    },
    updateBalance: (state, action) => {
      return {...state, balance: action.payload};
    },
    kycSuccess: (state, action) => {
      return {...state, kycStatus: action.payload};
    },
    walletPrivateDataSuccess: (state, action) => {
      return {...state, walletPrivateData: action.payload};
    },
    changeModeSuccess: (state, action) => {
      return {...state, mode: action.payload};
    },
    verified: (state, action) => {
      return {...state, isVerify: action.payload};
    },
    setPasscode: (state, action) => {
      return {...state, passcode: action.payload};
    },
    logout: state => {
      return {
        signupDetails: undefined,
        userDetails: undefined,
        token: undefined,
        passcode: undefined,
        kybStatus: undefined,
        kycStatus: undefined,
        step: undefined,
        walletPrivateData: undefined,
        balance: '0.0',
      };
    },
  },
});

export const {
  navigationStep,
  signupStepSuccess,
  loginSuccess,
  kybSuccess,
  kycSuccess,
  setPasscode,
  walletPrivateDataSuccess,
  changeModeSuccess,
  verified,
  logout,
  updateBalance,
} = userSlice.actions;

export default userSlice.reducer;
