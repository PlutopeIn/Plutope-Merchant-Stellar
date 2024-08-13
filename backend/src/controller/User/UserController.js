import User from '../../models/User.js'
import Kyb from '../../models/Kyb.js'
import { passwordHash } from '../../services/CommonService.js'
import { StatusCodes } from 'http-status-codes'
import { ResponseMessage } from '../../utils/ResponseMessage.js'
import sendMail from '../../config/email.config.js'
import ejs from 'ejs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Kyc from '../../models/Kyc.js'
import Store from '../../models/Store.js'
import CustomizeStore from '../../models/CustomizeStore.js'
import crypt from 'cryptr'
const cryptr = new crypt('stellarXPlutopeStoreSecretKey');
import Asset from "../../models/Asset.js";
import Transaction from '../../models/Transaction.js'
import QRCode from 'qrcode'
import fs from 'fs'
import pkg from '@stellar/typescript-wallet-sdk'
import ContactDetail from '../../models/ContactDetails.js';
import axios from 'axios'
import { createHmac } from "crypto";
import PushNotification from '../../models/PushNotification.js'
import moment from 'moment'
import { SendPushNotification } from '../../services/PushNotificationService.js'
const { walletSdk, IssuedAssetId, SigningKeypair, Types, DefaultSigner, Wallet } = pkg

