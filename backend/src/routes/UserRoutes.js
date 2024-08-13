import express from 'express'
const router = express.Router()

import * as UserController from '../controller/User/UserController.js'
import { Auth } from '../middleware/Auth.js'

import imageUpload from '../middleware/FileUpload.js'

//#region User authentication routes
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/verify-otp', UserController.verifyOTP)
router.post('/add-secret-phase-key', UserController.addSecretPhaseKey)
router.post('/resend-otp', UserController.resendOTP)
router.post('/forgot-password', UserController.forgotPassword)
router.post('/reset-password', UserController.resetPassword)
router.post('/change-password', Auth, UserController.changePassword)
router.post('/user-kyb',imageUpload, UserController.connectKyb)
router.post('/user-edit-kyb', Auth, UserController.editKyb)
router.post('/user-kyc', UserController.connectKyc)
router.post('/user-edit-kyc', Auth, imageUpload, UserController.editKyc)
router.post('/get-submit-kyb-kyc', UserController.getSubmitKybAndKyc)
router.post('/setup-store', UserController.setupStore)
router.post('/edit-setup-store', Auth, UserController.editStore)
router.post('/setup-customize-store', imageUpload, UserController.setupCustomizeStore)
router.post('/edit-customize-store', Auth, imageUpload, UserController.editCustomizeStore)
router.post('/decrypt-secret-key', UserController.decryptSecretKey)
router.post('/handle-deposit', UserController.handleDeposit)
router.get('/get-contact-details', UserController.getContactDetails)
router.post('/encrypt-secret-key', UserController.encryptSecretKey)
router.get('/get-kyc-kyb-status',Auth, UserController.getUserKycAndKybStatus)
router.post('/update-fcm-token',Auth, UserController.updateFcmToken)
router.post('/cancel-transaction',Auth, UserController.cancelTransaction)
router.get('/get-invoice-number',Auth, UserController.getInvoiceNumber)
router.post('/send-request-payment-push-notification',Auth, UserController.sendRequestPaymentPushNotification)
router.get('/get-user-notification-list',Auth, UserController.getUserNotificationList)
router.get('/get-transaction-details/:id',Auth, UserController.getSingleTransactionDetails)
router.post('/store-last-token',Auth, UserController.storeLastToken)
router.get('/get-last-token/:lastToken',Auth, UserController.storeLastToken)
router.post('/send-delete-account-request',Auth, UserController.sendDeleteAccountRequest)

//#region Asset Route
router.get('/get-asset-list-for-user', UserController.getAssetListForUser)

//#region Request payment route
router.post('/request-payment', Auth, UserController.requestPayment)
router.get('/get-request-payment-details', Auth, UserController.getRequestPaymentDetails);
router.post('/get-applicant-token', UserController.getApplicantToken);
router.post('/update-kyc-details', UserController.updateKycDetails);


export default router