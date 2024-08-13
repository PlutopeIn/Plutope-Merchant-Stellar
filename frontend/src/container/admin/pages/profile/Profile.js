import React, { useState } from 'react'
import Index from '../../../Index'
import { AddAPhoto } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';
import { updateAdminData } from '../../../../redux/features/slices/admin/adminSlice';

export default function Profile() {
  const [image, setImage] = useState("");
  const [fileType, setFileType] = useState("");
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();

  const handleBack = () => {
    navigate(-1);
  };

  const adminDetails = PagesIndex.useSelector((state) => state.admin.adminDetails);

  const initialValues = {
    email: adminDetails ? adminDetails?.email : "",
    fullName: adminDetails ? adminDetails?.fullName : "",
    mobileNumber: adminDetails ? adminDetails?.mobileNumber : "",
    image: adminDetails ? adminDetails?.image : "",
  };
  const handleProfileChange = (e) => {
    if (e.target.files.length != 0) {
      setImage(e.target.files[0]);
      const type = e.target.files[0].type;
      const typeArry = type?.split('/');
      setFileType(typeArry[0])
    }
  };
  
  const userProfileFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("mobileNumber", values.mobileNumber);
    formData.append("image", values.image ? values.image : adminDetails?.image);
    PagesIndex.postWithDispatch(PagesIndex.api.admin.updateProfile,formData,dispatch,updateAdminData)
  };

  return (
    <>
      <Index.Box className="admin-dashboard-content admin-user-list-content">
        <Index.Box className="admin-user-list-flex admin-page-title-main">
          <Index.Box class="page-header">
            <Index.Typography variant='h3' class="page-title">
              <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <PagesIndex.SwitchAccountIcon />
              </Index.Box> Profile
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
          enableReinitialize
          initialValues={initialValues}
          onSubmit={userProfileFormSubmit}
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
                <Index.Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
                  <Index.Grid item xs={12} md={4}>
                    <Index.Box>
                      
                        <Index.Box class="author-media">
                          <Index.Box className="placeholder-text">
                            {/* <img src={values.image ? values.image : PagesIndex.Jpg.uploadimg} alt="uploaded file" className="upload-profile-img" /> */}
                          </Index.Box>
                        </Index.Box>
                     
                      <Index.Box className="user-input-box">
                        <Index.FormHelperText className="user-form-lable text-black text-center">
                          Upload Image
                        </Index.FormHelperText>
                        <Index.Box class="author-profile">
                          <Index.Box class="author-media">
                            <Index.Box className="placeholder-text">
                              {/* <img src={values.image ? values.image : PagesIndex.Png.uploadimg} alt="uploaded file" className="upload-profile-img" /> */}
                              <img
                                src={
                                  (image && fileType === 'image')
                                    ? URL.createObjectURL(image)
                                    : adminDetails?.image !== ""
                                      ? `${PagesIndex.ImageURL}${adminDetails?.image}`
                                      : PagesIndex.Png.uploaddefault
                                }
                                alt="Image Preview"
                                className="upload-profile-img"
                              />
                            </Index.Box>
                            <Index.Box class="upload-link" title="" data-bs-toggle="tooltip" data-placement="right" data-original-title="update">
                              <input className='update-flie' accept=".jpg, .jpeg, .png" name="image" type="file"
                                onChange={(e) => {
                                  handleProfileChange(e);
                                  setFieldValue(
                                    "image",
                                    e?.target?.files[0]
                                      ? e?.target?.files[0]
                                      : values.image
                                  );
                                }}
                              />
                              <AddAPhoto />
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        {/* <Index.Box>
                          <Index.Box className="user-detail-img">
                          </Index.Box>
                          <Index.Box className="common-button grey-button change-profile res-set-search">
                            <Index.Button variant="contained" type="button">
                              Change Profile
                            </Index.Button>
                            <input
                              type="file"
                              className="change-profile-input"
                              accept="image/jpeg"
                              name="image"
                              // onChange={handleProfileChange}
                              onChange={(e) => {
                                handleProfileChange(e);
                                setFieldValue(
                                  "image",
                                  e?.target?.files[0]
                                    ? e?.target?.files[0]
                                    : values.image
                                );
                              }}
                            />
                          </Index.Box>
                        </Index.Box> */}
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>
                  <Index.Grid item xs={12} md={8}>
                    <Index.Grid>
                      <Index.Grid container spacing={3}>
                        <Index.Grid item xs={12} md={12}>
                          <Index.Box className="user-input-box">
                            <Index.FormHelperText className="user-form-lable text-black">
                              Full Name
                            </Index.FormHelperText>
                            <Index.Box className="user-form-group">
                              <Index.TextField
                                className="user-form-control text-black"
                                fullWidth
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                name="fullName"
                                onBlur={handleBlur}
                                value={values.fullName}
                                onChange={handleChange}
                                placeholder='Full Name'
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Grid>
                        <Index.Grid item xs={12} md={12}>
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
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                placeholder='Email'
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Grid>
                        <Index.Grid item xs={12} md={12}>
                          <Index.Box className="user-input-box">
                            <Index.FormHelperText className="user-form-lable text-black">
                              Mobile Number
                            </Index.FormHelperText>
                            <Index.Box className="user-form-group">
                              <Index.TextField
                                className="user-form-control text-black"
                                fullWidth
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                name="mobileNumber"
                                type="number"
                                onBlur={handleBlur}
                                value={values.mobileNumber}
                                onChange={handleChange}
                                placeholder='Mobile Number'
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Grid>
                      </Index.Grid>
                    </Index.Grid>
                  </Index.Grid>
                  <Index.Grid item xs={12} md={12}>
                    <Index.Box className="btn-box-cont">
                      <Index.Box className="admin-save-btn-main btn-main-primary">
                        <Index.Button className='admin-save-user-btn btn-primary' type="submit"><img src={PagesIndex.Svg.save} className="admin-user-save-icon" alt='Save'></img>Update Profile</Index.Button>
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>
                </Index.Grid>
              </Index.Box>
            </Index.Stack>
          )}
        </PagesIndex.Formik>
        {/* End PageFormik */}

      </Index.Box>
    </>
  )
}
