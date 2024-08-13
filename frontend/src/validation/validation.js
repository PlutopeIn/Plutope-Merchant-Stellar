import * as yup from "yup";
// const phoneRegExp = /^(?!(\d)\1+$)\d{10}$/;
//Login Validation schema
export const validationSchemaLogin = yup.object().shape({
  email: yup
    .string("Please enter email")
    .required("Please enter email")
    .email("Please enter valid email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter valid email"
    ),
  password: yup.string("Please enter password").required("Please enter password")
});

//Forgot password Validation schema
export const validationSchemaForgotpassword = yup.object().shape({
  email: yup
    .string("Please enter email")
    .email("Please enter valid email")
    .matches(
      /^(([^<>()[\]\\.,;:-\s@#"]+(\.[^<>()[\]\\.,;:-\s@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email"
    )
    .required("Please enter email"),
});


// OTP verify Validation schema
export const validationSchemaOtpVerify = yup.object().shape({
  otp: yup
    .string()
    .required("Please enter OTP")
    .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
});


// reset password
export const validationSchemaResetPassword = yup.object().shape({
  newPassword: yup.string()
    .required("Password is required")
    .max(12, "Password cannot exceed 12 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      "Password length should be minimum 8 character including one capital letter, one small letter, one number, and one special character ex. Admin@123"
    ),
  confirm_password: yup
    .string()
    .required("Please enter confirm password")
    .oneOf([yup.ref("password"), null], "Confirm password should same as the password"),
});

export const validationSchemaChangepassword = yup.object().shape({
  oldPassword: yup.string().required("Please enter old password"),
  newPassword: yup
    .string()
    .required("Please enter new password")
    .max(18, "Password cannot exceed 18 characters")
    .notOneOf([yup.ref("oldPassword"), null],
      "Old password and new password should be different")
    .matches(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      "Password length should be minimum 8 character including one capital letter, one small letter, one number, and one special character, ex. Admin@123"
    ),
  confirmPassword: yup
    .string()
    .required("Please enter confirm password")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Confirm password should same as the password"
    ),
});


// Add Assets Validation Schema
export const validationAddAssets = yup.object().shape({
  image: yup.string("Please enter icon link").required("Please enter icon link"),
  code: yup.string("Please enter code").required("Please enter code"),
  name: yup.string("Please enter name").required("Please enter name"),
  domain: yup.string("Please enter domain").required("Please enter domain"),
  featuredBlockTitle: yup.string("Please enter featured block title").required("Please enter featured block title"),
  issuer: yup.string("Please enter issuer").required("Please enter issuer")
});


export const validationAddCategory = yup.object().shape({
  categoryName: yup.string("Please enter category name")
    .required("Please enter category name")
    .max(20, "Title cannot exceed 20 characters")
    .matches(/^[a-zA-Z][a-zA-Z\s']*$/, {
      message: "Please enter category name",
      excludeEmptyString: true,
    })
});

export const validationAddBusiness = yup.object().shape({
  businessType: yup.string("Please enter business name")
    .required("Please enter business name")
    .max(20, "Title cannot exceed 20 characters")
    .matches(/^[a-zA-Z][a-zA-Z\s']*$/, {
      message: "Please enter business name",
      excludeEmptyString: true,
    })
});


export const validationAddFaq = yup.object().shape({
  title: yup.string("Please enter question").required("Please enter question"),
  description: yup.string("Please enter answer").required("Please enter answer")
});

// Contact Us

export const validationContactUs = yup.object().shape({
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter valid email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter valid email"
    ),
  phoneNumber: yup
    .string("Please enter mobile number")
    .required("Please enter mobile number"),
    // .matches(phoneRegExp, "Please enter valid mobile number."),
  website: yup.string("Please enter website url").required("Please enter website url"),
});

// Color Validation
export const validationColor = yup.object().shape({
  color: yup.string("Please select color code").required("Please select color code")
});

// Fonts Validation
export const validationFonts = yup.object().shape({
  font: yup.string("Please select font").required("Please select font")
});
