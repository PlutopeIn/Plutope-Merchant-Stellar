import React from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import { AddAPhoto, AddToPhotos } from '@mui/icons-material';
import { validationAddAssets } from '../../../../validation/validation';

export default function AddAssets() {
    const { id } = PagesIndex.useParams();
    const navigate = PagesIndex.useNavigate();
    const { state } = PagesIndex.useLocation();
 
    let initialValues;
    if (state) {
        initialValues = {
            assetId: state ? state._id : "",
            image: state ? state.image : "",
            code: state ? state.code : "",
            name: state ? state.name : "",
            domain: state ? state.domain : "",
            featuredBlockTitle: state ? state.featuredBlockTitle : "",
            issuer: state ? state.issuer : "",
        };
    } else {
        initialValues = {
            assetId: "",
            image: "",
            code: "",
            name: "",
            domain: "",
            featuredBlockTitle: "",
            issuer: "",
        };
    }

    const handleFormSubmit = (values) => {
        PagesIndex.postWithNavigate(PagesIndex.api.admin.postAssetsAddEdit,values,navigate,"admin/assets")
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
                                <AddToPhotos />
                            </Index.Box> {id ? "Edit" : "Add"} Assets
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
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationAddAssets}
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
                                    <Index.Grid item xs={12} md={4}>
                                        <Index.Box>
                                            <Index.Box class="author-profile">
                                                <Index.Box class="author-media">
                                                    <Index.Box className="placeholder-text">
                                                        <img src={values.image ? values.image : PagesIndex.Jpg.uploadimg} alt="uploaded file" className="upload-profile-img" />
                                                    </Index.Box>
                                                    {/* <Index.Box class="upload-link" title="" data-bs-toggle="tooltip" data-placement="right" data-original-title="update">
                                                    <input className='update-flie' accept=".jpg, .jpeg, .png, .mpeg, .mp4" name="image" type="file" />
                                                    <AddAPhoto />
                                                </Index.Box> */}
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="user-input-box">
                                                <Index.FormHelperText className="user-form-lable text-black">
                                                    Icon Link
                                                </Index.FormHelperText>
                                                <Index.Box className="user-form-group">
                                                    <Index.TextField
                                                        className="user-form-control text-black"
                                                        fullWidth
                                                        hiddenLabel
                                                        id="filled-hidden-label-normal"
                                                        name="image"
                                                        value={values.image}
                                                        onChange={(e) => setFieldValue("image", e.target.value)}
                                                        helperText={touched.image && errors.image}
                                                        error={Boolean(errors.image && touched.image)}
                                                        placeholder='Icon Link'
                                                    />
                                                </Index.Box>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Grid>
                                    <Index.Grid item xs={12} md={8}>
                                        <Index.Grid>
                                            <Index.Grid container spacing={3}>
                                                <Index.Grid item xs={12} md={6}>
                                                    <Index.Box className="user-input-box">
                                                        <Index.FormHelperText className="user-form-lable text-black">
                                                            Code
                                                        </Index.FormHelperText>
                                                        <Index.Box className="user-form-group">
                                                            <Index.TextField
                                                                className="user-form-control text-black"
                                                                fullWidth
                                                                hiddenLabel
                                                                id="filled-hidden-label-normal"
                                                                name="code"
                                                                value={values.code}
                                                                onChange={handleChange}
                                                                helperText={touched.code && errors.code}
                                                                error={Boolean(errors.code && touched.code)}
                                                                placeholder='Code'
                                                            />
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Grid>
                                                <Index.Grid item xs={12} md={6}>
                                                    <Index.Box className="user-input-box">
                                                        <Index.FormHelperText className="user-form-lable text-black">
                                                            Name
                                                        </Index.FormHelperText>
                                                        <Index.Box className="user-form-group">
                                                            <Index.TextField
                                                                className="user-form-control text-black"
                                                                fullWidth
                                                                hiddenLabel
                                                                id="filled-hidden-label-normal"
                                                                name="name"
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                helperText={touched.name && errors.name}
                                                                error={Boolean(errors.name && touched.name)}
                                                                placeholder='Name'
                                                            />
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Grid>
                                                <Index.Grid item xs={12} md={12}>
                                                    <Index.Box className="user-input-box">
                                                        <Index.FormHelperText className="user-form-lable text-black">
                                                            Home Domain
                                                        </Index.FormHelperText>
                                                        <Index.Box className="user-form-group">
                                                            <Index.TextField
                                                                className="user-form-control text-black"
                                                                fullWidth
                                                                hiddenLabel
                                                                id="filled-hidden-label-normal"
                                                                name="domain"
                                                                value={values.domain}
                                                                onChange={handleChange}
                                                                helperText={touched.domain && errors.domain}
                                                                error={Boolean(errors.domain && touched.domain)}
                                                                placeholder='Home Domain'
                                                            />
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Grid>
                                                <Index.Grid item xs={12} md={12}>
                                                    <Index.Box className="user-input-box">
                                                        <Index.FormHelperText className="user-form-lable text-black">
                                                            Featured Block Title
                                                        </Index.FormHelperText>
                                                        <Index.Box className="user-form-group">
                                                            <Index.TextField
                                                                className="user-form-control text-black"
                                                                fullWidth
                                                                hiddenLabel
                                                                id="filled-hidden-label-normal"
                                                                name="featuredBlockTitle"
                                                                value={values.featuredBlockTitle}
                                                                onChange={handleChange}
                                                                helperText={touched.featuredBlockTitle && errors.featuredBlockTitle}
                                                                error={Boolean(errors.featuredBlockTitle && touched.featuredBlockTitle)}
                                                                placeholder='Featured Block Title'
                                                            />
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Grid>
                                                <Index.Grid item xs={12} md={12}>
                                                    <Index.Box className="user-input-box">
                                                        <Index.FormHelperText className="user-form-lable text-black">
                                                            Issuer
                                                        </Index.FormHelperText>
                                                        <Index.Box className="user-form-group">
                                                            <Index.TextField
                                                                className="user-form-control text-black"
                                                                fullWidth
                                                                hiddenLabel
                                                                id="filled-hidden-label-normal"
                                                                name="issuer"
                                                                value={values.issuer}
                                                                onChange={handleChange}
                                                                helperText={touched.issuer && errors.issuer}
                                                                error={Boolean(errors.issuer && touched.issuer)}
                                                                placeholder='Issuer'
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
                                                <Index.Button className='admin-save-user-btn btn-primary' type="submit">
                                                    <img src={PagesIndex.Svg.save} className="admin-user-save-icon" alt='Save'></img>{id ? "Update" : "Save"}</Index.Button>
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