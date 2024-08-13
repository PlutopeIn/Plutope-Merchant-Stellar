import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Faq = mongoose.model("Faq", faqSchema);
export default Faq