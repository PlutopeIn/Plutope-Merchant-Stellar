import CMSModel from "../../models/Cms.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import Admin from "../../models/Admin.js";
import { StatusCodes } from "http-status-codes";

//#region Add edit privacy policy
export const addEditPrivacyPolicy = async (req, res) => {
    try {
        let checkAdmin = await Admin.findById({ _id: req.admin });
        if (checkAdmin) {
            let privacyPolicyExist = await CMSModel.findOne();
            if (privacyPolicyExist) {
                if (privacyPolicyExist.privacyPolicy !== null) {
                    const updatePrivacyPolicy = await CMSModel.findByIdAndUpdate(
                        { _id: privacyPolicyExist._id },
                        {
                            $set: {
                                "privacyPolicy.description": req.body.description,
                            },
                        },
                        { new: true }
                    );

                    return res.status(200).json({
                        status: StatusCodes.OK,
                        message: ResponseMessage.PRIVACY_POLICY_UPDATE_SUCCESS,
                        data: updatePrivacyPolicy,
                    });
                }
            } else {
                let privacyPolicy = await CMSModel.create({
                    "privacyPolicy.description": req.body.description,
                });
                return res.status(200).json({
                    status: StatusCodes.OK,
                    message: ResponseMessage.PRIVACY_POLICY_ADD_SUCCESS,
                    data: privacyPolicy,
                });
            }
        } else {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ADMIN_NOT_FOUND,
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
};
//#endregion

//#region Add edit terms and condition
export async function addEditTermsAndCondition(req, res) {
    try {
        let checkAdmin = await Admin.findById({ _id: req.admin });
        if (checkAdmin) {
            let termsAndConditionExist = await CMSModel.findOne();
            if (termsAndConditionExist) {
                if (termsAndConditionExist.termsAndCondition !== null) {
                    const updateTermsandCondition = await CMSModel.findByIdAndUpdate(
                        { _id: termsAndConditionExist._id },
                        {
                            $set: {
                                "termsAndCondition.description": req.body.description,
                            },
                        }, 
                        { new: true }
                    );

                    return res.status(200).json({
                        status: StatusCodes.OK,
                        message: ResponseMessage.TERMS_AND_CONDITION_UPDATE_SUCCESS,
                        data: updateTermsandCondition,
                    });
                }
            } else {
                let termsAndCondition = await CMSModel.create({
                    "termsAndCondition.description": req.body.description,
                })
                return res.status(200).json({
                    status: StatusCodes.OK,
                    message: ResponseMessage.TERMS_AND_CONDITION_ADD_SUCCESS,
                    data: termsAndCondition,
                });
            }
        } else {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.ADMIN_NOT_FOUND,
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
};
//#endregion

//#region Get cms api
export async function getCms(req, res) {
    try {
        const CMSData = await CMSModel.find({ isDeleted: false }).sort({ 'createdAt': -1 });
        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.CMS_DETAIL_FETCH_SUCCESS,
            data: CMSData,
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
//#endregion