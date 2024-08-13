import React from "react";
import Index from "../../../Index";
import PagesIndex from "../../../PagesIndex";
import "../auth.css";
import "../auth.responsive.css";
import { validationSchemaForgotpassword } from "../../../../validation/validation";

// Initital values declaration
let initialValues = {
  email: "",
};

export default function ForgotPassWord() {
  // for page redirect
  const navigate = PagesIndex.useNavigate();

  // functions declaration
  const handleFormSubmit = async (values) => {
    try {
      const response = await PagesIndex.dataService.post(
        PagesIndex.api.admin.forgetPassword,
        values
      );
      const { data } = response;
      if (data?.status === 200) {
        PagesIndex.successToast(data?.message);
        navigate("/otp-verify", { state: { email: values.email } });
      }
    } catch (error) {
      PagesIndex.errorToast(error);
    }
  };

  return (
    <>
      {/* New Forgot Screen */}
      <Index.Box className="user-auth-main">
        <Index.Box className="main-page-box">
          
          {/* <img src={PagesIndex.Png.mainBackground} className="auth-video" /> */}
          <Index.Box className="user-auth-card-main">
          <Index.Box className="main-page-logo">
            <img src={PagesIndex.Png.logo} />
          </Index.Box>
            <Index.Typography className="user-auth-title">
              Forgot Password
            </Index.Typography>
            <Index.Typography
              component="p"
              variant="p"
              className="user-auth-para"
            >
              Please enter your email and we'll send you an OTP to on your
              Email!
            </Index.Typography>

            {/* PageFormik */}
            <PagesIndex.Formik
              enableReinitialize
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchemaForgotpassword}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Index.Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <Index.Box className="user-input-box">
                    <Index.FormHelperText className="user-form-lable">
                      Email
                    </Index.FormHelperText>
                    <Index.Box className="user-form-group">
                      <Index.TextField
                        className="user-form-control"
                        fullWidth
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Enter your email"
                        variant="filled"
                        name="email"
                        autoComplete="off"
                        onBlur={handleBlur}
                        // onFocus={() => setLoading(false)}
                        value={values?.email}
                        onChange={(e) => {
                          setFieldValue(
                            "email",
                            e.target.value.toLowerCase().trim()
                          );
                        }}
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                      />
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    className="user-flex-all user-forgot-row"
                    sx={{ justifyContent: "end", gap: "4px" }}
                  >
                    <Index.KeyboardBackspaceIcon className="back-icon" />
                    <Index.Link
                      to="/"
                      className="user-text-decoration-none user-forgot-para"
                    >
                      Back to Login
                    </Index.Link>
                  </Index.Box>
                  <Index.Box className="btn-main-primary user-login-btn-main">
                    <Index.Button
                      type="submit"
                      className="btn-primary user-login-btn"
                    >
                      Submit
                    </Index.Button>
                  </Index.Box>
                </Index.Stack>
              )}
            </PagesIndex.Formik>
            {/* End PageFormik */}

            {/* <Index.Box className="user-condition-content">
          <Index.Typography className="user-condition-text"> Don't have an account? <span className="user-condition-span"><Index.Link className="user-condition-span">Sign Up here</Index.Link></span></Index.Typography>
        </Index.Box> */}
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
