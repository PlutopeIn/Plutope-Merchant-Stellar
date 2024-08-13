import React, { useState } from 'react'
import Index from '../../../Index'
import { ManageAccounts } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';
import KycModal from './KycModal';

export default function KYCDetail({ userDetails, userId }) {

    const navigate = PagesIndex.useNavigate();
    const [approveRejectData, setApproveRejectData] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);
    const { state } = PagesIndex.useLocation();
    const [kycList, setKycList] = useState([]);

    const handleBack = () => {
        navigate(-1);
    };

    // const getKycList = async () => {
    //     const data = await PagesIndex.getApi(PagesIndex.api.admin.getKycList);
    //     if (data) {
    //         setKycList(data)
    //     }
    // };

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
        const data = await PagesIndex.postApi(PagesIndex.api.admin.approveRejectKyc, approveRejectData);
        if (data?.status === 200) {
            // getKycList();
            handleApproveRejectClose();
            navigate("/admin/kyc");
        }

    };
   

    return (
        <>
            <Index.Box class="page-header-box">
                <Index.Typography variant='h3' class="page-title">
                    <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                        <ManageAccounts />
                    </Index.Box> KYC
                </Index.Typography>
                <Index.Box className="back-btn-box">
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box>
            </Index.Box>

            <Index.Box className="card-border common-card">
                <Index.Grid container spacing={3} sx={{ alignItems: "end" }}>
                    {/* <Index.Grid item xs={12} md={2}>
                        <Index.Box className="img-cont-box">
                            <Index.Box class="front-photo">
                                <label class="form-label mb-0 custom-label-title">Front Photo</label>
                                <Index.Box className="img-detail-box">
                                    <img src={`${PagesIndex.ImageURL}${state?.frontPhoto}`} alt="" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Grid> */}
                    {/* <Index.Grid item xs={12} md={2}>
                        <Index.Box className="img-cont-box">
                            <Index.Box class="front-photo">
                                <label class="form-label mb-0 custom-label-title">Back Photo</label>
                                <Index.Box className="img-detail-box">
                                    <img src={`${PagesIndex.ImageURL}${state?.backPhoto}`} alt="" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Grid> */}
                    <Index.Grid item xs={12} md={12}>
                        <Index.List className='list-style-1'>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">First Name</label>
                                <p class="custom-label-subtitle">{state?.firstName}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Last Name</label>
                                <p class="custom-label-subtitle">{state?.lastName}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Status</label>
                                <p class="custom-label-subtitle" style={{ color: state?.kycStatus === "Approved" ? "green" : state?.kycStatus === "Rejected" ? "red" : "Orange" }}>{state?.kycStatus}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Country</label>
                                <p class="custom-label-subtitle">{state?.country}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">DOB</label>
                                <p class="custom-label-subtitle">{state?.dob}</p>
                            </Index.ListItem>
                            <Index.ListItem>
                                <label class="form-label mb-0 custom-label-title">Address</label>
                                <p class="custom-label-subtitle">{state?.address}</p>
                            </Index.ListItem>
                        </Index.List>
                    </Index.Grid>
                    {state?.kycStatus == 'Pending' &&
                        <Index.Grid item xs={12} md={12}>
                            <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
                                {/* Approved */}
                                <Index.Button className='admin-adduser-btn btn-primary'
                                    onClick={() => handleApproveRejectOpen({ id: state?._id, status: "Approved" })}
                                >
                                    {/* <img src={PagesIndex.Svg.check} className='admin-icon' alt='Approve' /> */}
                                    Approve
                                </Index.Button>

                                {/* Rejected */}
                                {/* <Index.Button className='admin-table-data-btn' */}
                                <Index.Button className='admin-adduser-btn btn-primary delete-cancel'
                                    onClick={() => handleApproveRejectOpen({ id: state?._id, status: "Rejected" })}
                                >
                                    {/* <img src={PagesIndex.Svg.closeRed} className='admin-icon' alt='Rejected' /> */}
                                    Reject
                                </Index.Button>
                            </Index.Box>
                        </Index.Grid>
                    }
                </Index.Grid>
            </Index.Box>

            <KycModal
                handleApproveRejectRecord={handleApproveReject}
                handleApproveRejectClose={handleApproveRejectClose}
                approveRejectOpen={approveRejectModalOpen}
                confirmMessage={`Are you sure? Do you want to this KYC ${approveRejectData?.status}?`}
                approveRejectData={approveRejectData}
            />

        </>
    )
}
