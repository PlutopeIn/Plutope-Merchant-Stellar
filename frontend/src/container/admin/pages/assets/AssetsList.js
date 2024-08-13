import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import { BackupTableOutlined } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function AssetsList() {
    const navigate = PagesIndex.useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [assetsList, setAssetsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [assetId, setAssetId] = useState();
    const recordsPerPage = 10;

    const getAssetsList = async() => {
        const data  = await PagesIndex.getApi(PagesIndex.api.admin.getAssetsList);
        if(data.length){
            setAssetsList(data);
        }
    };

    useEffect(() => {
        getAssetsList()
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredAssetsList = assetsList.filter(asset => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            asset.code.toLowerCase().includes(searchTerm) ||
            (asset.name && asset.name.toLowerCase().includes(searchTerm)) ||
            (asset.featuredBlockTitle && asset.featuredBlockTitle.toLowerCase().includes(searchTerm)) ||
            (asset.issuer && asset.issuer.toLowerCase().includes(searchTerm)) ||
            (asset.domain && asset.domain.toLowerCase().includes(searchTerm))
        );
    });

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filteredAssetsList?.slice(startIndex, startIndex + recordsPerPage);

    // const content = row?.featuredBlockTitle || '-';

    const ellipsisText = (content) => {
        if (!content) return '-';
        return content.length > 50 ? `${content?.slice(0, 50)}...` : content;
    };

    const formatIssuer = (issuer) => {
        if (!issuer || issuer.length <= 6) {
            return issuer;
        }
        return `${issuer?.slice(0, 4)}...${issuer?.slice(-4)}`;
    };

    
    // Delete function declaration
    const deleteAssetsList = async() => {
        const response = await PagesIndex.postApi(PagesIndex.api.admin.deleteAssets,{ "assetId": assetId });
        if(response){
            getAssetsList();
            setDeleteModalOpen(false);
        }
    };

    const handleDeleteModalOpen = (id) => {
        setDeleteModalOpen(true);
        setAssetId(id);
    };
    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
        setAssetId("");
    };

    return (
        <>
            <Index.Box className="admin-dashboard-content admin-user-list-content">
                <Index.Box className="admin-user-list-flex admin-page-title-main">
                    <Index.Box class="page-header">
                        <Index.Typography variant='h3' class="page-title">
                            <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                                <BackupTableOutlined />
                            </Index.Box> Assets
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
                                        placeholder="Search assets"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <img
                                        src={PagesIndex.Svg.search}
                                        className="admin-search-grey-img admin-icon" alt='search'
                                    ></img>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box className="admin-userlist-inner-btn-flex">
                            <Index.Box className="admin-adduser-btn-main btn-main-primary">
                                <Index.Button onClick={() => navigate('/admin/add-assets')} className='admin-adduser-btn btn-primary'>
                                    <img src={PagesIndex.Svg.plus} className="admin-plus-icon" alt='plus' />Add Assets</Index.Button>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                </Index.Box>
            </Index.Box>

            {/* Table */}
            <Index.Box className="card-border common-card">
                <Index.Box className="admin-userlist-table-main page-table-main">
                    <Index.TableContainer component={Index.Paper} className='table-container'>
                        <Index.Table aria-label="simple table" className='table'>
                            <Index.TableHead className='table-head'>
                                <Index.TableRow className='table-row'>
                                    <Index.TableCell component='th' variant='th' align='center' className='table-th' width="5%">Sr. No</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="5%">Icon</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="5%">Code</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="10%">Name</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="10%">Featured Block Title</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="10%">Issuer</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="10%">Home Domain</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' align='center' className='table-th' width="10%">Actions</Index.TableCell>
                                </Index.TableRow>
                            </Index.TableHead>
                            <Index.TableBody className='table-body'>
                                {paginatedData && paginatedData.map((row, index) => {
                                    return (
                                        <Index.TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <Index.TableCell align='center' component='td' variant='td' className='table-td'>{(currentPage - 1) * recordsPerPage + index + 1}</Index.TableCell>
                                            <Index.TableCell component='td' variant='td' className='table-td icon-box-img'>
                                                <img src={`${row?.image}`} alt="" />
                                            </Index.TableCell>
                                            <Index.TableCell component='td' variant='td' className='table-td'>{row.code}</Index.TableCell>
                                            <Index.TableCell component='td' variant='td' className='table-td'>{row?.name != undefined ? row?.name : '-'}</Index.TableCell>
                                            {/* <Index.TableCell component='td' variant='td' className='table-td'>{row?.featuredBlockTitle != undefined ? row?.featuredBlockTitle : '-'}</Index.TableCell> */}
                                            <Index.TableCell component='td' variant='td' className='table-td'>
                                                <Index.Tooltip title={row?.featuredBlockTitle != undefined ? row?.featuredBlockTitle : '-'}>
                                                    {ellipsisText(row?.featuredBlockTitle != undefined ? row?.featuredBlockTitle : '-')}
                                                </Index.Tooltip>
                                            </Index.TableCell>
                                            {/* <Index.TableCell component='td' variant='td' className='table-td'>{row?.issuer != undefined ? row?.issuer : "-"}</Index.TableCell> */}
                                            <Index.TableCell component='td' variant='td' className='table-td'>
                                                {row?.issuer ? (
                                                    <>
                                                        {formatIssuer(row?.issuer)}
                                                        <CopyToClipboard text={row?.issuer}>
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
                                            <Index.TableCell component='td' variant='td' className='table-td'>{row?.domain != undefined ? row?.domain : "-"}</Index.TableCell>
                                            <Index.TableCell component='td' variant='td' className='table-td'>
                                                <Index.Box className="admin-table-data-btn-flex">
                                                    <Index.Tooltip
                                                        title="Edit"
                                                        arrow
                                                        placement="bottom"
                                                        className="admin-tooltip"
                                                    >
                                                        <Index.Button className='admin-table-data-btn' onClick={() => navigate(`/admin/edit-assets/${row?._id}`, { state: row })}>
                                                            <img src={PagesIndex.Svg.blueedit} className='admin-icon' alt='Edit' />
                                                        </Index.Button>
                                                    </Index.Tooltip>

                                                    <Index.Tooltip
                                                        title="View"
                                                        arrow
                                                        placement="bottom"
                                                        className="admin-tooltip"
                                                    >
                                                        <Index.Button className='admin-table-data-btn'
                                                            onClick={() => navigate(`/admin/view-assets/${row?._id}`, { state: row })}
                                                        >
                                                            <img src={PagesIndex.Svg.yelloweye} className='admin-icon' alt='View' />
                                                        </Index.Button>
                                                    </Index.Tooltip>

                                                    <Index.Tooltip
                                                        title="Delete"
                                                        arrow
                                                        placement="bottom"
                                                        className="admin-tooltip"
                                                    >
                                                        <Index.Button className='admin-table-data-btn'
                                                            onClick={() => handleDeleteModalOpen(row?._id)}
                                                        >
                                                            <img src={PagesIndex.Svg.trash} className='admin-icon' alt='Trash' />
                                                        </Index.Button>
                                                    </Index.Tooltip>
                                                </Index.Box>
                                            </Index.TableCell>
                                        </Index.TableRow >
                                    );
                                })}
                            </Index.TableBody>
                        </Index.Table>
                    </Index.TableContainer>
                </Index.Box>
                <Index.Box className="admin-pagination-main">
                    <Index.Pagination
                        count={Math.ceil(filteredAssetsList.length / recordsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        className='admin-pagination'
                    />
                </Index.Box>
            </Index.Box>

            {/* Delete Modal */}
            <PagesIndex.DeleteModal
                deleteOpen={deleteModalOpen}
                handleDeleteRecord={deleteAssetsList}
                handleDeleteClose={handleDeleteModalClose}
                deleteMessage={"Are you sure you want to delete this record?"}
            />
            {/* End Delete Modal */}
        </>
    )
}
