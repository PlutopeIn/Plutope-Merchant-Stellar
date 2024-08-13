import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
        color: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);
export default Color