import React, { useState } from 'react'
import Index from '../../../Index'
import { ManageAccounts } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';
import ImageViewModal from "../../../../component/common/modal/ImageViewModal";
import KybModal from './KybModal';

export default function KYBDetail({ userDetails, userId }) {

    const navigate = PagesIndex.useNavigate();
    const { state } = PagesIndex.useLocation();
    const [open, setOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [kybList, setKybList] = useState([]);
    const [approveRejectData, setApproveRejectData] = useState({});

    const [anchorEl, setAnchorEl] = useState(null);
    const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const getKybList = async () => {
        const data = await PagesIndex.getApi(PagesIndex.api.admin.getKybList);
        if (data.length) {
            setKybList(data);
        }
    };

    const handleOpen = (url) => {
        setModalImageUrl(url);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalImageUrl('');
    };

    const handleApproveRejectOpen = (data) => {
        setApproveRejectData(data);
        setApproveRejectModalOpen(true);
        setAnchorEl(null);
    };

    const handleApproveRejectClose = () => {
        setApproveRejectModalOpen(false);
        setApproveRejectData("");
    };

    const handleApproveReject = async () => {

        const data = await PagesIndex.postApi(PagesIndex.api.admin.approveRejectKyb, approveRejectData);
        if (data?.status === 200) {
            getKybList();
            handleApproveRejectClose();
            navigate("/admin/kyb");
        }
    };

    return (
        <>
            <Index.Box class="page-header-box">
                <Index.Typography variant='h3' class="page-title">
                    <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                        <ManageAccounts />
                    </Index.Box> KYB
                </Index.Typography>
                <Index.Box className="back-btn-box">
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box>
            </Index.Box>

            <Index.Box className="card-border common-card">
                <Index.Grid container spacing={3} sx={{ alignItems: "end" }}>
                    <Index.Grid item xs={12} md={2}>
                        <Index.Box className="img-cont-box">
                            <Index.Box class="front-photo">
                                <label class="form-label mb-0 custom-label-title">Business ID Photo</label>
                                <Index.Box className="img-detail-box" onClick={() => handleOpen(`${PagesIndex.ImageURL}${state?.businessImage}`)}>
                                    <img src={`${PagesIndex.ImageURL}${state?.businessImage}`} alt="" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} md={8}>
                        <Index.List className='list-style-1'>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Status</label>
                                <p class="custom-label-subtitle" style={{ color: state?.kybStatus === "Approved" ? "green" : state?.kybStatus === "Rejected" ? "red" : "Orange" }}>{state?.kybStatus}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Business Id : </label>
                                <p class="custom-label-subtitle">{state?.businessId}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Company Name : </label>
                                <p class="custom-label-subtitle">{state?.companyName}</p>
                            </Index.ListItem>
                        </Index.List>
                    </Index.Grid>

                    {state?.kybStatus == 'Pending' &&
                        <Index.Grid item xs={12} md={12}>
                            <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
                                <Index.Button className='admin-adduser-btn btn-primary'
                                    onClick={() => handleApproveRejectOpen({ id: state?._id, status: "Approved" })}
                                >
                                    {/* <img src={PagesIndex.Svg.check} className='admin-icon' alt='Edit' /> */}
                                    Approve
                                </Index.Button>

                                {/* Rejected */}
                                <Index.Button className='admin-adduser-btn btn-primary delete-cancel'
                                    onClick={() => handleApproveRejectOpen({ id: state?._id, status: "Rejected" })}
                                >
                                    {/* <img src={PagesIndex.Svg.closeRed} className='admin-icon' alt='Trash' /> */}
                                    Reject
                                </Index.Button>
                            </Index.Box>
                        </Index.Grid>
                    }
                </Index.Grid>
            </Index.Box>

            <ImageViewModal
                open={open}
                handleClose={handleClose}
                modalImageUrl={modalImageUrl}
                modalName={"Business ID Photo"}
            />

            <KybModal
                handleApproveRejectRecord={handleApproveReject}
                handleApproveRejectClose={handleApproveRejectClose}
                approveRejectOpen={approveRejectModalOpen}
                confirmMessage={`Are you sure? Do you want to this KYB ${approveRejectData?.status}?`}
                approveRejectData={approveRejectData}
            />

        </>
    )
}