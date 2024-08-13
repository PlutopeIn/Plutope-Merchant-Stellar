import React,{useEffect,useState} from 'react'
import Index from '../../../Index';
import PagesIndex from '../../../../component/PagesIndex';
import { PaidOutlined } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function TransactionList() {
    const navigate = PagesIndex.useNavigate();
    const [search, setSearch] = useState("");
    const [filterData, setFilteredData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const handleSearch = (e) => {
        setSearch(e.target.value.trim());
    };

    const getUserList = async() => {
        const data  = await PagesIndex.getApi(PagesIndex.api.admin.getUserList);
        if(data.length){
            setUserList(data);
        }
    };

    useEffect(() => {
        getUserList();
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = userList?.filter((item) => {
                const { email, mobileNumber, kybDetails } = item;
                const kyb = kybDetails[0] || {};

                return (
                    email?.toLowerCase().includes(search.toLowerCase()) ||
                    mobileNumber?.toString().includes(search.toLowerCase()) ||
                    kyb?.country?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                    kyb?.taxId?.toLowerCase().includes(search.toLowerCase()) ||
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
    const paginatedData = filterData?.slice(startIndex, startIndex + recordsPerPage);
 
    const formatTaxId = (taxId) => {
        if (!taxId || taxId.length <= 6) {
            return taxId;
        }
        return `${taxId?.slice(0, 3)}...${taxId?.slice(-3)}`;
    };

    return (
        <>
            <Index.Box className="admin-dashboard-content admin-user-list-content">
                <Index.Box className="admin-user-list-flex admin-page-title-main">
                    <Index.Box class="page-header">
                        <Index.Typography variant='h3' class="page-title">
                            <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                                <PaidOutlined />
                            </Index.Box> Transactions
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
                                        placeholder="Search transaction"
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
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Mobile Number</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="8%">Country</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Company Name</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Tax ID</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' className='table-th' width="10%">Business ID</Index.TableCell>
                                        <Index.TableCell component='th' variant='th' align='center' className='table-th' width="10%">Actions</Index.TableCell>
                                    </Index.TableRow>
                                </Index.TableHead>
                                <Index.TableBody className='table-body'>
                                    {paginatedData && paginatedData.map((row, index) => {
                                        return (
                                            <Index.TableRow className='no-break-row' key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <Index.TableCell align='center' component='td' variant='td' className='table-td'>{(currentPage - 1) * recordsPerPage + index + 1}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row.email}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row.mobileNumber}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row?.kybDetails[0]?.country != undefined ? row?.kybDetails[0]?.country : '-'}</Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row?.kybDetails[0]?.companyName != undefined ? row?.kybDetails[0]?.companyName : '-'}</Index.TableCell>
                                                {/* <Index.TableCell component='td' variant='td' className='table-td'>{row?.kybDetails[0]?.taxId != undefined ? row?.kybDetails[0]?.taxId : "-"}</Index.TableCell> */}
                                                <Index.TableCell component='td' variant='td' className='table-td'>
                                                    {row?.kybDetails[0]?.taxId ? (
                                                        <>
                                                            {formatTaxId(row?.kybDetails[0]?.taxId)}
                                                            <CopyToClipboard text={row?.kybDetails[0]?.taxId}>
                                                                <Index.Link
                                                                    title="Copy to clipboard"
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px'
                                                                    }}
                                                                >
                                                                    <PagesIndex.ContentCopyIcon style={{ fontSize: 18 }} sx={{ color: '#1e9b4b' }} />
                                                                </Index.Link>
                                                            </CopyToClipboard>
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </Index.TableCell>
                                                <Index.TableCell component='td' variant='td' className='table-td'>{row?.kybDetails[0]?.businessId != undefined ? row?.kybDetails[0]?.businessId : '-'}</Index.TableCell>
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
                                                        {/* <Index.Tooltip
                                                            title="Edit"
                                                            arrow
                                                            placement="bottom"
                                                            className="admin-tooltip"
                                                        >
                                                            <Index.Button className='admin-table-data-btn'
                                                                onClick={() => navigate(`/admin/user-edit/${row?._id}`)}
                                                            >
                                                                <img src={PagesIndex.Svg.adminedit} alt="edit" className='admin-table-edit-icon'></img>
                                                            </Index.Button>
                                                        </Index.Tooltip>
                                                        <Index.Tooltip
                                                            title="Delete"
                                                            arrow
                                                            placement="bottom"
                                                            className="admin-tooltip"
                                                        >
                                                            <Index.Button className='admin-table-data-btn'
                                                                onClick={() => handleOpenDelete(row._id)}
                                                            >
                                                                <img src={PagesIndex.Svg.admindustbin} alt="dustbin" className='admin-table-dustbin-icon'></img>
                                                            </Index.Button>
                                                        </Index.Tooltip> */}
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
                        count={Math.ceil(filterData?.length / recordsPerPage)}
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
