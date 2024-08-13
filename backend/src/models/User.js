import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: false
        },
        // mobileNumber: {
        //     type: Number,
        //     require: false
        // },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
            required: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        emailOtp: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        fcmToken: {
            type: String,
            required: false,
        },
        publicKey: {
            type: String,
            required: false,
        },
        secretKey: {
            type: String,
            required: false,
        },
        secretPhaseKey: {
            type: String,
            required: false,
        },
        lastToken: {
            type: String,
            required: false,
        },
        sendDeleteAccountRequest: {
            type: Boolean,
            default: false,
        },
        isAccountDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User