import React, { useState } from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import { validationSchemaChangepassword } from '../../../../validation/validation';

export default function ChangePassword() {
    const navigate = PagesIndex.useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Initital values declaration
    let initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    // function declaration
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((show) => !show);
    };

    const handleFormSubmit = (values) => {
        PagesIndex.postApi(PagesIndex.api.admin.changePassword, values)
    };

    return (

            <Index.Box className="admin-dashboard-content admin-user-list-content">
                <Index.Box className="admin-user-list-flex admin-page-title-main">
                    <Index.Box class="page-header">
                        <Index.Typography variant='h3' class="page-title">
                            <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                                <PagesIndex.SwitchAccountIcon />
                            </Index.Box> Change Password
                        </Index.Typography>
                    </Index.Box>
                    <Index.Box className="back-btn-box">
                        <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                            <PagesIndex.KeyboardDoubleArrowLeftIcon />
                        </Index.Button>
                    </Index.Box>
                </Index.Box>

                {/* PageFormik */}
                <PagesIndex.Formik
                    // enableReinitialize
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchemaChangepassword}
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

                            <Index.Grid container sx={{ justifyContent: "center" }}>
                                <Index.Grid item xs={12} md={4}>
                                    <Index.Box className="tab-cont-box reset-pwd-box">
                                        <Index.Box className="auth-body">
                                            <Index.Grid container spacing={3}>
                                                <Index.Grid item xs={12}>
                                                    <Index.Box className="user-input-box">
                                                        <Index.FormHelperText className="user-form-lable">
                                                            Old Password
                                                        </Index.FormHelperText>
                                                        <Index.Box className="user-form-group">
                                                            <Index.OutlinedInput
                                                                className="user-form-control user-form-control-eye"
                                                                fullWidth
                                                                hiddenLabel
                                                                id="filled-hidden-label-normal"
                                                                placeholder="Old Password"
                                                                variant="filled"
                                                                name="oldPassword"
                                                                data-testid="password-input"
                                                                aria-label="password"
                                                                type={showOldPassword ? "text" : "password"}
                                                                autoComplete="off"
                                                                inputProps={{
                                                                    className: "input_props",
                                                                }}
                                                                InputLabelProps={{ className: "add-formlabel" }}
                                                                FormHelperTextProps={{
                                                                    className: "input_label_props",
                                                                }}
                                                                onBlur={handleBlur}
                                                                value={values.oldPassword}
                                                                onChange={handleChange}
                                                                helperText={touched.oldPassword && errors.oldPassword}
                                                                error={Boolean(
                                                                    errors.oldPassword && touched.oldPassword
                                                                )}
                                                                endAdornment={
                                                                    <Index.InputAdornment position="end">
                                                                        <Index.IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowOldPassword}
                                                                            edge="end"
                                                                        >
                                                                            {showOldPassword ? (
                                                                                <Index.VisibilityOff />
                                                                            ) : (
                                                                                <Index.Visibility />
                                                                            )}
                                                                        </Index.IconButton>
                                                                    </Index.InputAdornment>
                                                                }
                                                            />
                                                             {
                                                                errors.oldPassword && (
                                                                    <Index.FormHelperText error>
                                                                        {errors.oldPassword}
                                                                    </Index.FormHelperText>
                                                                )
                                                            }
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Grid>
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
                                                                placeholder="New Password"
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
                                                                helperText={touched.newPassword && errors.newPassword}
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
                                                            {
                                                                errors.newPassword && (
                                                                    <Index.FormHelperText error>
                                                                        {errors.newPassword}
                                                                    </Index.FormHelperText>
                                                                )
                                                            }
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
                                                                placeholder="Confirm Password"
                                                                variant="filled"
                                                                name="confirmPassword"
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
                                                                value={values.confirmPassword}
                                                                onChange={handleChange}
                                                                helperText={
                                                                    touched.confirmPassword &&
                                                                    errors.confirmPassword
                                                                }
                                                                error={Boolean(
                                                                    errors.confirmPassword &&
                                                                    touched.confirmPassword
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
                                                            {
                                                                errors.confirmPassword && (
                                                                    <Index.FormHelperText error>
                                                                        {errors.confirmPassword}
                                                                    </Index.FormHelperText>
                                                                )
                                                            }
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Grid>
                                                <Index.Grid item xs={12}>
                                                    {/* Button */}
                                                    <Index.Box className="btn-main-primary user-login-btn-main">
                                                        <Index.Button type="submit" className="btn-primary user-login-btn">
                                                            Submit
                                                        </Index.Button>
                                                    </Index.Box>
                                                </Index.Grid>
                                            </Index.Grid>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Grid>
                            </Index.Grid>
                        </Index.Stack>
                    )}
                </PagesIndex.Formik>
                {/* End PageFormik */}


            </Index.Box>
       
    )
}
