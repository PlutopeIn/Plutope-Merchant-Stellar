import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        requestFrom: {
            type: String,
        },
        amount: {
            type: Number,
            required: false,
        },
        currency: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: false,
        },
        link: {
            type: String,
            required: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: 'Pending',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        shareLink: {
            type: String,
        },
        memoId: {
            type: String,
        },
        transactionID: {
            type: String,
        },
        fromAddress: {
            type: String,
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction