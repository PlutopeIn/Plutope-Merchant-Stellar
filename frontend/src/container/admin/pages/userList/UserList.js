import React, { useEffect, useState } from 'react'
import Index from '../../../Index';
import './userList.css';
import './userList.responsive.css';
import { GroupOutlined } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';
import moment from 'moment';


export default function UserList() {
    const navigate = PagesIndex.useNavigate();
    const [search, setSearch] = useState("");
    const [filterData, setFilteredData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const handleSearch = (e) => {
        setSearch(e.target.value.trim());
    };

    const getUserList = async () => {
        const data = await PagesIndex.getApi(PagesIndex.api.admin.getUserList);
        if (data.length) {
            setUserList(data);
        }
    };

    useEffect(() => {
        getUserList();
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = userList?.filter((item) => {
                const { email, kybDetails } = item;
                const kyb = kybDetails[0] || {};

                return (
                    email?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.businessId?.toLowerCase().includes(search.toLowerCase())
                );
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(userList);
        }
    }, [userList, search]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filterData.slice(startIndex, startIndex + recordsPerPage);
    return (
        <>
            <Index.Box className="admin-dashboard-content admin-user-list-content">
                <Index.Box className="admin-user-list-flex admin-page-title-main">
                    <Index.Box class="page-header">
                        <Index.Typography variant='h3' class="page-title">
                            <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                                <GroupOutlined />
                            </Index.Box> Users
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
                                        placeholder="Search user"
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
                                        <Index.TableCell component='th' variant='th' className='table-th' width="20%">Email</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Company Name</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Public Key</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">KYC Status</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">KYB Status</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Joining Date</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' align='center' className='table-th' width="10%">Actions</Index.TableCell>
                                    </Index.TableRow>
                                </Index.TableHead>
                                <Index.TableBody className='table-body'>
                                    {paginatedData && paginatedData.map((row, index) => {
                                        return (
                                            <Index.TableRow className='no-break-row' key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <Index.TableCell align='center' component='td' variant='td' className='table-td'>{(currentPage - 1) * recordsPerPage + index + 1}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row.email}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row?.kybDetails[0]?.companyName != undefined ? row?.kybDetails[0]?.companyName : '-'}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>

                                                    <Index.Tooltip
                                                        title={row?.publicKey}
                                                        placement="top"
                                                    >{row?.publicKey
                                                        ? `${row?.publicKey.substring(
                                                            0,
                                                            4
                                                        )}.....${row?.publicKey.substring(
                                                            row?.publicKey?.length - 4
                                                        )}`
                                                        : "-"}
                                                    </Index.Tooltip>
                                                </Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td' style={{ color: row?.kycDetails[0]?.kycStatus === "Approved" ? "green" : row?.kycDetails[0]?.kycStatus === "Rejected" ? "red" : "Orange" }}>{row?.kycDetails[0]?.kycStatus != undefined ? row?.kycDetails[0]?.kycStatus : '-'}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td' style={{ color: row?.kybDetails[0]?.kybStatus === "Approved" ? "green" : row?.kybDetails[0]?.kybStatus === "Rejected" ? "red" : "Orange" }}>{row?.kybDetails[0]?.kybStatus != undefined ? row?.kybDetails[0]?.kybStatus : '-'}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{moment(row?.createdAt).format(
                                                    "DD MMM YYYY"
                                                )}</Index.TableCell>

                                                <Index.TableCell component='td' variant='td' className='table-td'>
                                                    <Index.Box className="admin-table-data-btn-flex">
                                                        <Index.Tooltip
                                                            title="View"
                                                            arrow
                                                            placement="bottom"
                                                            className="admin-tooltip"
                                                        >
                                                            <Index.Button className='admin-table-data-btn'
                                                                onClick={() => navigate(`/admin/user-detail/${row?._id}`)}
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
            </Index.Box>
        </>
    )
}
