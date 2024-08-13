import React from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../PagesIndex'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function QRCodeOne() {
    return (
        <>
            <Index.Box className="qr-code-box">
                <Index.Box className="qr-code-cont-box">
                    <Index.Grid container spacing={3}>
                        <Index.Grid item xs={12} md={6}>
                            <Index.Typography className="page-title" sx={{ margin: "0 auto", justifyContent: "center", fontWeight: "bold" }}>Scan this QR Code</Index.Typography>
                            <Index.Box class="qr-icon">
                                <img src={PagesIndex.Png.qrExample} />
                            </Index.Box>
                            <Index.Box className="qr-box-details">
                                {/* <Index.Typography className="qr-title">Tax ID</Index.Typography> */}
                                <Index.Typography className='qr-subtitle'>
                                    <CopyToClipboard text="123456789">
                                        <Index.Link
                                            title="Copy to clipboard"
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                marginLeft: '5px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <Index.Typography className='qr-subtitle lg-font'>ADSDD...HIFTJ</Index.Typography>
                                            <PagesIndex.ContentCopyIcon style={{ fontSize: 20 }} sx={{ color: '#1e9b4b' }} />
                                        </Index.Link>
                                    </CopyToClipboard>
                                </Index.Typography>
                            </Index.Box>
                            <Index.Grid item xs={12} md={12}>
                                <Index.Box className="btn-box-cont">
                                    <Index.Box className="admin-save-btn-main btn-main-primary">
                                        <Index.Button className='admin-save-user-btn btn-primary' type="submit">
                                            <img src={PagesIndex.Svg.share} className="admin-user-save-icon" alt='Save'></img>Share this QR Code</Index.Button>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Grid>
                        </Index.Grid>
                        <Index.Grid item xs={12} md={6} sx={{ display: "flex", alignItems: 'center' }}>
                            <Index.Box className="left-side-cont">
                                <Index.Grid container spacing={1}>
                                    <Index.Grid item xs={12} md={12}>
                                        <Index.Box className="store-icon">
                                            <img src={PagesIndex.Png.store} />
                                        </Index.Box>
                                        <Index.Box className="text-center">
                                            <a className="navbar-brand brand-logo" href="/admin/dashboard">
                                                {/* <div className="glass-effect"> */}
                                                <img src={PagesIndex.Svg.logo} sx={{ width: '400px' }} alt='logo' />
                                                {/* </div> */}
                                            </a>
                                        </Index.Box>
                                    </Index.Grid>
                                    <Index.Grid item xs={12} md={12}>
                                        <Index.Box className="qr-descrip">
                                            <Index.Box className="qr-box-details">
                                                {/* <Index.Typography className="qr-title">Store Name : </Index.Typography> */}
                                                <Index.Typography className='qr-subtitle'>Store Name</Index.Typography>
                                            </Index.Box>
                                            <Index.Box className="qr-box-details">
                                                {/* <Index.Typography className="qr-title">Company Name : </Index.Typography> */}
                                                <Index.Typography className='qr-subtitle page-title'>Company Name</Index.Typography>
                                            </Index.Box>
                                            <Index.Box className="qr-box-details">
                                                {/* <Index.Typography className="qr-title">Country : </Index.Typography> */}
                                                <Index.Typography className='qr-subtitle'>Country</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Grid>
                                </Index.Grid>
                            </Index.Box>
                        </Index.Grid>
                    </Index.Grid>
                </Index.Box>
            </Index.Box>
        </>
    )
}
