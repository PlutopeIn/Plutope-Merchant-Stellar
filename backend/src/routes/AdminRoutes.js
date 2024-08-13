import express from 'express'
const router = express.Router()

import * as AdminController from '../controller/Admin/AdminController.js'
import * as AssetController from '../controller/Admin/AssetController.js'
import * as CmsController from '../controller/Admin/CmsController.js'
import * as CategoryController from '../controller/Admin/CategoryController.js'
import * as BusinessTypeController from '../controller/Admin/BusinessTypeController.js'
import * as FaqController from '../controller/Admin/FaqController.js'
import * as ColorController from '../controller/Admin/ColorController.js'
import * as FontController from '../controller/Admin/FontController.js'
import * as DashboardController from '../controller/Admin/DashboardController.js'
import { Auth } from '../middleware/Auth.js'
import imageUpload from '../middleware/FileUpload.js';

//#region Admin authentication routes
router.post('/login', AdminController.login)
router.post('/forgot-password', AdminController.forgotPassword)
router.post('/verify-otp', AdminController.verifyOTP)
router.post('/resend-otp', AdminController.resendOTP)
router.post('/reset-password', AdminController.resetPassword)
router.post('/edit-profile', Auth, imageUpload, AdminController.editProfile)
router.post('/change-password', Auth, AdminController.changePassword)
router.get('/get-user-kyc-list', Auth, AdminController.getUserKycList)
router.get('/get-user-kyb-list', Auth, AdminController.getUserKybList)
router.get('/get-user-kyc-and-kyb-list', Auth, AdminController.getUserKycAndKybList)
router.post('/approve-reject-kyc', Auth, AdminController.approveRejectKyc)
router.post('/approve-reject-kyb', Auth, AdminController.approveRejectKyb)
router.post('/approve-reject-kyc-and-kyb', Auth, AdminController.approveRejectKycAndKyb)
router.post('/save-contact-details', Auth, AdminController.saveContactDetails)
router.get('/get-request-payment-list', Auth, AdminController.getRequestPaymentList)
router.get('/get-request-payment-details/:id', AdminController.getRequestPaymentDetails)
router.get('/get-delete-account-request-list', Auth, AdminController.getDeleteAccountRequestList)
router.post('/delete-account', Auth, AdminController.deleteAccount)

//#region user management Routes 
router.get('/get-user-list', Auth, AdminController.getUserList)
router.get('/get-user-details/:userId', Auth, AdminController.getUserDetails);
router.get('/get-applicant-details/:userId', Auth, AdminController.getApplicantDetails);

//#region Assets Routes
router.post('/add-edit-asset', Auth, AssetController.addEditAsset)
router.get('/get-all-asset', Auth, AssetController.getAllAsset)
router.get('/get-asset/:assetId', Auth, AssetController.getAssetDetails)
router.post('/delete-asset', Auth, AssetController.deleteAsset)

//#region CMS Routes
router.post('/add-edit-privacy-policy', Auth, CmsController.addEditPrivacyPolicy)
router.post('/add-edit-terms-and-condition', Auth, CmsController.addEditTermsAndCondition)

//#region Category Routes
router.post('/add-edit-category', Auth, CategoryController.addEditCategory)
router.post('/delete-category', Auth, CategoryController.deleteCategory)

//#region Business Routes
router.post('/add-edit-business-type', Auth, BusinessTypeController.addEditBusinessType)
router.post('/delete-business-type', Auth, BusinessTypeController.deleteBusiness)

//#region Faq Routes
router.post('/add-edit-faq', Auth, FaqController.addEditFaq)
router.post('/delete-faq', Auth, FaqController.deleteFaq)

//#region Color Routes
router.post('/add-edit-color', Auth, ColorController.addEditColor)
router.post('/delete-color', Auth, ColorController.deleteColor)

//#region Font Routes
router.post('/add-edit-font', Auth, FontController.addEditFont)
router.post('/delete-font', Auth, FontController.deleteFont)

//#region Dashboard Routes
router.get('/get-dashboard-data', Auth, DashboardController.dashboardTiles)
router.get('/get-weekly-registration', Auth, DashboardController.getWeeklyUserRegistrations)
router.get('/get-store-list-from-category', Auth, DashboardController.getStoreListFromCategory)

export default router