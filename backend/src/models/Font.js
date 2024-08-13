import mongoose from "mongoose";

const fontSchema = new mongoose.Schema(
    {
        font: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Font = mongoose.model("Font", fontSchema);
export default Font