import React from "react";
import Index from "../../Index";
import PagesIndex from "../../PagesIndex";

const DeleteModal = (props) => {
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
      open={props?.deleteOpen}
      onClose={props?.handleDeleteClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-delete modal"
    >
      <Index.Box sx={style} className="delete-modal-inner-main modal-inner">
        {/* <Index.Box
          className="modal-circle-main"
          onClick={props?.handleDeleteClose}
        >
          <img
            src={Index.Svg.blueclose}
            className="user-circle-img"
            alt="icon"
          />
        </Index.Box> */}
        <Index.Box className="modal-contained-wrap">
          <Index.Box className="trash-icon-box">
            <img src={PagesIndex.Png.trash} />
          </Index.Box>
          <Index.Box>
            <Index.Typography
              className="delete-modal-para common-para"
              component="p"
              variant="p"
            >
              {props?.deleteMessage
                ? props?.deleteMessage
                : "Are you sure? Do you really want to delete this records?"}
            </Index.Typography>
          </Index.Box>
          <Index.Box className="admin-adduser-btn-main delete-modal-btn btn-main-primary">
            <Index.Button
              className="admin-adduser-btn btn-primary"
              onClick={props?.handleDeleteRecord}
            >
              {props?.buttonTitle ? props?.buttonTitle : "Delete"}
            </Index.Button>
            <Index.Button
              className="admin-adduser-btn btn-primary delete-cancel"
              onClick={props?.handleDeleteClose}
            >
              Cancel
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Modal>
  );
};

export default DeleteModal;
