import Color from "../../models/Color.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";

//#region Add Edit Color
export const addEditColor = async (req, res) => {
    try {
        if (req.body.id) {
            let updateColor = await Color.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        color: req.body.color,
                    }
                },
                { new: true }
            )

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.COLOR_UPDATE_SUCCESS,
                data: updateColor,
            });
        } else {
            let saveColor = await Color.create({
                color: req.body.color,
            })

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.COLOR_CREATE_SUCCESS,
                data: saveColor,
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

//#region Get all color
export const getAllColor = async (req, res) => {
    try {
        let getAllColor = await Color.find({ isDeleted: false }).sort({ createdAt: -1 })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.COLOR_LIST_FETCH_SUCCESS,
            data: getAllColor,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete Color
export const deleteColor = async (req, res) => {
    try {
        let deleteColor = await Color.findByIdAndUpdate(
            { _id: req.body.id },
            { $set: { isDeleted: true } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.COLOR_DELETE_SUCCESS,
            data: deleteColor,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};