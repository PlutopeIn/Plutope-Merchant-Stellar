import React from "react";
import Index from "../../../Index";
import PagesIndex from "../../../PagesIndex";
import { adminLogin } from "../../../../redux/features/slices/admin/adminSlice";
import "../auth.css";
import "../auth.responsive.css";
import { validationSchemaLogin } from "../../../../validation/validation";

// Initital values
let initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  // #region states
  const [showPassword, setShowPassword] = PagesIndex.useState(false);
  const dispatch = PagesIndex.useDispatch();
  const navigate = PagesIndex.useNavigate();

  // #region functions
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginFormSubmit = async (values) => {
    try {
      const response = await PagesIndex.dataService.post(
        PagesIndex.api.admin.login,
        values
      );
      const { data } = response;
      if (data?.status === 200) {
        PagesIndex.successToast(data?.message);
        dispatch(adminLogin(data?.data));
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      PagesIndex.errorToast(error);
    }
  };

  return (
    <Index.Box className="user-auth-main">
      <Index.Box className="main-page-box">

        {/* <img src={PagesIndex.Png.mainBackground} className="auth-video" /> */}
        <Index.Box className="user-auth-card-main">
          <Index.Box className="main-page-logo">
            <img src={PagesIndex.Png.logo} />
          </Index.Box>
          <Index.Typography className="user-auth-title">
            Sign In
          </Index.Typography>
          <Index.Typography
            component="p"
            variant="p"
            className="user-auth-para"
          >
            Please enter your credentials to sign in!
          </Index.Typography>

          {/* PageFormik */}
          <PagesIndex.Formik
            // enableReinitialize
            onSubmit={handleLoginFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchemaLogin}
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
                      placeholder="Email"
                      variant="filled"
                      name="email"
                      data-testid="email-input"
                      autoComplete="off"
                      onBlur={handleBlur}
                      // onFocus={handleFocus}
                      value={values.email}
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
                <Index.Box className="user-input-box">
                  <Index.FormHelperText className="user-form-lable">
                    Password
                  </Index.FormHelperText>
                  <Index.Box className="user-form-group">
                    <Index.OutlinedInput
                      className="user-form-control user-form-control-eye"
                      fullWidth
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      placeholder="Password"
                      variant="filled"
                      name="password"
                      data-testid="password-input"
                      aria-label="password"
                      type={showPassword ? "text" : "password"}
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
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      endAdornment={
                        <Index.InputAdornment position="end">
                          <Index.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Index.VisibilityOff />
                            ) : (
                              <Index.Visibility />
                            )}
                          </Index.IconButton>
                        </Index.InputAdornment>
                      }
                    />

                    {errors.password && (
                      <Index.FormHelperText error>
                        {errors.password}
                      </Index.FormHelperText>
                    )}
                  </Index.Box>
                </Index.Box>
                <Index.Box className="user-flex-all user-forgot-row justify-content-end">
                  {/* <Index.Box className="user-checkbox-main">
                  <BpCheckbox />
                  <Index.Typography className="user-checkbox-lable">Remember Me</Index.Typography>
                </Index.Box> */}
                  <Index.Link
                    to="/forgot-password"
                    className="user-text-decoration-none user-forgot-para"
                  >
                    Forgot Password?
                  </Index.Link>
                </Index.Box>
                <Index.Box className="btn-main-primary user-login-btn-main">
                  <Index.Button
                    type="submit"
                    className="btn-primary user-login-btn"
                  >
                    Sign In
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
  );
}
