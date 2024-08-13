import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import { FoundationOutlined } from '@mui/icons-material'
import PagesIndex from '../../../../component/PagesIndex';
import BusinessModal from './BusinessModal';
import DeleteModal from '../../../../component/common/modal/DeleteModal';

export default function Business() {

    const [businessList, setBusinessList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const recordsPerPage = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [businessId, setBusinessId] = useState(null);


    const filteredBusinessList = businessList.filter(business => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            (business.businessType && business.businessType.toLowerCase().includes(searchTerm))
        )

    });


    const getBusinessList = async() => {
        const data  = await PagesIndex.getApi(PagesIndex.api.admin.getBusinessList);
        if(data.length){
            setBusinessList(data);
        }
    };

    useEffect(() => {
        getBusinessList()
    }, [modalOpen]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filteredBusinessList?.slice(startIndex, startIndex + recordsPerPage);


    const openBusinessModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditData("");
    };
    const handleEdit = (row) => {
        setEditData(row);
        setModalOpen(true);
    };

    // delete function declaration
    const handleDeleteClose = () => {
        setDeleteModalOpen(false);
        setEditData("");
    };
    const handleDeleteOpen = (id) => {
        setBusinessId(id);
        setDeleteModalOpen(true);
    };

    const handleDelete = async() => {
        const response = await PagesIndex.postApi(
            PagesIndex.api.admin.deleteBusiness,
            businessId
          );
        if(response)
        {
            getBusinessList();
            handleDeleteClose();
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.trim());
    };

    return (
        <>
            {/* Heading */}
            <Index.Box className="admin-dashboard-content admin-user-list-content">
                <Index.Box className="admin-user-list-flex admin-page-title-main">
                    <Index.Box class="page-header">
                        <Index.Typography variant='h3' class="page-title">
                            <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                                <FoundationOutlined />
                            </Index.Box> Business Types
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
                                        placeholder="Search business"
                                        onChange={handleSearch}
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
                                <Index.Button className='admin-adduser-btn btn-primary' onClick={openBusinessModal}>
                                    <img src={PagesIndex.Svg.plus} className="admin-plus-icon" alt='plus' />Add Business</Index.Button>
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
                                    <Index.TableCell component='th' variant='th' className='table-th' width="80%">Title</Index.TableCell>
                                    <Index.TableCell component='th' variant='th' className='table-th' width="15%">Actions</Index.TableCell>
                                </Index.TableRow>
                            </Index.TableHead>
                            <Index.TableBody className='table-body'>
                                {paginatedData && paginatedData.map((row, index) => {
                                    return (
                                        <Index.TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <Index.TableCell align='center' component='td' variant='td' className='table-td'>{(currentPage - 1) * recordsPerPage + index + 1}</Index.TableCell>
                                            <Index.TableCell component='td' variant='td' className='table-td'>{row?.businessType != undefined ? row?.businessType : "-"}</Index.TableCell>
                                            <Index.TableCell component='td' variant='td' className='table-td'>
                                                <Index.Box className="admin-table-data-btn-flex" sx={{ justifyContent: "start" }}>
                                                    <Index.Tooltip
                                                        title="Edit"
                                                        arrow
                                                        placement="bottom"
                                                        className="admin-tooltip"
                                                    >
                                                        <Index.Button className='admin-table-data-btn' onClick={() => handleEdit(row)}>
                                                            <img src={PagesIndex.Svg.blueedit} className='admin-icon' alt='Edit' />
                                                        </Index.Button>
                                                    </Index.Tooltip>

                                                    <Index.Tooltip
                                                        title="Delete"
                                                        arrow
                                                        placement="bottom"
                                                        className="admin-tooltip"
                                                    >
                                                        <Index.Button className='admin-table-data-btn'
                                                        onClick={() => handleDeleteOpen({businessId: row?._id})}
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
                        count={Math.ceil(filteredBusinessList.length / recordsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        className='admin-pagination'
                    />
                </Index.Box>
            </Index.Box>

            {/* Modal */}
            <Index.Modal
                open={modalOpen}
                // onClose={closeModal}
                className="business-modal"
            >
                <BusinessModal
                    handleClose={closeModal}
                    editData={editData}
                    setModalOpen={setModalOpen}
                    setEditData={setEditData}
                />
            </Index.Modal>


            <DeleteModal
                handleDeleteRecord={handleDelete}
                handleDeleteClose={handleDeleteClose}
                deleteOpen={deleteModalOpen}
                deleteMessage={"Are you sure? Do you really want to delete this business?"}
            />

        </>
    )
}
