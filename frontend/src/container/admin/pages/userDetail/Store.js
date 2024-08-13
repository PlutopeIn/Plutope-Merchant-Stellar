import React, { useState } from 'react'
import Index from '../../../Index'
import { StoreMallDirectory } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';
import ImageViewModal from '../../../../component/common/modal/ImageViewModal';

export default function Store({ userDetails }) {
    const navigate = PagesIndex.useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const [open, setOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const handleOpen = (url, name) => {
        setModalImageUrl(url);
        setModalTitle(name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalImageUrl('');
    };

    return (
        <>
            {/* <Index.Box class="page-header-box">
                <Index.Typography variant='h3' class="page-title">
                    <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                        <StoreMallDirectory />
                    </Index.Box> STORE
                </Index.Typography>
                <Index.Box className="back-btn-box">
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box>
            </Index.Box> */}
            <Index.Grid container>
                <Index.Grid items md={6}>
                    <Index.Box className="card-box" sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        <Index.Box className="img-cont-box">
                            <Index.Box className="front-photo">
                                <label className="form-label mb-0 custom-label-title">Logo</label>
                                <Index.Box className="img-detail-box" onClick={() => handleOpen(`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.logo}`, "Logo")}>
                                    <img src={`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.logo}`} alt="Logo" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box className="img-cont-box">
                            <Index.Box className="front-photo">
                                <label className="form-label mb-0 custom-label-title">Cover Photo</label>
                                <Index.Box className="img-detail-box" onClick={() => handleOpen(`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.coverPhoto}`, "Cover Photo")}>
                                    <img src={`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.coverPhoto}`} alt="Cover Photo" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                </Index.Grid>
                <Index.Grid items md={6}>
                    <Index.Box className="card-box">
                        <Index.List className='list-style-1'>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Business Name : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.businessName}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Business Type : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.businessType?.businessType}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Category: </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.category?.categoryName}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Address : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.address}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Mobile Number : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.countryCode} &nbsp; {userDetails?.storeDetails?.mobileNumber}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Pincode : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.pincode}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">City : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.city}</p>
                            </Index.ListItem>
                            {/* <Index.ListItem>
                        <label class="form-label mb-0 custom-label-title">Country Code : </label>
                        <p class="custom-label-subtitle">{userDetails?.storeDetails?.countryCode}</p>
                    </Index.ListItem> */}
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Country : </label>
                                <p class="custom-label-subtitle">{userDetails?.storeDetails?.country}</p>
                            </Index.ListItem>
                        </Index.List>
                    </Index.Box>
                </Index.Grid>
            </Index.Grid>

            <ImageViewModal
                open={open}
                handleClose={handleClose}
                modalImageUrl={modalImageUrl}
                modalName={modalTitle}
            />

        </>
    )
}
