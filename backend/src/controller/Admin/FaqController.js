import Faq from "../../models/Faq.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";

//#region Add Edit Faq
export const addEditFaq = async (req, res) => {
    try {
        if (req.body.id) {
            let updateFaq = await Faq.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                    }
                },
                { new: true }
            )

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.FAQ_UPDATE_SUCCESS,
                data: updateFaq,
            });
        } else {
            let saveFaq = await Faq.create({
                title: req.body.title,
                description: req.body.description,
            })

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.FAQ_CREATE_SUCCESS,
                data: saveFaq,
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

//#region Get all faqs
export const getAllFaq = async (req, res) => {
    try {
        let getAllFaq = await Faq.find({ isDeleted: false }).sort({ createdAt: -1 })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.FAQ_LIST_FETCH_SUCCESS,
            data: getAllFaq,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete Faq
export const deleteFaq = async (req, res) => {
    try {
        let deleteFaq = await Faq.findByIdAndUpdate(
            { _id: req.body.id },
            { $set: { isDeleted: true } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.FAQ_DELETE_SUCCESS,
            data: deleteFaq,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};