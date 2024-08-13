import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        businessType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusinessType",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        businessName: {
            type: String,
            required: false,
        },
        mobileNumber: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        countryCode: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        pincode: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store