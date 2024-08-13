import Svg from "../assets/Svg";
import Png from "../assets/Png";
import Jpg from "../assets/jpg";
import Sidebar from "./admin/defaulLayout/Sidebar";
import Header from "./admin/defaulLayout/Header";
import PaidLable from "./common/lables/PaidLable";
import FailedLable from "./common/lables/FailedLable";
import PendingLable from "./common/lables/PendingLable";
import PrimaryButton from "./common/Button/PrimaryButton";
import BorderButton from "./common/Button/BorderButton";
import AuthFooter from "./admin/defaulLayout/AuthFooter";
import AuthBackground from "./admin/defaulLayout/AuthBackground";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import EditProfile from "./admin/pages/account/editProfile/EditProfile";
import ChangePassword from "./admin/pages/account/changePassword/ChangePassword";
import DataNotFound from "./common/dataNotFound/DataNotFound";
import Loader from "./common/loader/Loader";
import PageLoader from "./common/loader/PageLoader";
import Spinner from "./common/spinner/Spinner";
import { Formik } from "formik";
import { useDispatch,useSelector } from "react-redux";
import Video from "../assets/Video";
import GridViewIcon from "@mui/icons-material/GridView";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import ReceiptIcon from '@mui/icons-material/Receipt';
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import dataService , { ImageURL } from "../config/dataService";
import { api } from "../config/api.const";
import { useState, useEffect } from "react";
import {
  getApi,
  postApi,
  postWithDispatch,
  postWithNavigate,
  postWithNavigateAndDispatch,
  postWithNavigateAndState,
} from "../config/api.service";
import { errorToast, successToast } from "./common/functions/commonFunctions";
import UserHeader from "../component/user/defaultLayout/UserHeader";
import UserFooter from "../component/user/defaultLayout/UserFooter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import DeleteModal from "../component/common/modal/DeleteModal";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import LinkIcon from '@mui/icons-material/Link';

export default {
  Svg,
  Png,
  Jpg,
  Video,
  Formik,
  Sidebar,
  Header,
  PaidLable,
  FailedLable,
  PendingLable,
  PrimaryButton,
  AuthFooter,
  AuthBackground,
  useLocation,
  useParams,
  useNavigate,
  useDispatch,
  useSelector,
  BorderButton,
  EditProfile,
  ChangePassword,
  DataNotFound,
  PageLoader,
  Loader,
  Spinner,
  GridViewIcon,
  ManageAccountsOutlinedIcon,
  Diversity2OutlinedIcon,
  DevicesOtherIcon,
  KeyboardArrowDownIcon,
  SortIcon,
  ReceiptLongIcon,
  SyncLockIcon,
  SyncAltIcon,
  ContentCopyIcon,
  ListAltIcon,
  HomeWorkOutlinedIcon,
  TaskOutlinedIcon,
  CasesOutlinedIcon,
  QuizOutlinedIcon,
  ContactMailOutlinedIcon,
  ColorLensIcon,
  FontDownloadOutlinedIcon,
  SettingsOutlinedIcon,
  getApi,
  postApi,
  postWithDispatch,
  postWithNavigate,
  postWithNavigateAndDispatch,
  api,
  dataService,
  postWithNavigateAndState,
  successToast,
  errorToast,
  useEffect,
  useState,
  UserHeader,
  UserFooter,
  ImageURL,
  ManageAccountsIcon,
  Diversity2Icon,
  CKEditor,
  ClassicEditor,
  KeyboardDoubleArrowLeftIcon,
  DisplaySettingsIcon,
  SwitchAccountIcon,
  DeleteModal,
  ReactApexChart,
  moment,
  ReceiptIcon,
  AutoDeleteIcon,
  LinkIcon
};
