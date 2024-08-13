import BusinessType from "../../models/BusinessType.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";

//#region Add Edit BusinessType
export const addEditBusinessType = async (req, res) => {
    try {
        if (req.body.businessId) {
            let updateBusinessType = await BusinessType.findByIdAndUpdate(
                { _id: req.body.businessId },
                {
                    $set: {
                        businessType: req.body.businessType,
                    }
                },
                { new: true }
            )

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.BUSINESS_UPDATE_SUCCESS,
                data: updateBusinessType,
            });
        } else {
            let saveBusinessType = await BusinessType.create({
                businessType: req.body.businessType,
            })

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.BUSINESS_CREATE_SUCCESS,
                data: saveBusinessType,
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

//#region Get all business type
export const getAllBusinessType = async (req, res) => {
    try {
        let getAllBusiness = await BusinessType.find({ isDeleted: false }).sort({ createdAt: -1 })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.BUSINESS_LIST_FETCH_SUCCESS,
            data: getAllBusiness,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete Business
export const deleteBusiness = async (req, res) => {
    try {
        let deleteBusiness = await BusinessType.findByIdAndUpdate(
            { _id: req.body.businessId },
            { $set: { isDeleted: true } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.BUSINESS_DELETE_SUCCESS,
            data: deleteBusiness,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};