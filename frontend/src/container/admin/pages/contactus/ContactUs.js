import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../../component/PagesIndex";
import MuiPhoneNumber from "material-ui-phone-number";
import { validationContactUs } from "../../../../validation/validation";

export default function ContactUs() {
  const navigate = PagesIndex.useNavigate();
  const [addEditData, setAddEditData] = useState();

  const initialValues = {
    id: addEditData ? addEditData?._id : "",
    website: addEditData ? addEditData?.website : "",
    email: addEditData ? addEditData?.email : "",
    // phoneNumber: addEditData ? addEditData?.phoneNumber : "",
    phoneNumber: addEditData
      ? String(`${addEditData?.countryCode}${addEditData?.phoneNumber}`)
      : " ",
    // countryCode: addEditData ? addEditData?.countryCode : "",
    countryCode: addEditData ? addEditData.countryCode : "in",
  };

  const getContactUsDetails = async () => {
    const data = await PagesIndex.getApi(
      PagesIndex.api.admin.getContactDetails
    );
    if (data) {
      setAddEditData(data);
    }
  };
  useEffect(() => {
    getContactUsDetails();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmitContactUs = (values) => {
    PagesIndex.postApi(PagesIndex.api.admin.addEditContactUS, values);
  };

  return (
    <>
      <Index.Box className="admin-dashboard-content admin-user-list-content">
        <Index.Box className="admin-user-list-flex admin-page-title-main">
          <Index.Box class="page-header">
            <Index.Typography variant="h3" class="page-title">
              <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <PagesIndex.ReceiptLongIcon />
              </Index.Box>{" "}
              Contact Us
            </Index.Typography>
          </Index.Box>
          <Index.Box className="back-btn-box">
            <Index.Button
              onClick={() => handleBack()}
              className="back-btn"
              type="submit"
            >
              <PagesIndex.KeyboardDoubleArrowLeftIcon />
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>

      {/* PageFormik */}
      <PagesIndex.Formik
        enableReinitialize
        onSubmit={handleSubmitContactUs}
        initialValues={initialValues}
        validationSchema={validationContactUs}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Index.Stack
            component="form"
            spacing={2}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Index.Box className="tab-cont-box">
              <Index.Grid
                container
                spacing={3}
                sx={{ alignItems: "flex-start" }}
              >
                <Index.Grid item xs={12} md={6}>
                  <Index.Box className="user-input-box">
                    <Index.FormHelperText className="user-form-lable text-black">
                      Country Code
                    </Index.FormHelperText>
                    <Index.Box className="user-form-group">
                      <MuiPhoneNumber
                        defaultCountry={"in"}
                        className="user-form-control text-black country-btn"
                        value={values?.phoneNumber}
                        onChange={(value, countryData) => {
                          if (value.length > 0 && value.length !== 0) {
                            const phoneNumberDigits = value.replace(/\D/g, ""); // Remove non-numeric characters
                            let countryCode = countryData?.dialCode;
                            setFieldValue(
                              "phoneNumber",
                              +phoneNumberDigits.slice(
                                countryCode.length,
                                phoneNumberDigits.length
                              )
                            );
                            setFieldValue(
                              "countryCode",
                              `${"+"}${countryData.dialCode}`
                            );
                            setFieldValue("country", countryData.name);
                          }
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                {/* <Index.Grid item xs={12} md={4}>
                                    <Index.Box className="user-input-box">
                                        <Index.FormHelperText className="user-form-lable text-black">
                                            Phone Number
                                        </Index.FormHelperText>
                                        <Index.Box className="user-form-group">
                                            <Index.TextField
                                                className="user-form-control text-black"
                                                fullWidth
                                                hiddenLabel
                                                id="filled-hidden-label-normal"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                            />
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Grid> */}
                <Index.Grid item xs={12} md={6}>
                  <Index.Box className="user-input-box">
                    <Index.FormHelperText className="user-form-lable text-black">
                      Email
                    </Index.FormHelperText>
                    <Index.Box className="user-form-group">
                      <Index.TextField
                        className="user-form-control text-black"
                        fullWidth
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email"
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={12}>
                  <Index.Box className="user-input-box">
                    <Index.FormHelperText className="user-form-lable text-black">
                      Website
                    </Index.FormHelperText>
                    <Index.Box className="user-form-group">
                      <Index.TextField
                        className="user-form-control text-black"
                        fullWidth
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        name="website"
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Website"
                        helperText={touched.website && errors.website}
                        error={Boolean(errors.website && touched.website)}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={12}>
                  <Index.Box className="btn-box-cont">
                    <Index.Box className="admin-save-btn-main btn-main-primary">
                      <Index.Button
                        className="admin-save-user-btn btn-primary"
                        type="submit"
                      >
                        <img
                          src={PagesIndex.Svg.save}
                          className="admin-user-save-icon"
                          alt="Save"
                        ></img>
                        Update
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
            </Index.Box>
          </Index.Stack>
        )}
      </PagesIndex.Formik>
      {/* End PageFormik */}
    </>
  );
}
