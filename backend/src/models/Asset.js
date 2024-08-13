import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
    {
        code: {
            type: String,
        },
        issuer: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        customShortDescription: {
            type: String,
            required: false,
        },
        domain: {
            type: String,
            required: false,
        },
        featuredBlockTitle: {
            type: String,
            required: false,
        },
        featured: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);
export default Asset