import Font from "../../models/Font.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";

//#region Add Edit Font
export const addEditFont = async (req, res) => {
    try {
        if (req.body.id) {
            let updateFont = await Font.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        font: req.body.font,
                    }
                },
                { new: true }
            )

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.FONT_UPDATE_SUCCESS,
                data: updateFont,
            });
        } else {
            let saveFont = await Font.create({
                font: req.body.font,
            })

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.FONT_CREATE_SUCCESS,
                data: saveFont,
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

//#region Get all font
export const getAllFont = async (req, res) => {
    try {
        let getAllFont = await Font.find({ isDeleted: false }).sort({ createdAt: -1 })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.FONT_LIST_FETCH_SUCCESS,
            data: getAllFont,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete Font
export const deleteFont = async (req, res) => {
    try {
        let deleteFont = await Font.findByIdAndUpdate(
            { _id: req.body.id },
            { $set: { isDeleted: true } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.FONT_DELETE_SUCCESS,
            data: deleteFont,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};