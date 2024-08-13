import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { PaidOutlined } from "@mui/icons-material";
import PagesIndex from "../../../../component/PagesIndex";
import moment from "moment";

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [filterData, setFilteredData] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const handleSearch = (e) => {
    setSearch(e.target.value.trim());
  };

  const getInvoices = async () => {
    const data = await PagesIndex.getApi(PagesIndex.api.admin.getInvoiceList);
    if (data.length) {
      setInvoices(data);
    }
  };

  const formatIssuer = (issuer) => {
    if (!issuer || issuer.length <= 6) {
      return issuer;
    }
    return `${issuer?.slice(0, 4)}...${issuer?.slice(-4)}`;
  };

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = invoices?.filter((item) => {
        const invoiceList = item || {};
        return (
          invoiceList?.requestFrom?.toLowerCase().includes(search.toLowerCase()) ||
          invoiceList?.currency?.toLowerCase().includes(search.toLowerCase()) ||
          invoiceList?.createdAt?.toLowerCase().includes(search.toLowerCase()) ||
          invoiceList?.memoId?.toLowerCase().includes(search.toLowerCase()) ||
          invoiceList?.transactionID?.toLowerCase().includes(search.toLowerCase())||
          invoiceList?.status?.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(invoices);
    }
  }, [invoices, search]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = filterData.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <>
      <Index.Box className="admin-dashboard-content admin-user-list-content">
        <Index.Box className="admin-user-list-flex admin-page-title-main">
          <Index.Box class="page-header">
            <Index.Typography variant="h3" class="page-title">
              <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <PaidOutlined />
              </Index.Box>{" "}
              Invoices
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
                    placeholder="Search Invoices"
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
                      width="25%"
                    >
                      Request From
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="10%"
                    >
                      Amount
                    </Index.TableCell>

                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="10%"
                    >
                      Invoice ID
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="15%"
                      align="center"
                    >
                      Link
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="15%"
                    >
                      Transaction ID
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="10%"
                    >
                      Status
                    </Index.TableCell>
                    <Index.TableCell
                      component="th"
                      variant="th"
                      className="table-th"
                      width="15%"
                    >
                      Created At
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
                            {row?.requestFrom != undefined
                              ? row?.requestFrom
                              : "-"}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            {row?.amount != undefined ? row?.amount : "-"}  {row?.currency != undefined ? row?.currency : "-"}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                            align="center"
                          >
                            {row?.memoId != undefined ? row?.memoId : "-"}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                            align="center"
                          >
                            {row?.shareLink ? (
                              <>
                                {formatIssuer(row?.shareLink)}
                                <Index.Link
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                  to={row?.shareLink}
                                  target="_blank"
                                >
                                  <PagesIndex.LinkIcon
                                    style={{ fontSize: 18 }}
                                    sx={{ color: "#1e9b4b" }}
                                  />
                                </Index.Link>
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
                            {row?.transactionID ? (
                              <>
                                {formatIssuer(row?.transactionID)}
                                <Index.Link
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                  to={`https://stellarchain.io/transactions/${row?.transactionID}`}
                                  target="_blank"
                                >
                                  <PagesIndex.LinkIcon
                                    style={{ fontSize: 18 }}
                                    sx={{ color: "#1e9b4b" }}
                                  />
                                </Index.Link>
                              </>
                            ) : (
                              "-"
                            )}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                            style={{
                              color:
                                row?.status === "Completed"
                                  ? "green"
                                  : row?.status === "Cancelled"
                                    ? "red"
                                    : "Orange",
                            }}
                            align="left"
                          >
                            {row?.status}
                          </Index.TableCell>
                          <Index.TableCell
                            component="td"
                            variant="td"
                            className="table-td"
                          >
                            {moment(row?.createdAt).format("DD MMM YYYY")}
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
