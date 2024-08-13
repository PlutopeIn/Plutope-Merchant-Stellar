import React from "react";
import Index from "../../../Index";
import { validationAddBusiness } from '../../../../validation/validation';
import PagesIndex from "../../../../component/PagesIndex";

const BusinessModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const { editData, setModalOpen, setEditData, handleClose } = props;

  const initialValues = {
    businessType: editData ? editData?.businessType : "",
  };


  const handleBusinessFormSubmit = async (values) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("businessType", values.businessType);
    if (editData?._id) {
      urlencoded.append("businessId", editData?._id);
    }
    const response = await PagesIndex.postApi(
      PagesIndex.api.admin.addEditBusiness,
      urlencoded
    );
    if (response) {
      setModalOpen(false);
      setEditData("");
    }
  };

  return (
    <Index.Box
      className="modal-delete modal"
    >
      <Index.Box sx={style} className="delete-modal-inner-main modal-inner">
        <Index.Box className="modal-contained-wrap" sx={{ padding: "0" }}>
          <PagesIndex.Formik
            enableReinitialize
            onSubmit={handleBusinessFormSubmit}
            initialValues={initialValues}
            validationSchema={validationAddBusiness}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <Index.Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Index.Box className="tab-cont-box">
                  {/* Image Icon */}
                  <Index.Box className="trash-icon-box">
                    <img src={PagesIndex.Png.aggreement} />
                  </Index.Box>
                  {/* End Image Icon */}
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12} md={12}>
                      <Index.Box className="user-input-box">
                        <Index.FormHelperText className="user-form-lable text-black">
                          {!editData?._id ? "Add Business" : "Edit Business"}
                        </Index.FormHelperText>
                        <Index.Box className="user-form-group">
                          <Index.TextField
                            className="user-form-control text-black"
                            fullWidth
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            name="businessType"
                            value={values.businessType}
                            onChange={handleChange}
                            helperText={touched.businessType && errors.businessType}
                            error={Boolean(errors.businessType && touched.businessType)}
                            placeholder='Business Name'
                          />
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} md={12}>
                      <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
                        <Index.Box className="admin-save-btn-main btn-main-primary">
                          <Index.Button className='admin-adduser-btn btn-primary' type="submit">
                            <img src={PagesIndex.Svg.save} className="admin-user-save-icon" alt='Save'></img>{editData?._id ? "Update" : "Save"}</Index.Button>
                        </Index.Box>
                        <Index.Button
                          className="admin-adduser-btn btn-primary delete-cancel"
                          onClick={props?.handleClose}
                        >
                          Cancel
                        </Index.Button>
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
                </Index.Box>
              </Index.Stack>
            )}
          </PagesIndex.Formik>

          {/* <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
            <Index.Button
              className="admin-adduser-btn btn-primary delete-cancel"
              onClick={props?.handleDeleteClose}
            >
              Cancel
            </Index.Button>
            <Index.Button
              className="admin-adduser-btn btn-primary"
              onClick={props?.handleDeleteRecord}
            >
              {props?.buttonTitle ? props?.buttonTitle : "Delete"}
            </Index.Button>
          </Index.Box> */}
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default BusinessModal;
