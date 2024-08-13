import React from 'react'
import Index from '../../Index'
import { Close } from '@mui/icons-material';

export default function ImageViewModal({ open, handleClose, modalImageUrl, modalName }) {

    return (
            <Index.Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{ onClick: (e) => e.stopPropagation() }}
            >
                <Index.Box className="image-view-modal">
                    <Index.Box className="page-header-box" sx={{ marginBottom: "16px" }}>
                        <Index.Typography variant="h3" className="page-title user-title mb-0">
                            {modalImageUrl ? modalName : " "}
                            {/* {modalImageUrl.includes('logo') ? 'Logo' : 'Cover Photo'} */}
                        </Index.Typography>
                        <Index.Box className="back-btn-box">
                            <Index.Button
                                onClick={handleClose}
                                className="back-btn close-btn-modal"
                                type="button"
                            >
                                <Close />
                            </Index.Button>
                        </Index.Box>
                    </Index.Box>
                    <img className="img-modal-view" src={modalImageUrl} alt="Modal View" />
                </Index.Box>
            </Index.Modal>
    )
}
