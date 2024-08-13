import React from "react";
import Index from "../../../Index";
import PagesIndex from "../../../../component/PagesIndex";

const KybModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };
  return (
    <Index.Modal
      open={props?.approveRejectOpen}
      onClose={props?.handleApproveRejectClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-delete modal"
    >
      <Index.Box sx={style} className="delete-modal-inner-main modal-inner">
        <Index.Box className="modal-contained-wrap">
          <Index.Box className="trash-icon-box">
            {/* <img src={PagesIndex.Png.approved} /> */}
            <img src={`${props?.approveRejectData?.status === "Approved" ? PagesIndex.Png.approved : PagesIndex.Png.reject } `} />
          </Index.Box>
          <Index.Box>
            <Index.Typography
              className="delete-modal-para common-para"
              component="p"
              variant="p"
            >
              {props?.confirmMessage
                ? props?.confirmMessage
                : "Are you sure? Do you really want to update this records?"}
            </Index.Typography>
          </Index.Box>
          <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
            <Index.Button
              className="admin-adduser-btn btn-primary"
              onClick={props?.handleApproveRejectRecord}
            >
              {props?.buttonTitle ? props?.buttonTitle : "Yes"}
            </Index.Button>
            <Index.Button
              className="admin-adduser-btn btn-primary delete-cancel"
              onClick={props?.handleApproveRejectClose}
            >
              No
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Modal>
  );
};

export default KybModal;
