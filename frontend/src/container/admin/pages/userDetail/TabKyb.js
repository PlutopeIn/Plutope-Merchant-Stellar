import React from 'react'
import Index from '../../../Index'
import { ManageAccounts } from '@mui/icons-material';
import PagesIndex from '../../../../component/PagesIndex';

export default function TabKyb({userDetails}) {
    const navigate = PagesIndex.useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Index.Box class="page-header-box">
                <Index.Typography variant='h3' class="page-title">
                    <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                        <ManageAccounts />
                    </Index.Box> KYB
                </Index.Typography>
                <Index.Box className="back-btn-box">
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box>
            </Index.Box>

            <Index.Box className="card-box">
                <Index.List className='list-style-1'>
                    <Index.ListItem>
                        <label class="form-label mb-0 custom-label-title">Business Id : </label>
                        <p class="custom-label-subtitle">{userDetails?.kybDetails?.businessId}</p>
                    </Index.ListItem>
                    <Index.ListItem>
                        <label class="form-label mb-0 custom-label-title">Company Name : </label>
                        <p class="custom-label-subtitle">{userDetails?.kybDetails?.companyName}</p>
                    </Index.ListItem>
                </Index.List>
                <Index.Box className="card-box">
                <Index.Grid container spacing={3} sx={{ alignItems: "end" }}>
                    <Index.Grid item xs={12} md={2}>
                        <Index.Box className="img-cont-box">
                            <Index.Box class="front-photo">
                                <label class="form-label mb-0 custom-label-title">Business ID Photo</label>
                                <Index.Box className="img-detail-box">
                                    <img src={`${PagesIndex.ImageURL}${userDetails?.kybDetails?.businessImage}`} alt="" />
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Grid>
                </Index.Grid>
            </Index.Box>
            </Index.Box>

        </>
    )
}
