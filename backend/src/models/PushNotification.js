import mongoose from "mongoose";

const PushNotificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        fromAddress: {
            type: String,
            required: false,
        },
        toAddress: {
            type: String,
            required: false,
        },
        transactionHash: {
            type: String,
            required: false,
        },
        memo: {
            type: String,
            required: false,
        },
        amount: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: false,
        },
        readUnread: {
            type: Boolean,
            default: false,
            required: false
        },
        type: {
            type: String,
            required: false,
        },
        assetType: {
            type: String,
            required: false,
        },
        notificationType: {
            type: String,
            required: false,
        },
        isDeleted: {
            type: Boolean,
            require: false,
            default: false,
        },
    },
    { timestamps: true }
);

const PushNotification = mongoose.model("PushNotification", PushNotificationSchema);
export default PushNotification;
