import Asset from "../../models/Asset.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";

//#region Create asset
export const addEditAsset = async (req, res) => {
    try {
        const { code, issuer, name, image, customShortDescription, domain, featuredBlockTitle } = req.body;
        if(req.body.assetId) {
            let updateAsset = await Asset.findByIdAndUpdate(
                { _id: req.body.assetId }, 
                { $set: {
                    code: code,
                    issuer: issuer,
                    name: name,
                    image: image,
                    customShortDescription: customShortDescription,
                    domain: domain,
                    featuredBlockTitle: featuredBlockTitle
                } },
                { new: true }
            )

            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.ASSET_UPDATE_SUCCESS,
                data: updateAsset,
            });
        } else {
            let saveAsset = await Asset.create({
                code,
                issuer,
                name,
                image,
                customShortDescription,
                domain,
                featuredBlockTitle
            })
    
            return res.status(200).json({
                status: StatusCodes.OK,
                message: ResponseMessage.ASSET_CREATE_SUCCESS,
                data: saveAsset,
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

//#region Get all asset
export const getAllAsset = async (req, res) => {
    try {
        let getAllAsset = await Asset.find({ isDeleted: false }).sort({ createdAt: -1 })

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

//#region Get single asset details
export const getAssetDetails = async (req, res) => {
    try {
        let getAsset = await Asset.findOne({ _id: req.params.assetId })

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.ASSET_DETAILS_FETCH_SUCCESS,
            data: getAsset,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};

//#region Delete asset
export const deleteAsset = async (req, res) => {
    try {
        let deleteAsset = await Asset.findByIdAndUpdate(
            { _id: req.body.assetId },
            { $set: { isDeleted: true } },
            { new: true }
        )

        return res.status(200).json({
            status: StatusCodes.OK,
            message: ResponseMessage.ASSET_DELETE_SUCCESS,
            data: deleteAsset,
        });
    } catch (error) {
        return res.status(500).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.INTERNAL_SERVER_ERROR,
            data: error.message,
        });
    }
};