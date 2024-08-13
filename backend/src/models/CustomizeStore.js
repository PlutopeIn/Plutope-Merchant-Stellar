import mongoose from "mongoose";

const customizeStoreSchema = new mongoose.Schema(
    {
        customFonts: {
            type: String,
            default: ""
        },
        colorCode: {
            type: String,
            required: false,
            default: ""
        },
        logo: {
            type: String,
            required: false,
        },
        coverPhoto: {
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

const CustomizeStore = mongoose.model("CustomizeStore", customizeStoreSchema);
export default CustomizeStore