import React, { useState } from 'react'
import Index from '../../../Index'
import { SettingsSuggest } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';
import { Close } from '@mui/icons-material';
import ImageViewModal from '../../../../component/common/modal/ImageViewModal';

export default function CustomStore({ userDetails }) {
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
            <Index.Box class="page-header-box">
                <Index.Typography variant='h3' class="page-title">
                    <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                        <SettingsSuggest />
                    </Index.Box> Customize Store Details
                </Index.Typography>
                {/* <Index.Box className="back-btn-box">
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box> */}
            </Index.Box>

            <Index.Box className="card-box">
                <Index.Grid container spacing={3} sx={{ alignItems: "end" }}>
                    <Index.Grid item xs={12} md={2}>
                        <Index.Box className="img-cont-box">
                            <Index.Box className="front-photo">
                                <label className="form-label mb-0 custom-label-title">Logo</label>
                                <Index.Box className="img-detail-box" onClick={() => handleOpen(`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.logo}`, "Logo")}>
                                    <img src={`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.logo}`} alt="Logo" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} md={2}>
                        <Index.Box className="img-cont-box">
                            <Index.Box className="front-photo">
                                <label className="form-label mb-0 custom-label-title">Cover Photo</label>
                                <Index.Box className="img-detail-box" onClick={() => handleOpen(`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.coverPhoto}`, "Cover Photo")}>
                                    <img src={`${PagesIndex.ImageURL}${userDetails?.customizeStoreDetails?.coverPhoto}`} alt="Cover Photo" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Grid>
                </Index.Grid>
                <ImageViewModal
                    open={open}
                    handleClose={handleClose}
                    modalImageUrl={modalImageUrl}
                    modalName={modalTitle}
                />
            </Index.Box>
        </>
    )
}
