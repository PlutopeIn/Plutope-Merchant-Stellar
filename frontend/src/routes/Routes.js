import React from "react";
import { BrowserRouter, Route, Routes as Routess } from "react-router-dom";
import { createBrowserHistory } from "history";

//#start region Admin
import Login from "../component/admin/auth/login/Login";
import ForgotPassword from "../component/admin/auth/forgotPassword/ForgotPassword";
import ResetPassword from "../component/admin/auth/resetPassword/ResetPassword";
import Otp from "../component/admin/auth/otp/Otp";
import AdminLayOut from "../container/admin/pages/adminLayout/AdminLayOut";
import DashBoard from "../container/admin/pages/dashBoard/DashBoard";
import UserList from "../container/admin/pages/userList/UserList";
import AccountLayout from "../container/admin/pages/accountLayout/AccountLayout";
import TermsAndCondition from "../container/admin/pages/termsAndCondition/TermsAndCondition";
import PrivaPolicy from "../container/admin/pages/privacyPolicy/PrivacyPolicy";
import Faq from "../container/admin/pages/FAQ/Faq";
import KYC from "../container/admin/pages/kyc/KYC";
import KYCDetail from "../container/admin/pages/kyc/KYCDetail";
import KYB from "../container/admin/pages/kyb/KYB";
import KYBDetail from "../container/admin/pages/kyb/KYBDetail";
import Category from "../container/admin/pages/category/Category";
import Business from "../container/admin/pages/business/Business";
import ColorList from "../container/admin/pages/color/ColorList";
import ContactUs from "../container/admin/pages/contactus/ContactUs";
import FontsList from "../container/admin/pages/fonts/FontsList";
import ChangePassword from "../container/admin/pages/changepassword/ChangePassword";
import ProfileChangePwd from "../container/admin/pages/userProfilePwd/ProfileChangePwd";
import UserDetail from "../container/admin/pages/userDetail/UserDetail";
import AssetsList from "../container/admin/pages/assets/AssetsList";
import AddAssets from "../container/admin/pages/assets/AddAssets";
import ViewAssets from "../container/admin/pages/assets/ViewAssets";
import PrivacyPolicy from "../container/admin/pages/cms/PrivacyPolicy";
import TermsConditions from "../container/admin/pages/cms/TermsConditions";
import Success from "../component/admin/auth/success/Success";
import Fail from "../component/admin/auth/fail/Fail";
import Invoices from "../container/admin/pages/invoice/Invoices";
import DeleteRequests from "../container/admin/pages/requests/DeleteRequest";
// #region static routes

// import AddUser from "../container/admin/pages/addUser/AddUser";
//import UnderMaintenance from "../component/common/underMaintenance/UnderMaintenance";
//import PageNotFound from "../component/common/pageNotFound/PageNotFound";
//import DataNotFound from "../component/common/dataNotFound/DataNotFound";
//import Loader from "../component/common/loader/Loader";
//import Spinner from "../component/common/spinner/Spinner";
//import PageLoader from "../component/common/loader/PageLoader";
// import UserLayout from "../container/user/pages/userLayout/UserLayout";
// import Home from "../container/user/pages/home/Home";
// import Profile from "../container/admin/pages/profile/Profile";
// import UserCard from "../container/admin/pages/userCard/UserCard";
//#endregion

//#start region user
import TransactionList from "../container/admin/pages/transactions/TransactionList";
import QRCodeOne from "../container/admin/pages/qrpage/QRCodeOne";
import QRCodeTwo from "../container/admin/pages/qrpage/QRCodeTwo";
import QRCodeThree from "../container/admin/pages/qrpage/QRCodeThree";
import QRPage from "../container/admin/pages/qrpage/QRPage";
import QRCodeFile from "../container/admin/pages/qrCode/QRCodeFile";
import Verification from "../container/admin/pages/Verification/Verification";

import PrivateRoutes from "./PrivateRoutes";
const history = createBrowserHistory();

export default function Routes() {
  return (
    <BrowserRouter history={history}>
      <Routess>
        <Route path="/" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="otp-verify" element={<Otp />} />
        <Route path="reset-password" element={<ResetPassword />} />

        <Route path="/qr-code-one" element={<QRCodeOne />} />
        <Route path="/qr-code-two/:id" element={<QRCodeTwo />} />
        <Route path="/qr-code-three" element={<QRCodeThree />} />

        <Route path="/qr-page/:id" element={<QRPage />} />
        <Route path="/qr-code/:id" element={<QRCodeFile />} />
        <Route path="/verification/:id" element={<Verification />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="terms-and-condition" element={<TermsAndCondition />} />
        <Route path="privacy-policies" element={<PrivaPolicy />} />

        {/* End public routes */}

        {/* Admin private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminLayOut />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="account" element={<AccountLayout />} />
            <Route path="update-profile" element={<ProfileChangePwd />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="user-detail/:userId" element={<UserDetail />} />
            <Route path="assets" element={<AssetsList />} />
            <Route path="add-assets" element={<AddAssets />} />
            <Route path="edit-assets/:id" element={<AddAssets />} />
            <Route path="view-assets/:assetId" element={<ViewAssets />} />
            <Route path="kyc" element={<KYC />} />
            <Route path="view-kyc/:id" element={<KYCDetail />} />
            <Route path="kyb" element={<KYB />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="delete-request" element={<DeleteRequests />} />
            <Route path="view-kyb/:id" element={<KYBDetail />} />
            <Route path="business" element={<Business />} />
            <Route path="category" element={<Category />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="font-list" element={<FontsList />} />
            <Route path="terms-condition" element={<TermsConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
           
            <Route path="faq" element={<Faq />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="transaction-list" element={<TransactionList />} />
          </Route>
        </Route>
        {/* end admin private routes */}

        {/* Static routes */}

        {/* <Route path="user-card" element={<UserCard />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="data-not-found" element={<DataNotFound />} />
         <Route path="page-not-found" element={<PageNotFound />} />
        <Route path="loader" element={<Loader />} />
        <Route path="spinner" element={<Spinner />} />
        <Route path="page-loader" element={<PageLoader />} /> 
        <Route path="under-maintenance" element={<UnderMaintenance />} /> */}

        {/* end static routes */}

        {/*<Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
        </Route> */}
      </Routess>
    </BrowserRouter>
  );
}
