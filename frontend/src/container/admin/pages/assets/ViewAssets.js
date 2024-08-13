import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';

export default function ViewAssets() {
  const { assetId } = PagesIndex.useParams();
  const navigate = PagesIndex.useNavigate();

  const [assetsListDetail, setAssetsListDetail] = useState([]);


  const getAssetsList = async() => {
    const data = await PagesIndex.getApi(`${PagesIndex.api.admin.getAssetsListDetail}/${assetId}`);
    if(data)
    {
      setAssetsListDetail(data);
    }
  };
  useEffect(() => {
    getAssetsList()
  }, []);

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>

      <Index.Box className="admin-user-list-flex admin-page-title-main">
        <Index.Box className="page-header">
          <Index.Typography variant='h3' className="page-title">
            <Index.Box className="page-title-icon bg-gradient-primary text-white mr-2">
              <PagesIndex.DisplaySettingsIcon />
            </Index.Box> Assets Detail
          </Index.Typography>
        </Index.Box>
        <Index.Box className="back-btn-box">
          <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
            <PagesIndex.KeyboardDoubleArrowLeftIcon />
          </Index.Button>
        </Index.Box>
      </Index.Box>
      <Index.Box className="card-border common-card">
        <Index.Box className="card-box">
          <Index.Grid container spacing={3}>
            <Index.Grid item xs={12} md={3}>
              <Index.Box className="img-cont-box">
                <Index.Box className="front-photo front-photo-box">
                  <label className="form-label mb-0 custom-label-title">Logo</label>
                  <Index.Box className="img-detail-box-custoStore">
                    <img src={`${assetsListDetail?.image}`} className="object-fit-contain" alt="" />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} md={9}>
              <Index.List className='list-style-1'>
                <Index.ListItem>
                  <label className="form-label mb-0 custom-label-title">Code</label>
                  <p className="custom-label-subtitle">{assetsListDetail?.code != undefined ? assetsListDetail?.code : "-"}</p>
                </Index.ListItem>
                <Index.ListItem>
                  <label className="form-label mb-0 custom-label-title">Name</label>
                  <p className="custom-label-subtitle">{assetsListDetail?.name != undefined ? assetsListDetail?.name : "-"}</p>
                </Index.ListItem>
                <Index.ListItem>
                  <label className="form-label mb-0 custom-label-title">Issuer</label>
                  <p className="custom-label-subtitle">{assetsListDetail?.issuer != undefined ? assetsListDetail?.issuer : "-"}</p>
                </Index.ListItem>
                <Index.ListItem>
                  <label className="form-label mb-0 custom-label-title">Home Domain</label>
                  <p className="custom-label-subtitle">{assetsListDetail?.domain != undefined ? assetsListDetail?.domain : "-"}</p>
                </Index.ListItem>
                <Index.ListItem>
                  <label className="form-label mb-0 custom-label-title">Feature Block Title</label>
                  <p className="custom-label-subtitle">{assetsListDetail?.featuredBlockTitle ? assetsListDetail?.featuredBlockTitle : "-"}</p>
                </Index.ListItem>
              </Index.List>
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
      </Index.Box>
    </>
  )
}
