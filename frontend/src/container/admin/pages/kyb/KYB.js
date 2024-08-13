import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import { PaidOutlined } from '@mui/icons-material';
import KybModal from './KybModal';
import PagesIndex from '../../../../component/PagesIndex';
import moment from 'moment';

export default function KYB() {
    const navigate = PagesIndex.useNavigate();
    const [search, setSearch] = useState("");
    const [filterData, setFilteredData] = useState([]);
    const [kybList, setKybList] = useState([]);
    const [approveRejectData, setApproveRejectData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const [anchorEl, setAnchorEl] = useState(null);
    const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);


    const handleSearch = (e) => {
        setSearch(e.target.value.trim());
    };

    const getKybList = async() => {
        const data  = await PagesIndex.getApi(PagesIndex.api.admin.getKybList);
        if(data.length){
            setKybList(data);
        }
    };

    useEffect(() => {
        getKybList();
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = kybList?.filter((item) => {
                const kyb = item || {};

                return (
                    kyb?.businessId?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.createdAt?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.kybStatus?.toLowerCase().includes(search.toLowerCase())
                );
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(kybList);
        }
    }, [kybList, search]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filterData.slice(startIndex, startIndex + recordsPerPage);

    // const handleApproveRejectOpen = (data) => {
    //     setApproveRejectData(data);
    //     setApproveRejectModalOpen(true);
    //     setAnchorEl(null);
    // };

    // const handleApproveRejectClose = () => {
    //     setApproveRejectModalOpen(false);
    //     setApproveRejectData("");
    // };

    // const handleApproveReject = async() => {

    //     const data = await PagesIndex.postApi(PagesIndex.api.admin.approveRejectKyb,approveRejectData);
    //     if(data?.status === 200)
    //     {
    //         getKybList();
    //         handleApproveRejectClose();
    //     }
    // };


    return (
        <>
            <Index.Box className="admin-dashboard-content admin-user-list-content">
                <Index.Box className="admin-user-list-flex admin-page-title-main">
                    <Index.Box class="page-header">
                        <Index.Typography variant='h3' class="page-title">
                            <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                                <PaidOutlined />
                            </Index.Box> KYB
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
                                        placeholder="Search KYB"
                                        onChange={handleSearch}
                                    />
                                    <img
                                        src={PagesIndex.Svg.search}
                                        className="admin-search-grey-img admin-icon" alt='search'
                                    ></img>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                </Index.Box>

                <Index.Box className="card-border common-card">
                    <Index.Box className="admin-userlist-table-main page-table-main">
                        <Index.TableContainer component={Index.Paper} className='table-container'>
                            <Index.Table aria-label="simple table" className='table'>
                                <Index.TableHead className='table-head'>
                                    <Index.TableRow className='table-row'>
                                        <Index.TableCell component='th' variant='th' align='center' className='table-th' width="5%">Sr. No</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="15%">Business Id</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="15%">Company Name</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="15%">Created At</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="15%">Status</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' align='center' className='table-th' width="10%">Actions</Index.TableCell>
                                    </Index.TableRow>
                                </Index.TableHead>
                                <Index.TableBody className='table-body'>
                                    {paginatedData && paginatedData.map((row, index) => {
                                        return (
                                            <Index.TableRow className='no-break-row' key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <Index.TableCell align='center' component='td' variant='td' className='table-td'>{(currentPage - 1) * recordsPerPage + index + 1}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row?.businessId != undefined ? row?.businessId : '-'}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row?.companyName != undefined ? row?.companyName : '-'}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{moment(row?.createdAt).format("DD MMM YYYY")}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'
                                                    style={{ color: row?.kybStatus === "Approved" ? "green" : row?.kybStatus === "Rejected" ? "red" : "Orange" }}
                                                    align="left"
                                                >
                                                    {row?.kybStatus}
                                                </Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>
                                                    <Index.Box className="admin-table-data-btn-flex">
                                                        {/* Approved */}
                                                        {/* <Index.Tooltip
                                                            title="Approved"
                                                            arrow
                                                            placement="bottom"
                                                            className="admin-tooltip"
                                                        >
                                                            <Index.Button className='admin-table-data-btn'
                                                                onClick={() => handleApproveRejectOpen({ id: row?._id, status: "Approved" })}
                                                            >
                                                                <img src={PagesIndex.Svg.check} className='admin-icon' alt='Edit' />
                                                            </Index.Button>
                                                        </Index.Tooltip> */}

                                                        {/* Rejected */}
                                                        {/* <Index.Tooltip
                                                            title="Rejected"
                                                            arrow
                                                            placement="bottom"
                                                            className="admin-tooltip"
                                                        >
                                                            <Index.Button className='admin-table-data-btn'
                                                                onClick={() => handleApproveRejectOpen({ id: row?._id, status: "Rejected" })}
                                                            >
                                                                <img src={PagesIndex.Svg.closeRed} className='admin-icon' alt='Trash' />
                                                            </Index.Button>
                                                        </Index.Tooltip> */}

                                                        <Index.Tooltip
                                                            title="View"
                                                            arrow
                                                            placement="bottom"
                                                            className="admin-tooltip"
                                                        >
                                                            <Index.Button className='admin-table-data-btn'
                                                                onClick={() => navigate(`/admin/view-kyb/${row?._id}`, { state: row })}
                                                            >
                                                                <img src={PagesIndex.Svg.yelloweye} alt="eye" className='admin-table-eye-icon'></img>
                                                            </Index.Button>
                                                        </Index.Tooltip>
                                                    </Index.Box>
                                                </Index.TableCell>
                                            </Index.TableRow>
                                        )
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


                {/* KYB Modal */}

                {/* <KybModal
                    handleApproveRejectRecord={handleApproveReject}
                    handleApproveRejectClose={handleApproveRejectClose}
                    approveRejectOpen={approveRejectModalOpen}
                    confirmMessage={`Are you sure? Do you want to this KYB ${approveRejectData?.status}?`}
                    approveRejectData={approveRejectData}
                /> */}

            </Index.Box >
        </>
    )
}