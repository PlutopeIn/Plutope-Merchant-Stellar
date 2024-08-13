import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import { BallotOutlined } from '@mui/icons-material'
import CategoryModal from './CategoryModal';
import DeleteModal from '../../../../component/common/modal/DeleteModal';
import PagesIndex from '../../../../component/PagesIndex';

export default function Category() {
    const [categoryList, setCategoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const recordsPerPage = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editData, setEditData] = useState();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    const filteredCategoryList = categoryList.filter(category => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            (category.categoryName && category.categoryName.toLowerCase().includes(searchTerm))
        )
    });

    const getCategoryList = async() => {
        const data  = await PagesIndex.getApi(PagesIndex.api.admin.getCategoryList);
        if(data.length){
            setCategoryList(data);
        }
    };

    useEffect(() => {
        getCategoryList()
    }, [modalOpen]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filteredCategoryList?.slice(startIndex, startIndex + recordsPerPage);


    const openCategoryModal = () => {
        setModalOpen(true);
        setAnchorEl(null);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditData("");
    };
    const handleEdit = (row) => {
        setEditData(row);
        setModalOpen(true);
        setAnchorEl(null);
    };

    // delete function declaration
    const handleDeleteClose = () => {
        setDeleteModalOpen(false);
        setEditData("");
    };
    const handleDeleteOpen = (id) => {
        setCategoryId(id);
        setDeleteModalOpen(true);
        setAnchorEl(null);
    };

    const handleDelete = async () => {

        const response = await PagesIndex.postApi(
            PagesIndex.api.admin.deleteCategory,
            categoryId
          );
        if(response)
        {
            getCategoryList();
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
                                <BallotOutlined />
                            </Index.Box> Category
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
                                        placeholder="Search category"
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
                                <Index.Button className='admin-adduser-btn btn-primary' onClick={openCategoryModal}>
                                    <img src={PagesIndex.Svg.plus} className="admin-plus-icon" alt='plus' />Add Category</Index.Button>
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
                                            <Index.TableCell component='td' variant='td' className='table-td'>{row?.categoryName != undefined ? row?.categoryName : "-"}</Index.TableCell>
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
                                                            onClick={() => handleDeleteOpen({ categoryId: row?._id })}
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
                        count={Math.ceil(filteredCategoryList.length / recordsPerPage)}
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
                className="category-modal"
            >
                <CategoryModal
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
                deleteMessage={"Are you sure? Do you really want to delete this category?"}
            />

        </>
    )
}
