import Admin from "../../models/Admin.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";
import { passwordHash } from '../../services/CommonService.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ejs from 'ejs'
import sendMail from '../../config/email.config.js'
import User from "../../models/User.js";
import Kyb from "../../models/Kyb.js";
import Kyc from "../../models/Kyc.js";
import Store from "../../models/Store.js";
import CustomizeStore from "../../models/CustomizeStore.js";
import ContactDetail from "../../models/ContactDetails.js";
import Transaction from "../../models/Transaction.js";
import { createHmac } from "crypto";
import axios from 'axios'

//#region Admin login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ADMIN_NOT_FOUND,
            });
        }

        if (!bcrypt.compareSync(password, admin.password)) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.INVALID_PASSWORD,
            });
        }

        const token = jwt.sign(
            { admin: { id: admin._id } },
            process.env.JWT_SECRET_KEY
        );

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.ADMIN_LOGIN_SUCCESS,
            data: { admin, token },
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Admin forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const isEmailExists = await Admin.findOne({ email });
        if (!isEmailExists) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.EMAIL_NOT_EXIST,
            });
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000);
        const otpData = await Admin.findByIdAndUpdate(
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

//#region Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const isEmailExists = await Admin.findOne({ email });
        if (!isEmailExists) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.EMAIL_NOT_EXIST,
            });
        }
        const isOTPValid = await Admin.findOne({ email, emailOtp: otp });

        if (isOTPValid) {
            isOTPValid.emailOtp = 0;
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
        const checkEmail = await Admin.findOne({ email });

        if (!checkEmail) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ADMIN_NOT_FOUND,
            });
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000)
        checkEmail.emailOtp = otpCode;
        await checkEmail.save();
        const mailInfo = await ejs.renderFile("src/views/RegisterVerification.ejs", {
            otp: checkEmail.emailOtp,
        });
        sendMail(email, "Verify Otp", mailInfo);

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.RESEND_OTP_SUCCESS,
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
        const checkPassword = await Admin.findOne({ _id: id });
        const passwordMatch = await bcrypt.compare(newPassword, checkPassword.password);
        if (passwordMatch) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.NEW_PASSWORD_SAME_AS_OLD,
            });
        }

        const hashPassword = await passwordHash(newPassword);
        await Admin.findByIdAndUpdate(
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

//#region Get user list
export const getUserList = async (req, res) => {
    try {
        let userList = await User.find({ isDeleted: false, isVerified: true, isActive: true }).sort({ createdAt: -1 })
        let getUsers = userList.map((item) => item._id)
        let getKyb = await Kyb.find({ userId: { $in: getUsers } })
        let getKyc = await Kyc.find({ userId: { $in: getUsers } })
        userList = userList.map(user => {
            const kybDetails = getKyb.filter(kyb => kyb.userId.equals(user._id));
            const kycDetails = getKyc.filter(kyc => kyc.userId.equals(user._id));
            return { ...user._doc, kybDetails: kybDetails, kycDetails: kycDetails };
        });
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_LIST_FETCH_SUCCESS,
            data: userList.filter((item) => item.kycDetails.length && item.kybDetails.length)
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Get user details
export const getUserDetails = async (req, res) => {
    try {
        let userDetails = await User.findOne({ _id: req.params.userId })
        let getKybDetails = await Kyb.findOne({ userId: req.params.userId })
        let getKycDetails = await Kyc.findOne({ userId: req.params.userId })
        let storeDetails = await Store.findOne({ userId: req.params.userId }).populate('businessType').populate('category')
        let customizeStoreDetails = await CustomizeStore.findOne({ userId: req.params.userId })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_DETAIL_FETCH_SUCCESS,
            data: {
                ...userDetails._doc,
                kybDetails: getKybDetails,
                kycDetails: getKycDetails,
                storeDetails: storeDetails,
                customizeStoreDetails: customizeStoreDetails
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Admin profile edit
export async function editProfile(req, res) {
    try {
        const profile =
            req.image.length > 0
                ? req.files.image[0]?.filename
                : req.body.image;

        const updateProfile = await Admin.findByIdAndUpdate(
            { _id: req.admin },
            {
                $set: {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    image: profile,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.ADMIN_PROFILE_UPDATE_SUCCESS,
            data: updateProfile
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
}
//#endregion

//#region Change password
export const changePassword = async (req, res) => {
    try {
        let { oldPassword, newPassword } = req.body
        let getAdmin = await Admin.findOne({ _id: req.admin })
        if (!getAdmin) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ADMIN_NOT_FOUND,
            });
        }
        let checkOldPassword = await bcrypt.compare(oldPassword, getAdmin.password)
        if (!checkOldPassword) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.OLD_PASSWORD_INCORRECT,
            });
        }
        let checkNewPassword = await bcrypt.compare(newPassword, getAdmin.password)
        if (checkNewPassword) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.OLD_PASSWORD_NEW_PASSWORD_SAME,
            });
        }
        let hashPassword = await passwordHash(newPassword)
        let changePassword = await Admin.findByIdAndUpdate(
            { _id: getAdmin._id },
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

//#region Get KYC list
export const getUserKycList = async (req, res) => {
    try {
        let userKycList = await Kyc.find({ isDeleted: false, isSubmit: true }).sort({ createdAt: -1 })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_LIST_FETCH_SUCCESS,
            data: userKycList
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Get KYB list
export const getUserKybList = async (req, res) => {
    try {
        let userKybList = await Kyb.find({ isDeleted: false, isSubmit: true }).sort({ createdAt: -1 })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_LIST_FETCH_SUCCESS,
            data: userKybList
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Approve reject kyc
export const approveRejectKyc = async (req, res) => {
    try {
        let approveRejectKyc = await Kyc.findByIdAndUpdate(
            { _id: req.body.id },
            {
                $set: { kycStatus: req.body.status }
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: approveRejectKyc.kycStatus == 'Approved' ? ResponseMessage.KYC_APPROVED_SUCCESS : ResponseMessage.KYC_REJECT_SUCCESS,
            data: approveRejectKyc,
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

//#region Approve reject kyb
export const approveRejectKyb = async (req, res) => {
    try {
        let approveRejectKyb = await Kyb.findByIdAndUpdate(
            { _id: req.body.id },
            {
                $set: { kybStatus: req.body.status }
            },
            { new: true }
        )
        return res.status(200).json({
            status: StatusCodes.OK,
            message: approveRejectKyb.kybStatus == "Approved" ? ResponseMessage.KYB_APPROVED_SUCCESS : ResponseMessage.KYB_REJECT_SUCCESS,
            data: approveRejectKyb,
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

//#region Approve reject kyc & kyb
export const approveRejectKycAndKyb = async (req, res) => {
    try {
        let approveRejectKyc = await Kyc.findByIdAndUpdate(
            { _id: req.body.kycId },
            {
                $set: { kycStatus: req.body.status }
            },
            { new: true }
        )

        let approveRejectKyb = await Kyb.findByIdAndUpdate(
            { _id: req.body.kybId },
            {
                $set: { kybStatus: req.body.status }
            },
            { new: true }
        )
        const mailInfo = await ejs.renderFile("src/views/RegisterVerification.ejs", {
            status: req.body.status,
        });
        sendMail(email, `KYC & KYB ${req.body.status}`, mailInfo);
        return res.status(200).json({
            status: StatusCodes.OK,
            message: approveRejectKyc.kycStatus == 'Approved' && approveRejectKyb.kybStatus == 'Approved' ? ResponseMessage.KYC_AND_KYB_APPROVED_SUCCESS : ResponseMessage.KYC_AND_KYB_REJECT_SUCCESS,
            data: approveRejectKyc,
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

//#region Save contact details
export const saveContactDetails = async (req, res) => {
    try {
        if (req.body.id) {
            let updateContactDetails = await ContactDetail.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    website: req.body.website,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    countryCode: req.body.countryCode,
                },
                { new: true }
            )
            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.CONTACT_DETAILS_UPDATE_SUCCESS,
                data: updateContactDetails,
            });
        } else {
            let saveContactDetails = await ContactDetail.create({
                website: req.body.website,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                countryCode: req.body.countryCode,
            })
            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.CONTACT_DETAILS_SAVE_SUCCESS,
                data: saveContactDetails,
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

//#region Get request payment list
export const getRequestPaymentList = async (req, res) => {
    try {
        let paymentDetails = await Transaction.find({ isDeleted: false })
            .populate('userId', 'firstName lastName email publicKey')
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.REQUEST_PAYMENT_DETAIL_FETCH_SUCCESS,
            data: paymentDetails
        });

    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Get single request payment details
export const getRequestPaymentDetails = async (req, res) => {
    try {
        let paymentDetails = await Transaction.findOne({ isDeleted: false, _id: req.params.id })
            .populate('userId', 'firstName lastName email publicKey')
        let getStoreDetails = await Store.findOne({ userId: paymentDetails.userId, isDeleted: false })
        let getCustomizeStoreDetails = await CustomizeStore.findOne({ userId: paymentDetails.userId, isDeleted: false })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.REQUEST_PAYMENT_DETAIL_FETCH_SUCCESS,
            data: { ...paymentDetails._doc, storeDetails: getStoreDetails, customizeStoreDetails: getCustomizeStoreDetails }
        });

    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

export const getApplicantDetails = (req, res) => {
    try {
        const url = `/resources/applicants/-;externalUserId=${encodeURIComponent(
            req.params.userId
        )}/one`;

        const timestamp = "" + Math.floor(Date.now() / 1000);
        const secret = process.env.SUMSUB_APP_SECRET_KEY;
        const signatureSource = timestamp + "GET" + url;

        const signature = createHmac("sha256", secret)
            .update(signatureSource)
            .digest("hex");

        const headers = {
            "X-App-Token": process.env.SUMSUB_APP_TOKEN,
            "X-App-Access-Sig": signature,
            "X-App-Access-Ts": timestamp,
        };
        axios
            .get(process.env.SUMSUB_API_ROOT + url, { headers })
            .then((response) => {
                return res.status(200).json({
                    status: StatusCodes.OK,
                    message: ResponseMessage.APPLICANT_DETAILS_FETCHED,
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

//#region Get KYC list
export const getUserKycAndKybList = async (req, res) => {
    try {
        let userKycList = await Kyc.find({ isDeleted: false, isSubmit: true }).sort({ createdAt: -1 })
        let userKybList = await Kyb.find({ isDeleted: false, isSubmit: true }).sort({ createdAt: -1 })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.USER_LIST_FETCH_SUCCESS,
            data: { userKycList, userKybList }
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Get delete account request list
export const getDeleteAccountRequestList = async (req, res) => {
    try {
        let getDeleteAccountRequest = await User.find({ sendDeleteAccountRequest: true }).sort({ createdAt: -1 })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.DELETE_ACCOUNT_REQUEST_LIST_FETCH_SUCCESS,
            data: getDeleteAccountRequest
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete user account
export const deleteAccount = async (req, res) => {
    try {
        let deleteAccount = await User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $set: { isAccountDeleted: req.body.isAccountDeleted, sendDeleteAccountRequest: false } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.ACCOUNT_DELETE_SUCCESS,
            data: deleteAccount,
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