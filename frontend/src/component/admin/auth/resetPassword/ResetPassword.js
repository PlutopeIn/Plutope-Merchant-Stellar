import React, { useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../PagesIndex";
import "../auth.css";
import "../auth.responsive.css";
import { validationSchemaResetPassword } from "../../../../validation/validation";

// Initital values

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = PagesIndex.useNavigate();
  const { state } = PagesIndex.useLocation();
  let initialValues;
  if (state) {
    initialValues = {
      newPassword: "",
      id: state?.id,
      confirm_password: "",
    };
  } else {
    initialValues = {
      newPassword: "",
      id: "",
      confirm_password: "",
    };
  }
  // function declaration
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleFormSubmit = (values) => {
    PagesIndex.postWithNavigate(
      PagesIndex.api.admin.resetPassword,
      values,
      navigate,
      "login"
    );
  };

  return (
    <Index.Box className="user-auth-main main-bg-user">
      <Index.Box className="main-page-box">
        <Index.Box className="main-page-logo">
          <img src={PagesIndex.Svg.logo} />
        </Index.Box>
        <Index.Box className="user-auth-card-main">
          <Index.Typography className="user-auth-title">
            Reset Password
          </Index.Typography>
          <Index.Typography
            component="p"
            variant="p"
            className="user-auth-para"
          >
            Please create your new credentials to sign in!
          </Index.Typography>

          {/* PageFormik */}
          <PagesIndex.Formik
            // enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchemaResetPassword}
          >
            {({
              values,
              errors,
              touched,
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
                <Index.Box className="auth-body">
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12}>
                      <Index.Box className="user-input-box">
                        <Index.FormHelperText className="user-form-lable">
                          New Password
                        </Index.FormHelperText>
                        <Index.Box className="user-form-group">
                          <Index.OutlinedInput
                            className="user-form-control user-form-control-eye"
                            fullWidth
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder="Enter your new password"
                            variant="filled"
                            name="newPassword"
                            data-testid="password-input"
                            aria-label="password"
                            type={showNewPassword ? "text" : "password"}
                            autoComplete="off"
                            inputProps={{
                              className: "input_props",
                            }}
                            InputLabelProps={{ className: "add-formlabel" }}
                            FormHelperTextProps={{
                              className: "input_label_props",
                            }}
                            // onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={values.newPassword}
                            onChange={handleChange}
                            helperText={
                              touched.newPassword && errors.newPassword
                            }
                            error={Boolean(
                              errors.newPassword && touched.newPassword
                            )}
                            endAdornment={
                              <Index.InputAdornment position="end">
                                <Index.IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <Index.VisibilityOff />
                                  ) : (
                                    <Index.Visibility />
                                  )}
                                </Index.IconButton>
                              </Index.InputAdornment>
                            }
                          />
                          {errors.newPassword && (
                            <Index.FormHelperText error>
                              {errors.newPassword}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12}>
                      <Index.Box className="user-input-box">
                        <Index.FormHelperText className="user-form-lable">
                          Confirm Password
                        </Index.FormHelperText>
                        <Index.Box className="user-form-group">
                          <Index.OutlinedInput
                            className="user-form-control user-form-control-eye"
                            fullWidth
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder="Enter your confirm password"
                            variant="filled"
                            name="confirm_password"
                            data-testid="password-input"
                            aria-label="password"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="off"
                            inputProps={{
                              className: "input_props",
                            }}
                            InputLabelProps={{ className: "add-formlabel" }}
                            FormHelperTextProps={{
                              className: "input_label_props",
                            }}
                            // onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={values.confirm_password}
                            onChange={handleChange}
                            helperText={
                              touched.confirm_password &&
                              errors.confirm_password
                            }
                            error={Boolean(
                              errors.confirm_password &&
                                touched.confirm_password
                            )}
                            endAdornment={
                              <Index.InputAdornment position="end">
                                <Index.IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <Index.VisibilityOff />
                                  ) : (
                                    <Index.Visibility />
                                  )}
                                </Index.IconButton>
                              </Index.InputAdornment>
                            }
                          />
                          {errors.confirm_password && (
                            <Index.FormHelperText error>
                              {errors.confirm_password}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
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