//#region User register API
export const register = async (req, res) => {
    try {
        let { firstName, lastName, email, password, confirmPassword } = req.body
        let hashPassword = await passwordHash(password)

        const userExistsByEmail = await User.find({ email: email, isVerified: true, isDeleted: false })
        if (userExistsByEmail.length > 0) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_ALREADY_EXIST_EMAIL,
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.PASSWORD_AND_CONFIRM_PASSWORD,
            });
        }
        let emailotp = Math.floor(1000 + Math.random() * 9000)
        let createUser = await User.create({
            email,
            password: hashPassword,
            firstName,
            lastName,
            // country,
            // countryCode,
            // mobileNumber,
            emailOtp: emailotp
        })
        const mailInfo = await ejs.renderFile("src/views/RegisterVerification.ejs", {
            otp: emailotp,
        });
        sendMail(email, "Welcome to Merchant PlutoPe", mailInfo);
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_CREATE_SUCCESS,
            data: createUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region User login API
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const getUser = await User.findOne({ email, isDeleted: false });

        if (!getUser) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_FOUND,
            });
        }

        if (!getUser.isVerified) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.PLEASE_VERIFY_PROFILE,
            });
        }

        if (getUser.isAccountDeleted) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ACCOUNT_DELETE,
            });
        }

        if (!bcrypt.compareSync(password, getUser.password)) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.INVALID_PASSWORD,
            });
        }
        let getKybDetails = await Kyb.findOne({ userId: getUser._id })
        let getKycDetails = await Kyc.findOne({ userId: getUser._id })
        let storeDetails = await Store.findOne({ userId: getUser._id }).populate('businessType').populate('category')
        let customizeStoreDetails = await CustomizeStore.findOne({ userId: getUser._id })
        const token = jwt.sign(
            { user: { id: getUser._id } },
            process.env.JWT_SECRET_KEY
        );

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_LOGIN_SUCCESS,
            data: { getUser, getKybDetails, getKycDetails, storeDetails, customizeStoreDetails, token },
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region OTP verification
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const isEmailExists = await User.findOne({ email });
        if (!isEmailExists) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.EMAIL_NOT_EXIST,
            });
        }
        const isOTPValid = await User.findOne({ email, emailOtp: otp });

        if (isOTPValid) {
            isOTPValid.emailOtp = 0;
            isOTPValid.isVerified = true;
            await isOTPValid.save();

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.OTP_VERIFIED_SUCCESS,
                data: { _id: isOTPValid._id }
            });
        } else {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.OTP_INVALID,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Add secret phase key
export const addSecretPhaseKey = async (req, res) => {
    try {
        const { id, phaseKey } = req.body;
        let savePhaeKey = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { secretPhaseKey: phaseKey } },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.SECRET_PHASE_KEY_ADD_SUCCESS,
            data: savePhaeKey
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Resend OTP
export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.EMAIL_NOT_EXIST,
            });
        }
        const checkEmail = await User.findOne({ email });

        if (!checkEmail) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_FOUND,
            });
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000)
        checkEmail.emailOtp = otpCode;
        await checkEmail.save();
        if(req.body.verifyType == 'Register') {
            const mailInfo = await ejs.renderFile("src/views/RegisterVerification.ejs", {
                otp: checkEmail.emailOtp,
            });
            sendMail(email, "Verify OTP", mailInfo);
    
            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.RESEND_OTP_SUCCESS,
            });
        } else if(req.body.verifyType == 'Forgot Password') {
            const mailInfo = await ejs.renderFile("src/views/ForgotPassword.ejs", {
                otp: checkEmail.emailOtp,
            });
            sendMail(email, "Resend OTP For Forgot Password", mailInfo);
    
            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.RESEND_OTP_SUCCESS,
            });
        } else {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.RESEND_OTP_NOT_SEND,
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const isEmailExists = await User.findOne({ email });
        if (!isEmailExists) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.EMAIL_NOT_EXIST,
            });
        }
        if (isEmailExists.isAccountDeleted) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ACCOUNT_DELETE,
            });
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000);
        const otpData = await User.findByIdAndUpdate(
            { _id: isEmailExists._id },
            { $set: { emailOtp: otpCode } },
            { new: true }
        );

        const mailInfo = await ejs.renderFile("src/views/ForgotPassword.ejs", {
            otp: otpData.emailOtp,
        });
        sendMail(email, "Forgot Password", mailInfo);
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.RESET_PASSWORD_MAIL,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Reset password
export const resetPassword = async (req, res) => {
    try {
        const { newPassword, id } = req.body;
        const checkPassword = await User.findOne({ _id: id });
        const passwordMatch = await bcrypt.compare(newPassword, checkPassword.password);
        if (passwordMatch) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.NEW_PASSWORD_SAME_AS_OLD,
            });
        }

        const hashPassword = await passwordHash(newPassword);
        await User.findByIdAndUpdate(
            { _id: id },
            { $set: { password: hashPassword } },
            { new: true }
        );
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.RESET_PASSWORD_SUCCESS,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Connect KYB
export const connectKyb = async (req, res) => {
    try {
        let { companyName, businessId, userId } = req.body
        let findKyb = await Kyb.findOne({userId});
        let createKyb;
        if (findKyb) {
            createKyb = await Kyb.findOneAndUpdate(
              { userId },
              {
                $set: {
                  companyName,
                  businessId,
                  isSubmit: true,
                  businessImage: req.image,
                },
              },
              { new: true }
            );
          } else {
            createKyb = await Kyb.create({
              companyName,
              businessId,
              userId,
              isSubmit: true,
              businessImage: req.image,
            });
        }
        
        let getUser = await User.findOne({ _id: userId })
        let getKycDetails = await Kyc.findOne({ userId: userId })
        let storeDetails = await Store.findOne({ userId: userId }).populate('businessType').populate('category')
        let customizeStoreDetails = await CustomizeStore.findOne({ userId: userId })
        const token = jwt.sign(
            { user: { id: userId } },
            process.env.JWT_SECRET_KEY
        );
        const mailInfo = await ejs.renderFile("src/views/RegisterComplete.ejs");
        sendMail(getUser.email, `You have registered`, mailInfo);
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYB_SUBMIT_SUCCESS,
            data: { getUser, getKybDetails: createKyb, getKycDetails, storeDetails, customizeStoreDetails, token },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Connect KYC
export const connectKyc = async (req, res) => {
    try {
        let { firstName, lastName, dob, address, country, userId } = req.body;
        let findKyc = await Kyc.findOne({userId});
        let createKyc;
        if(findKyc)
        {
            createKyc = await Kyc.findOneAndUpdate(
                {userId}, 
                {$set:
                    {   
                        firstName,
                        lastName,
                        dob,
                        address,
                        country,
                        isSubmit: true
                    }
                }, 
                {new:true})
        }
        else
        {
            createKyc = await Kyc.create({
                firstName,
                lastName,
                dob,
                address,
                country,
                userId,
                isSubmit: true
            })
        }
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYC_SUBMIT_SUCCESS,
            data: createKyc,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Get submitted KYB and KYC
export const getSubmitKybAndKyc = async (req, res) => {
    try {
        let getKyc = await Kyc.findOne({ isSubmit: true, userId: req.body.userId })
        let getKyb = await Kyb.findOne({ isSubmit: true, userId: req.body.userId })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYC_KYB_DETAIL_FETCH_SUCCESS,
            data: { kycDetails: getKyc != null ? getKyc : {}, kybDetails: getKyb != null ? getKyb : {} },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Setup store
export const setupStore = async (req, res) => {
    try {
        let { businessType, category, businessName, mobileNumber, country, countryCode, city, pincode, address, userId, publicKey, secretKey } = req.body
        let setupStore = await Store.create({
            businessType,
            category,
            businessName,
            mobileNumber,
            country,
            countryCode,
            city,
            pincode,
            address,
            userId,
        })
        await User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $set: { publicKey: publicKey, secretKey: cryptr.encrypt(secretKey) } },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.STORE_SETUP_SUCCESS,
            data: setupStore,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Setup customize store
export const setupCustomizeStore = async (req, res) => {
    try {
        let { customFonts, colorCode, userId } = req.body
        let customizeStore = await CustomizeStore.create({
            customFonts,
            colorCode,
            logo: req.files.logo[0].filename,
            coverPhoto: req.files.coverPhoto[0].filename,
            userId,
        })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.CUSTOMIZE_STORE_SETUP_SUCCESS,
            data: customizeStore,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Edit KYB
export const editKyb = async (req, res) => {
    try {
        let { country, companyName, taxId, businessId, id } = req.body
        let editKyb = await Kyb.findByIdAndUpdate(
            { _id: id },
            {
                country,
                companyName,
                taxId,
                businessId,
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYB_UPDATE_SUCCESS,
            data: editKyb,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Edit KYC
export const editKyc = async (req, res) => {
    try {
        let { firstName, lastName, dob, address, country, documentType, uniqueId, id } = req.body
        let editKyc = await Kyc.findByIdAndUpdate(
            { _id: id },
            {
                firstName,
                lastName,
                dob,
                address,
                country,
                documentType,
                uniqueId,
                frontPhoto: req.files.frontPhoto ? req.files.frontPhoto[0].filename : req.body.frontPhoto,
                backPhoto: req.files.backPhoto ? req.files.backPhoto[0].filename : req.body.backPhoto,
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYC_UPDATE_SUCCESS,
            data: editKyc,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Edit Store
export const editStore = async (req, res) => {
    try {
        let { id, businessType, category, businessName, mobileNumber, country, countryCode, city, pincode, address } = req.body
        let editStore = await Store.findByIdAndUpdate(
            { _id: id },
            {
                businessType,
                category,
                businessName,
                mobileNumber,
                country,
                countryCode,
                city,
                pincode,
                address,
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.STORE_UPDATE_SUCCESS,
            data: editStore,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Edit customize store
export const editCustomizeStore = async (req, res) => {
    try {
        let { customFonts, colorCode, id } = req.body
        let editCustomizeStore = await CustomizeStore.findByIdAndUpdate(
            { _id: id },
            {
                customFonts,
                colorCode,
                logo: req.files.logo ? req.files.logo[0].filename : req.body.logo,
                coverPhoto: req.files.coverPhoto ? req.files.coverPhoto[0].filename : req.body.coverPhoto,
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.CUSTOMIZE_STORE_UPDATE_SUCCESS,
            data: editCustomizeStore,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Change password
export const changePassword = async (req, res) => {
    try {
        let { oldPassword, newPassword } = req.body
        let getUser = await User.findOne({ _id: req.user })
        if (!getUser) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_FOUND,
            });
        }
        let checkOldPassword = await bcrypt.compare(oldPassword, getUser.password)
        if (!checkOldPassword) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.OLD_PASSWORD_INCORRECT,
            });
        }
        let checkNewPassword = await bcrypt.compare(newPassword, getUser.password)
        if (checkNewPassword) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.OLD_PASSWORD_NEW_PASSWORD_SAME,
            });
        }
        let hashPassword = await passwordHash(newPassword)
        let changePassword = await User.findByIdAndUpdate(
            { _id: getUser._id },
            {
                $set: { password: hashPassword }
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.PASSWORD_CHANGE_SUCCESS,
            data: changePassword,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Get asset list for user
export const getAssetListForUser = async (req, res) => {
    try {
        let getAllAsset = await Asset.find({ isDeleted: false })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.ASSET_LIST_FETCH_SUCCESS,
            data: getAllAsset,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

const generateQR = async (text) => {
    try {
        return await QRCode.toDataURL(text)
    } catch (err) {
        console.error(err)
    }
}

//#region Request payment
export const requestPayment = async (req, res) => {
    try {
        let { requestFrom, amount, currency, message, link, memoId } = req.body
        let getUserEmail = await User.findOne({ _id: req.user })
        let savePaymentRequest = await Transaction.create({
            requestFrom,
            amount,
            currency,
            message,
            link,
            userId: req.user,
            memoId,
            fromAddress: getUserEmail.publicKey
        })
        let getShareLink = await Transaction.findByIdAndUpdate(
            { _id: savePaymentRequest._id },
            { $set: { shareLink: process.env.QR_CODE_SHARE_LINK + savePaymentRequest._id } },
            { new: true }
        )
        let url = await QRCode.toDataURL(link)
        const base64Data = url.replace(/^data:image\/png;base64,/, "");
        const binaryData = Buffer.from(base64Data, 'base64');
        let saveQRCodeImagePath = `${Date.now()}-qr.png`

        fs.writeFile(`./public/uploads/${saveQRCodeImagePath}`, binaryData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Image saved successfully!');
            }
        });
        let getBusinessName = await Store.findOne({ userId: req.user })
        const mailInfo = await ejs.renderFile("src/views/RequestPayment.ejs", {
            requestFrom: getUserEmail.email,
            fromUser: requestFrom,
            amount: amount,
            currency: currency,
            publicKey: getUserEmail != null ? getUserEmail.publicKey : '',
            qrLink: `${process.env.QR_LIVE_LINK}${saveQRCodeImagePath}`,
            shareLink: getShareLink.shareLink
        });
        sendMail(requestFrom, `Payment Request from ${getBusinessName.businessName}`, mailInfo);

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.PAYMENT_REQUEST_ADD_SUCCESS,
            data: savePaymentRequest,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Get request payment details
export const getRequestPaymentDetails = async (req, res) => {
    try {
        let getRequestPaymentDetails = await Transaction.find({ isDeleted: false, userId: req.user }).sort({ createdAt: -1 })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.TRANSACTION_DETAIL_FETCH_SUCCESS,
            data: getRequestPaymentDetails,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Get invoice number
export const getInvoiceNumber = async (req, res) => {
    try {
        let getBusinessName = await Store.findOne({ userId: req.user })
        let businessName = getBusinessName.businessName.split(' ')
        let invoiceArray = businessName.map((item) => {
            return item.split('')[0].toUpperCase()
        })
        let getInvoiceNumber = await Transaction.countDocuments({ isDeleted: false, userId: req.user })
        let invoiceNumber = invoiceArray.join('') + (getInvoiceNumber + 1)
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.GET_INVOICE_NUMBER_SUCCESS,
            data: invoiceNumber,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Decrypt secret key
export const decryptSecretKey = async (req, res) => {
    try {
        let decrypt = await cryptr.decrypt(req.body.secretKey)

        return res.status(200).json({
            status: StatusCodes.OK,
            data: decrypt,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

export const handleDeposit = async (req, res) => {
    let wallet = walletSdk.Wallet.MainNet();
    console.log("wallet : ", wallet);

    try {
        console.log("anchor : ");

        let anchor = wallet.anchor({ homeDomain: req.body.homeDomain });
        console.log("anchor : ", wallet, anchor);

        const authKey = SigningKeypair.fromSecret(req.body.secretKey);
        console.log("authKey : ", authKey);

        const sep10 = await anchor.sep10();
        console.log("sep10 : ", sep10);

        const walletSigner = DefaultSigner;
        console.log("Wallet Signer : ", walletSigner);

        const authToken = await sep10.authenticate({ accountKp: authKey });
        console.log("\ncreating deposit ..., ", authToken);

        return res.status(200).json({
            status: StatusCodes.OK,
            data: authToken,
        });
    }
    catch (e) {
        console.error("Error occurred:", e);
    }
}

//#region Get contact details
export const getContactDetails = async (req, res) => {
    try {
        let getContactDetails = await ContactDetail.findOne({ isDeleted: false })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.CONTACT_DETAIL_FETCH_SUCCESS,
            data: getContactDetails,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Update request payment status
export const updateRequestPaymentStatus = async (req, res) => {
    try {
        let updateStatus = await Transaction.findOneAndUpdate(
            { memoId: req.body.memoId },
            { $set: { status: 'Completed', transactionID: req.body.transactionID } },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.TRANSACTION_STATUS_UPDATE_SUCCESS,
            data: updateStatus,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}
export const getApplicantToken = async (req, res) => {
    try {
        const { userId } = req.body;

        const userKYC = await Kyc.findOne({ userId });

        const response = await axios.post('https://api.onfido.com/v3.3/applicants', {
            first_name: userKYC.firstName,
            last_name: userKYC.lastName
        }, {
            headers: {
                Authorization: `Token token=${process.env.APPLICANT_TOKEN}`
            }
        });

        if (response.status == 201) {
            const tokenResponse = await axios.post('https://api.onfido.com/v3.3/sdk_token', {
                applicant_id: response.data.id,
            }, {
                headers: {
                    Authorization: `Token token=${process.env.APPLICANT_TOKEN}`
                }
            });
            if (tokenResponse.status == 200) {
                return res.status(200).json({
                    status: StatusCodes.OK,
                    message: ResponseMessage.APPLICANT_TOKEN_FOUND,
                    data: tokenResponse.data.token,
                });
            }
            else {
                return res.status(400).json({
                    status: StatusCodes.BAD_REQUEST,
                    message: ResponseMessage.APPLICANT_TOKEN_NOT_FOUND,
                    data: [],
                });
            }


        }
        else {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.APPLICANT_ACCOUNT_NOT_CREATED,
                data: [],
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

export const updateKycDetails = async (req, res) => {
    try {
        const { userId, ...rest } = req.body;

        const userDetails = await Kyc.findOne({ userId });

        if (!userDetails) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_FOUND,
                data: [],
            });
        }

        const updatedKycDetails = await Kyc.findOneAndUpdate(
            { userId: userId },
            { $set: { ...rest } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYC_DETAILS_UPDATED,
            data: updatedKycDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Decrypt secret key
export const encryptSecretKey = async (req, res) => {
    try {
        let decrypt = await cryptr.encrypt(req.body.secretKey)

        return res.status(200).json({
            status: StatusCodes.OK,
            data: decrypt,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};
export const getAccessToken = async (req, res) => {
    try {
        const { userId } = req.body;

        const url = `/resources/accessTokens?userId=${encodeURIComponent(
            userId
        )}&levelName=${encodeURIComponent(process.env.SUMSUB_APP_LEVEL_NAME)}&ttlInSecs=600`;

        const timestamp = "" + Math.floor(Date.now() / 1000);
        const secret = process.env.SUMSUB_APP_SECRET_KEY;
        const signatureSource = timestamp + "POST" + url;

        const signature = createHmac("sha256", secret)
            .update(signatureSource)
            .digest("hex");

        const headers = {
            "X-App-Token": process.env.SUMSUB_APP_TOKEN,
            "X-App-Access-Sig": signature,
            "X-App-Access-Ts": timestamp,
        };

        axios
            .post(process.env.SUMSUB_API_ROOT + url, null, { headers })
            .then((response) => {
                return res.status(200).json({
                    status: StatusCodes.OK,
                    message: ResponseMessage.ACCESS_TOKEN_GENERATED,
                    data: response.data,
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    status: err.response.data.code,
                    message: err.response.data.description,
                    data: err.response.data,
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};
export const getUserKycAndKybStatus = async (req, res) => {
    try {
        const kycDetails = await Kyc.findOne({ userId: req.user });
        const kybDetails = await Kyb.findOne({ userId: req.user });

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.KYC_KYB_STATUS_FETCHED,
            data: {
                kycStatus: kycDetails && kycDetails.kycStatus,
                kybStatus: kybDetails && kybDetails.kybStatus
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Update FCM Token
export const updateFcmToken = async (req, res) => {
    try {
        const updateFcmToken = await User.findByIdAndUpdate(
            { _id: req.user },
            { $set: { fcmToken: req.body.fcmToken } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.FCM_TOKEN_UPDATE_SUCCESS,
            data: updateFcmToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

export const cancelTransaction = async (req, res) => {
    try {
        const cancelTransaction = await Transaction.findByIdAndUpdate(
            { _id: req.body.id },
            { $set: { status: 'Cancelled' } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.TRANSACTION_CANCEL_SUCCESSFULLY,
            data: cancelTransaction,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Send Request Payment Push Notification
export const sendRequestPaymentPushNotification = async (req, res) => {
    const getTransaction = await axios.get(`https://horizon.stellar.org/transactions/${req.body.transactionHash}`).then((res) => {
        return res.data.memo;
    })
    let getMemo = await Transaction.findOne({ memoId: getTransaction, fromAddress: req.body.toAddress })
    if (getMemo) {
        await Transaction.findByIdAndUpdate(
            { _id: getMemo._id },
            { $set: { status: 'Completed', transactionID: req.body.transactionHash } },
            { new: true }
        )
    }
    try {
        if(req.body.type == 'Send') {
            let fromUser = await User.findOne({ publicKey: req.body.fromAddress })
            let toUser = await User.findOne({ publicKey: req.body.toAddress })
            await SendPushNotification(
                'New Transaction', 
                `You send ${req.body.amount} ${req.body.assetType} to ${req.body.toAddress} at ${moment().format('LL')}`,
                fromUser.fcmToken
            )
            await SendPushNotification(
                'New Transaction', 
                `You received ${req.body.amount} ${req.body.assetType} from ${req.body.fromAddress} at ${moment().format('LL')}`,
                toUser.fcmToken
            )
            await PushNotification.create({
                fromAddress: req.body.fromAddress,
                toAddress: req.body.toAddress,
                amount: req.body.amount,
                type: 'Send',
                transactionHash: req.body.transactionHash,
                assetType: req.body.assetType,
                userId: fromUser._id,
                title: 'New Transaction',
                notificationType: 'Transaction',
                message: `You send ${req.body.amount} ${req.body.assetType} to ${req.body.toAddress} at ${moment().format('LL')}`
            })
            await PushNotification.create({
                fromAddress: req.body.fromAddress,
                toAddress: req.body.toAddress,
                amount: req.body.amount,
                type: 'Receive',
                transactionHash: req.body.transactionHash,
                assetType: req.body.assetType,
                userId: toUser._id,
                title: 'New Transaction',
                notificationType: 'Transaction',
                message: `You received ${req.body.amount} ${req.body.assetType} from ${req.body.fromAddress} at ${moment().format('LL')}`
            })
            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.PUSH_NOTIFICATION_SEND_SUCCESS,
            });
        } else {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'Notification not send',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Get push notification list
export const getUserNotificationList = async (req, res) => {
    try {
        let getNotification = await PushNotification.find({ userId: req.user })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.NOTIFICATION_LIST_FETCH_SUCCESS,
            data: getNotification,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Get single transaction details
export const getSingleTransactionDetails = async (req, res) => {
    try {
        let getTransactionDetails = await Transaction.findOne({ _id: req.params.id })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.TRANSACTION_DETAIL_FETCH_SUCCESS,
            data: getTransactionDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Store last token
export const storeLastToken = async (req, res) => {
    try {
        let storeLastToken = await User.findOneAndUpdate(
            { publicKey: req.body.publicKey },
            { $set: { lastToken: req.body.lastToken } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.LAST_TOKEN_FETCH_SUCCESS,
            data: storeLastToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Get last token
export const getLastToken = async (req, res) => {
    try {
        let getLastToken = await User.find({ lastToken: req.params.lastToken })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.LAST_TOKEN_STORE_SUCCESS,
            data: getLastToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}

//#region Send delete account request
export const sendDeleteAccountRequest = async (req, res) => {
    try {
        let sendDeleteAccountRequest = await User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $set: { sendDeleteAccountRequest: req.body.deleteAccountRequest } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.DELETE_ACCOUNT_REQUEST_SEND_SUCCESS,
            data: sendDeleteAccountRequest,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}