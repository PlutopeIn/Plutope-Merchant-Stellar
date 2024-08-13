import React, { useState, useEffect, useRef } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../PagesIndex";
import "../auth.css";
import "../auth.responsive.css";
import { validationSchemaOtpVerify } from "../../../../validation/validation";

// Initital values declaration
let initialValues = {
  otp: "",
};

export default function Otp() {
  const intervalRef = useRef(null);
  const navigate = PagesIndex.useNavigate();
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const { state } = PagesIndex.useLocation();

  // functions declaration
  const handleFormSubmit = async (values) => {
    try {
      const payload = {
        otp: +values.otp,
        email: state?.email,
      };

      let response = await PagesIndex.dataService.post(
        PagesIndex.api.admin.verifyOtp,
        payload
      );
      const { data, message } = response;
      if (data?.status === 200) {
        PagesIndex.successToast(message);
        navigate("/reset-password", {
          state: { id: data?.data?._id },
        });
      }
    } catch (error) {
      PagesIndex.errorToast(error);
    }
  };

  //******* Resend OTP  function  ***********
  useEffect(() => {
    setRemainingSeconds(60);
  }, []);

  const resendOtp = () => {
    setRemainingMinutes(0);
    setRemainingSeconds(60);

    PagesIndex.postApi(PagesIndex.api.admin.resendOtp, { email: state?.email });
  };

  useEffect(() => {
    if (remainingMinutes === 0 && remainingSeconds === 0) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        if (remainingSeconds > 0) {
          setRemainingSeconds((prevSeconds) => prevSeconds - 1);
        } else if (remainingMinutes > 0) {
          setRemainingMinutes((prevMinutes) => prevMinutes - 1);
          setRemainingSeconds(59);
        }
      }, 1000);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [remainingMinutes, remainingSeconds]);
  

  return (
      <Index.Box className="user-auth-main main-bg-user">
        <Index.Box className="main-page-box">
          
          {/* <img src={PagesIndex.Png.mainBackground} className="auth-video" /> */}
          <Index.Box className="user-auth-card-main">
          <Index.Box className="main-page-logo">
            <img src={PagesIndex.Png.logo} />
          </Index.Box>
            <Index.Typography className="user-auth-title">
              OTP Verify
            </Index.Typography>
            <Index.Typography
              component="p"
              variant="p"
              className="user-auth-para"
            >
              Please enter OTP here which is sent on your Email!
            </Index.Typography>

            {/* PageFormik */}
            <PagesIndex.Formik
              enableReinitialize
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchemaOtpVerify}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
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
                  <Index.Box className="auth-body">
                    <Index.Grid container spacing={3}>
                      <Index.Grid item xs={12}>
                        <Index.Box className="form-group">
                          <Index.FormHelperText className="form-lable-otp">
                            Enter OTP
                          </Index.FormHelperText>
                          <Index.Box className="login-otp">
                            <Index.OtpInput
                              fullwidth
                              name="otp"
                              inputStyle="inputStyle"
                              numInputs={4}
                              type="number"
                              renderSeparator={<span>-</span>}
                              value={values.otp}
                              // validateChar="number"
                              onChange={(file) => setFieldValue("otp", file)}
                              // error={Boolean(errors.otp)}
                              helperText={touched.otp && errors.otp}
                              error={Boolean(errors.otp && touched.otp)}
                              className="form-input"
                              renderInput={(props) => <input {...props} />}
                            />
                          </Index.Box>
                        </Index.Box>
                        {errors.otp && (
                          <Index.FormHelperText error>
                            {errors.otp}
                          </Index.FormHelperText>
                        )}

                        <Index.Box className="resend-otp-box">
                          <Index.Typography
                            className="form-lable-otp text-white"
                            variant="p"
                            component="p"
                          >
                            {remainingSeconds != 0 && (
                              <>
                                Resend OTP in{" "}
                                <Index.Typography>
                                  {`0${remainingMinutes}`}:
                                  {remainingSeconds < 10
                                    ? `0${remainingSeconds}`
                                    : remainingSeconds}
                                </Index.Typography>
                              </>
                            )}
                          </Index.Typography>
                          <Index.Typography
                            className=""
                            variant="p"
                            component="p"
                          >
                            <Index.Link
                              class="form-lable-otp justify-content-end"
                              aria-disabled={remainingSeconds != 0}
                              onClick={
                                remainingSeconds != 0 ? undefined : resendOtp
                              }
                              style={{
                                cursor:
                                  remainingSeconds != 0
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              Resend OTP
                            </Index.Link>
                          </Index.Typography>
                        </Index.Box>
                        {/* Button */}
                        <Index.Box className="btn-main-primary user-login-btn-main">
                          <Index.Button
                            type="submit"
                            className="btn-primary user-login-btn"
                          >
                            Submit
                          </Index.Button>
                        </Index.Box>
                      </Index.Grid>
                    </Index.Grid>
                  </Index.Box>
                </Index.Stack>
              )}
            </PagesIndex.Formik>
            {/* End PageFormik */}
          </Index.Box>
        </Index.Box>
      </Index.Box>
  );
}
