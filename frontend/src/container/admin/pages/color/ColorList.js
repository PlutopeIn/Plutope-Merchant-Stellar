import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import { FormatColorFill } from '@mui/icons-material';
import ColorModal from './ColorModal';


export default function ColorList() {

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [colorsList, setColorsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [colorId, setColorId] = useState();
  const recordsPerPage = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editData, setEditData] = useState();

  const getColorsList = async() => {

    const data  = await PagesIndex.getApi(PagesIndex.api.admin.getColorsList);
    if(data.length){
      setColorsList(data);
    }
  };

  useEffect(() => {
    getColorsList()
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredColorsList = colorsList?.filter(asset => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      asset.color.toLowerCase().includes(searchTerm)
    );
  });


  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = filteredColorsList?.slice(startIndex, startIndex + recordsPerPage);

  // Delete function declaration
  // Delete function declaration
  const deleteColorsList = async () => {
    const response = await PagesIndex.postApi(
      PagesIndex.api.admin.deleteColors,
      { id: colorId }
    );
    if (response) {
      getColorsList();
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteModalOpen = (id) => {
    setDeleteModalOpen(true);
    setColorId(id);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setColorId("");
  };


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


  return (
    <>

      <Index.Box className="admin-dashboard-content admin-user-list-content">
        <Index.Box className="admin-user-list-flex admin-page-title-main">
          <Index.Box class="page-header">
            <Index.Typography variant='h3' class="page-title">
              <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                <FormatColorFill />
              </Index.Box> Color
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
                    placeholder="Search color"
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
                <Index.Button className='admin-adduser-btn btn-primary' onClick={openCategoryModal}>
                  <img src={PagesIndex.Svg.plus} className="admin-plus-icon" alt='plus' />Add Color</Index.Button>
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
                  <Index.TableCell component='th' variant='th' className='table-th' width="15%">Color Icon</Index.TableCell>
                  <Index.TableCell component='th' variant='th' className='table-th' width="60%">Color</Index.TableCell>
                  <Index.TableCell component='th' variant='th' align='center' className='table-th' width="20%">Actions</Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>
              <Index.TableBody className='table-body'>
                {paginatedData && paginatedData.map((row, index) => {
                  return (
                    <Index.TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <Index.TableCell align='center' component='td' variant='td' className='table-td'>{(currentPage - 1) * recordsPerPage + index + 1}</Index.TableCell>
                      <Index.TableCell component='td' variant='td' className='table-td'>
                        <Index.Box className="user-form-group">
                          <Index.TextField
                            className="user-form-control text-black color-box"
                            type="color"
                            value={row.color}
                            sx={{ margin: "0 auto" }}
                          />
                        </Index.Box>
                      </Index.TableCell>
                      <Index.TableCell component='td' variant='td' className='table-td'>{row.color}</Index.TableCell>
                      <Index.TableCell component='td' variant='td' className='table-td'>
                        <Index.Box className="admin-table-data-btn-flex">
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

                          {/* <Index.Tooltip
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
                          </Index.Tooltip> */}

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
            count={Math.ceil(filteredColorsList?.length / recordsPerPage)}
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
        <ColorModal
          handleClose={closeModal}
          editData={editData}
          setModalOpen={setModalOpen}
          setEditData={setEditData}
          getColorsList={getColorsList}
        />
      </Index.Modal>

      {/* Delete Modal */}
      <PagesIndex.DeleteModal
        deleteOpen={deleteModalOpen}
        handleDeleteRecord={deleteColorsList}
        handleDeleteClose={handleDeleteModalClose}
        deleteMessage={"Are you sure you want to delete this record?"}
      />
      {/* End Delete Modal */}

    </>
  )
}
