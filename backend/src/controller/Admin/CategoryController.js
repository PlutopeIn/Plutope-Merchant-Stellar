import Category from "../../models/Category.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";

//#region Add Edit Category
export const addEditCategory = async (req, res) => {
    try {
        if (req.body.categoryId) {
            let updateCategory = await Category.findByIdAndUpdate(
                { _id: req.body.categoryId },
                {
                    $set: {
                        categoryName: req.body.categoryName,
                    }
                },
                { new: true }
            )

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.CATEGORY_UPDATE_SUCCESS,
                data: updateCategory,
            });
        } else {
            let saveCategory = await Category.create({
                categoryName: req.body.categoryName,
            })

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.CATEGORY_CREATE_SUCCESS,
                data: saveCategory,
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

//#region Get all categories
export const getAllCategories = async (req, res) => {
    try {
        let getAllCategory = await Category.find({ isDeleted: false }).sort({ createdAt: -1 })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.CATEGORY_LIST_FETCH_SUCCESS,
            data: getAllCategory,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete Category
export const deleteCategory = async (req, res) => {
    try {
        let deleteCategory = await Category.findByIdAndUpdate(
            { _id: req.body.categoryId },
            { $set: { isDeleted: true } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.CATEGORY_DELETE_SUCCESS,
            data: deleteCategory,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};