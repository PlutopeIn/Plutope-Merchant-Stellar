import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { PaidOutlined } from "@mui/icons-material";
import PagesIndex from "../../../../component/PagesIndex";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function DeleteRequest() {
  const navigate = PagesIndex.useNavigate();
  const [search, setSearch] = useState("");
  const [filterData, setFilteredData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [approveRejectData, setApproveRejectData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [anchorEl, setAnchorEl] = useState(null);
  const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value.trim());
  };

  const getRequests = async () => {
    const data = await PagesIndex.getApi(PagesIndex.api.admin.getDeleteRequestList);
    if (data.length) {
      console.log("Delete Request Dtaa 4343 : ", data)
      setRequests(data);
    }
  };

  const formatIssuer = (issuer) => {
    if (!issuer || issuer.length <= 6) {
      return issuer;
    }
    return `${issuer?.slice(0, 4)}...${issuer?.slice(-4)}`;
  };

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = requests?.filter((item) => {
        const deleteRequests = item || {};

        return (
          deleteRequests?.email?.toLowerCase().includes(search.toLowerCase()) ||
          deleteRequests?.publicKey?.toLowerCase().includes(search.toLowerCase()) ||
          deleteRequests?.updatedAt?.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(requests);
    }
  }, [requests, search]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = filterData.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    console.log("Delete Request Dtaa : ", paginatedData),
    <>
      <Index.Box className="admin-dashboard-content admin-user-list-content">
        <Index.Box className="admin-user-list-flex admin-page-title-main">
          <Index.Box class="page-header">
            <Index.Typography variant="h3" class="page-title">
              <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <PaidOutlined />
              </Index.Box>{" "}
              Delete Requests
            </Index.Typography>
          </Index.Box>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Requests"
                    onChange={handleSearch}
                  />
                  <img
                    src={PagesIndex.Svg.search}
                    className="admin-search-grey-img admin-icon"
                    alt="search"
                  ></img>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        <Index.Box className="card-border common-card">
          <Index.Box className="admin-userlist-table-main page-table-main">
            <Index.TableContainer
              component={Index.Paper}
              className="table-container"
            >
              <Index.Table aria-label="simple table" className="table">
                <Index.TableHead className="table-head">
                  <Index.TableRow className="table-row">
                    <Index.TableCell
                      component="th"
                      variant="th"
                      align="center"
                      className="table-th"
                      width="5%"
                    >
                      No
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="15%"
                    >
                      Email
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="15%"
                    >
                      Public Key
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="15%"
                    >
                      Created At
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      align="center"
                      className="table-th"
                      width="10%"
                    >
                      Actions
                    </Index.TableCell>
                  </Index.TableRow>
                </Index.TableHead>
                <Index.TableBody className="table-body">
                  {paginatedData &&
                    paginatedData.map((row, index) => {
                      return (
                        <Index.TableRow
                          className="no-break-row"
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <Index.TableCell
                            align="center"
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            {(currentPage - 1) * recordsPerPage + index + 1}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            {row?.email != undefined
                              ? row?.email
                              : "-"}
                          </Index.TableCell>
                          
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            {row?.publicKey ? (
                              <>
                                {formatIssuer(row?.publicKey)}
                                <CopyToClipboard text={row?.publicKey}>
                                  <Index.Link
                                    title="Copy to clipboard"
                                    style={{
                                      background: "none",
                                      border: "none",
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <PagesIndex.ContentCopyIcon
                                      style={{ fontSize: 18 }}
                                      sx={{ color: "#1e9b4b" }}
                                    />
                                  </Index.Link>
                                </CopyToClipboard>
                              </>
                            ) : (
                              "-"
                            )}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            {moment(row?.updatedAt).format("DD MMM YYYY")}
                          </Index.TableCell>
                       
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            <Index.Box className="admin-table-data-btn-flex">
                              <Index.Tooltip
                                title="View"
                                arrow
                                placement="bottom"
                                className="admin-tooltip"
                              >
                                <Index.Button
                                  className="admin-table-data-btn"
                                >
                                  <img
                                    src={PagesIndex.Svg.yelloweye}
                                    alt="eye"
                                    className="admin-table-eye-icon"
                                  ></img>
                                </Index.Button>
                              </Index.Tooltip>
                            </Index.Box>
                          </Index.TableCell>
                        </Index.TableRow>
                      );
                    })}
                </Index.TableBody>
              </Index.Table>
            </Index.TableContainer>
          </Index.Box>
        </Index.Box>

        <Index.Box className="table-pagination">
          <Index.Pagination
            count={Math.ceil(filterData.length / recordsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Index.Box>
      </Index.Box>
    </>
  );
}
