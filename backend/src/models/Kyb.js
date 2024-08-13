import mongoose from "mongoose";

const kybSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: false,
        },
        businessId: {
            type: String,
            required: false,
        },
        businessImage:{
            type: String,
            required: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isSubmit: {
            type: Boolean,
            default: false,
        },
        kybStatus: {
            type: String,
            default: 'Pending',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Kyb = mongoose.model("Kyb", kybSchema);
export default Kyb