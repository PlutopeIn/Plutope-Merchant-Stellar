import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: false
        },
        email: {
            type: String,
            require: false
        },
        password: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        mobileNumber: {
            type: Number,
            required: false,
        },
        emailOtp: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        fcmToken: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin