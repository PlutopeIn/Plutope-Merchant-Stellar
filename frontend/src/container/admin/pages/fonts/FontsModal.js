import React from "react";
import Index from "../../../Index";
import PagesIndex from "../../../../component/PagesIndex";
import { validationFonts } from '../../../../validation/validation';

const FontModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };


  const { editData, setModalOpen, setEditData, getFontsList } = props;
  const initialValues = {
    id: editData ? editData?._id : "",
    font: editData ? editData?.font : "",
  };


  const handleFontFormSubmit = async(values) => {
    const response = await PagesIndex.postApi(
      PagesIndex.api.admin.addEditFont,
      values
    );
    if (response) {
      setModalOpen(false);
      setEditData("");
      getFontsList();
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
            onSubmit={handleFontFormSubmit}
            initialValues={initialValues}
            validationSchema={validationFonts}
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
                  {/* Image Icon */}
                  <Index.Box className="trash-icon-box">
                    <img src={PagesIndex.Png.fonts} />
                  </Index.Box>
                  {/* End Image Icon */}
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12} md={12}>
                      <Index.Box className="user-input-box">
                        <Index.FormHelperText className="user-form-lable text-black">
                          {!editData?._id ? "Add Font Family" : "Edit Font Family"}
                        </Index.FormHelperText>
                        <Index.Box className="user-form-group">
                          <Index.TextField
                            className="user-form-control text-black font-box"
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            name="font"
                            value={values.font}
                            onChange={handleChange}
                            helperText={touched.font && errors.font}
                            error={Boolean(errors.font && touched.font)}
                            placeholder='Font Family'
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
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default FontModal;
