import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        dob: {
            type: String,
        },
        address: {
            type: String,
        },
        country: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isSubmit: {
            type: Boolean,
            default: false,
        },
        kycStatus: {
            type: String,
            default: 'Pending',
        },
        applicantId: {
            type: String,
            required: false,
        },
        frontId: {
            type: String,
            required: false,
        },
        backId: {
            type: String,
            required: false,
        },
        faceId: {
            type: String,
            required: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Kyc = mongoose.model("Kyc", kycSchema);
export default Kyc