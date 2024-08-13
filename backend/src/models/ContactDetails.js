import mongoose from "mongoose";

const contactDetailsSchema = new mongoose.Schema(
    {
        website: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        countryCode: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const ContactDetail = mongoose.model("ContactDetail", contactDetailsSchema);
export default ContactDetail