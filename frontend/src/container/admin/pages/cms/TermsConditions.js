import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import dataService from '../../../../config/dataService';

export default function TermsConditions() {
  const [addEditData, setAddEditData] = useState();
  const navigate = PagesIndex.useNavigate();
  
  const initialValues = {
    description: addEditData ? addEditData?.description : "",
  }

  // function declaration
  const handleSubmit = (values) => {
    PagesIndex.postApi(
      PagesIndex.api.admin.addEdittermsCondition,
      values
    );

  }

  const getCmsDetails = async () => {
    const data = await PagesIndex.getApi(PagesIndex.api.admin.getCms);
    if (data) {
      const { description } = data?.[0]?.termsAndCondition || {};
      setAddEditData({ description });
    }
  };
  useEffect(() => {
    getCmsDetails();
  }, []);


  // CKEditor custom image upload function
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            dataService
              .post("admin/cms-image", body)
              .then((res) => {
                resolve({
                  default: `${PagesIndex.ImageURL}/${res?.data?.data?.fileName[0]}`,
                });
              })
              .catch((err) => {
                console.log(err, "error msg");
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Index.Box className="admin-dashboard-content admin-user-list-content">
        <Index.Box className="admin-user-list-flex admin-page-title-main">
          <Index.Box class="page-header">
            <Index.Typography variant='h3' class="page-title">
              <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <PagesIndex.ReceiptLongIcon />
              </Index.Box> Terms & Conditions
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
          onSubmit={handleSubmit}
          // onSubmit={handleFormSubmit}
          initialValues={initialValues}
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
                <Index.Grid container spacing={3} sx={{ alignItems: "flex-end" }}>
                  <Index.Grid item xs={12} md={12}>
                    <Index.Grid>
                      <Index.Grid container spacing={3}>
                        <Index.Grid item xs={12} md={12}>
                          <Index.Box className="user-input-box">
                            <Index.FormHelperText className="user-form-lable text-black">
                              Desciprtions
                            </Index.FormHelperText>
                            <Index.Box className="user-form-group">
                              <PagesIndex.CKEditor
                                config={{
                                  toolbar: {
                                    items: [
                                      "heading",
                                      "|",
                                      "bold",
                                      "italic",
                                      "|",
                                      "bulletedList",
                                      "numberedList",
                                      "|",
                                      "link",
                                      "|",
                                      "undo",
                                      "redo",
                                    ],
                                  },
                                  extraPlugins: [uploadPlugin],
                                  mediaEmbed: { previewsInData: true },
                                }}
                                contenteditable="true"
                                editor={PagesIndex.ClassicEditor}
                                name="description"
                                className="ck-editor-img"
                                data={values?.description}
                                onChange={(e, editor) => {
                                  const data = editor.getData();
                                  setFieldValue("description", data);
                                }}
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Grid>
                      </Index.Grid>
                    </Index.Grid>
                  </Index.Grid>
                  <Index.Grid item xs={12} md={12}>
                    <Index.Box className="btn-box-cont">
                      <Index.Box className="admin-discard-btn-main border-btn-main">
                        <Index.Button className='admin-discard-user-btn border-btn'>Discard</Index.Button>
                      </Index.Box>
                      <Index.Box className="admin-save-btn-main btn-main-primary">
                        <Index.Button className='admin-save-user-btn btn-primary' type="submit"><img src={PagesIndex.Svg.save} className="admin-user-save-icon" alt='Save'></img>Save</Index.Button>
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
