import React from "react";
import Index from "../../../Index";
import { validationAddCategory } from '../../../../validation/validation';
import PagesIndex from "../../../../component/PagesIndex";

const CategoryModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const { editData, setModalOpen, setEditData } = props;
  const initialValues = {
    categoryName: editData ? editData?.categoryName : "",
  };


  const handleCategoryFormSubmit = async(values) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("categoryName", values.categoryName);
    if (editData?._id) {
      urlencoded.append("categoryId", editData?._id);
    }
    const response = await PagesIndex.postApi(
      PagesIndex.api.admin.addEditCategory,
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
            onSubmit={handleCategoryFormSubmit}
            initialValues={initialValues}
            validationSchema={validationAddCategory}
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
                    <img src={PagesIndex.Png.checklist} />
                  </Index.Box>
                  {/* End Image Icon */}
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12} md={12}>
                      <Index.Box className="user-input-box">
                        <Index.FormHelperText className="user-form-lable text-black">
                          {!editData?._id ? "Add Category" : "Edit Category"}
                        </Index.FormHelperText>
                        <Index.Box className="user-form-group">
                          <Index.TextField
                            className="user-form-control text-black"
                            fullWidth
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            name="categoryName"
                            value={values.categoryName}
                            onChange={handleChange}
                            helperText={touched.categoryName && errors.categoryName}
                            error={Boolean(errors.categoryName && touched.categoryName)}
                            placeholder='Category Name'
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

export default CategoryModal;
