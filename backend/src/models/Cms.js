import mongoose from "mongoose";

const CMSSchema = new mongoose.Schema(
  {
    privacyPolicy: {
      description: {
        type: String,
        require: false,
      },
    },
    aboutUs: {
      description: {
        type: String,
        require: false,
      },
    },
    termsAndCondition: {
      description: {
        type: String,
        require: false,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const CMSModel = mongoose.model("CMS", CMSSchema);
export default CMSModel;