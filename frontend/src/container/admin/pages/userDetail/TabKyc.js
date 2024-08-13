import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../../component/PagesIndex";
import { AccountBalanceWallet } from '@mui/icons-material';
import { RecentActors } from '@mui/icons-material';
import ImageViewModal from "../../../../component/common/modal/ImageViewModal";
import KycModal from "../kyc/KycModal";

export default function TabKyc({ userDetails, userId }) {
  const [applicantDetails, setApplicantDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);
  const [approveRejectData, setApproveRejectData] = useState({});
  const navigate = PagesIndex.useNavigate();

  const getSumSubApplicantDetails = async () => {
    const data = await PagesIndex.getApi(
      PagesIndex.api.admin.getApplicantDetails + "/" + userId
    );
    if (data) {
      setApplicantDetails(data);
    }
  };

  useEffect(() => {
    getSumSubApplicantDetails();
  }, []);

  const handleOpen = (url) => {
    setModalImageUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalImageUrl('');
  };

  const handleApproveReject = async () => {
    const approveRejectPayload = {
      kybId: approveRejectData?.id?.kybDetails?._id,
      kycId: approveRejectData?.id?.kycDetails?._id,
      status: approveRejectData?.status
    }
    const data = await PagesIndex.postApi(PagesIndex.api.admin.approveRejectKycKyb, approveRejectPayload);
    if (data?.status === 200) {
      handleApproveRejectClose();
      navigate("/admin/user-list")
    }

  };

  const handleApproveRejectOpen = (data) => {
    setApproveRejectData(data);
    setApproveRejectModalOpen(true);
  };

  const handleApproveRejectClose = () => {
    setApproveRejectModalOpen(false);
    setApproveRejectData("");
  };
  return (
    <>
      <Index.Grid container spacing={1}>
        {/* KYC */}
        <Index.Grid item md={6}>
          <Index.Box class="page-header-box">
            <Index.Typography variant="h3" class="page-title">
              {/* <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <RecentActors />
              </Index.Box>{" "} */}
              KYC
            </Index.Typography>
          </Index.Box>
          <Index.Box className="card-box">
            <Index.Grid container spacing={3} sx={{ alignItems: "end" }}>
              <Index.Grid item xs={12} md={12}>
                <Index.List className="list-style-1">
                  <Index.ListItem>
                    <label class="form-label mb-0 custom-label-title">
                      First Name
                    </label>
                    <p class="custom-label-subtitle">
                      {userDetails?.kycDetails?.firstName}
                    </p>
                  </Index.ListItem>
                  <Index.ListItem>
                    <label class="form-label mb-0 custom-label-title">
                      Last Name :{" "}
                    </label>
                    <p class="custom-label-subtitle">
                      {userDetails?.kycDetails?.lastName}
                    </p>
                  </Index.ListItem>
                  <Index.ListItem>
                    <label class="form-label mb-0 custom-label-title">DOB : </label>
                    <p class="custom-label-subtitle">
                      {userDetails?.kycDetails?.dob}
                    </p>
                  </Index.ListItem>
                  <Index.ListItem>
                    <label class="form-label mb-0 custom-label-title">
                      Country:{" "}
                    </label>
                    <p class="custom-label-subtitle">
                      {userDetails?.kycDetails?.country}
                    </p>
                  </Index.ListItem>
                  <Index.ListItem>
                    <label class="form-label mb-0 custom-label-title">
                      Address :{" "}
                    </label>
                    <p class="custom-label-subtitle">
                      {userDetails?.kycDetails?.address}
                    </p>
                  </Index.ListItem>
                  <Index.ListItem>
                    <label class="form-label mb-0 custom-label-title">
                      Sumsub kyc status :{" "}
                    </label>
                    <p class="custom-label-subtitle">
                      {applicantDetails?.review?.reviewStatus ? applicantDetails?.review?.reviewStatus : "-"}
                    </p>
                  </Index.ListItem>
                </Index.List>
              </Index.Grid>
            </Index.Grid>
          </Index.Box>
        </Index.Grid>
        {/* KYB */}
        <Index.Grid item md={6}>
          <Index.Box class="page-header-box">
            <Index.Typography variant='h3' class="page-title">
              {/* <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <AccountBalanceWallet />
              </Index.Box> */}
              KYB
            </Index.Typography>
          </Index.Box>
          <Index.Box className="card-box">
            
              <Index.Grid container spacing={3} sx={{ alignItems: 'end' }}>
                <Index.Grid item xs={12} md={2}>
                  <Index.Box className="img-cont-box">
                    <Index.Box className="front-photo">
                      <label className="form-label mb-0 custom-label-title">Business ID Photo</label>
                      <Index.Box className="img-detail-box" onClick={() => handleOpen(`${PagesIndex.ImageURL}${userDetails?.kybDetails?.businessImage}`)}>
                        <img src={`${PagesIndex.ImageURL}${userDetails?.kybDetails?.businessImage}`} alt="" />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
              <ImageViewModal
                open={open}
                handleClose={handleClose}
                modalImageUrl={modalImageUrl}
                modalName={"Business ID Photo"}
              />
            
            <Index.List className='list-style-1'>
              <Index.ListItem>
                <label class="form-label mb-0 custom-label-title">Business Id : </label>
                <p class="custom-label-subtitle">{userDetails?.kybDetails?.businessId}</p>
              </Index.ListItem>
              <Index.ListItem>
                <label class="form-label mb-0 custom-label-title">Company Name : </label>
                <p class="custom-label-subtitle">{userDetails?.kybDetails?.companyName}</p>
              </Index.ListItem>
            </Index.List>
          </Index.Box>
        </Index.Grid>
        {(userDetails?.kybDetails?.kybStatus == 'Pending' && userDetails?.kycDetails?.kycStatus == 'Pending') ?
          <Index.Grid item md={12} sx={{ marginTop: "26px" }}>
            <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
              <Index.Button className="admin-adduser-btn btn-primary"
                onClick={() => handleApproveRejectOpen({ id: userDetails, status: "Approved" })} >
                Approve
              </Index.Button>
              <Index.Button className="admin-adduser-btn btn-primary delete-cancel"
                onClick={() => handleApproveRejectOpen({ id: userDetails, status: "Rejected" })}
              >
                Reject
              </Index.Button>
            </Index.Box>
          </Index.Grid>
          :
          <Index.Box>
          </Index.Box>
        }

        <KycModal
          handleApproveRejectRecord={handleApproveReject}
          handleApproveRejectClose={handleApproveRejectClose}
          approveRejectOpen={approveRejectModalOpen}
          confirmMessage={`Are you sure? Do you want to ${approveRejectData?.status == "Approved" ? 'Approve' : 'Reject'} this KYB & KYC?`}
          approveRejectData={approveRejectData}
        />
      </Index.Grid>
    </>
  );
}
