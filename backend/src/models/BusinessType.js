import mongoose from "mongoose";

const businessTypeSchema = new mongoose.Schema(
    {
        businessType: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const BusinessType = mongoose.model("BusinessType", businessTypeSchema);
export default BusinessType