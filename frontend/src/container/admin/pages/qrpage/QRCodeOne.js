import React from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function QRCodeOne() {
    return (
        <>
            <Index.Box className="qr-code-box qr-code-wrapper">
                <Index.Box className="qr-code-cont-box">
                    <Index.Grid container spacing={3}>
                        <Index.Grid item xs={12} md={12}>
                            <Index.Box className="right-side-icon">
                                <Index.Box className="text-center">
                                    <a className="navbar-brand brand-logo" href="/admin/dashboard">                                        
                                        <img src={PagesIndex.Svg.logo} alt='logo' />
                                    </a>
                                </Index.Box>
                                {/* <Index.Typography className="page-title" sx={{ margin: "0 auto", justifyContent: "center", fontWeight: "bold" }}>Scan this QR Code</Index.Typography> */}
                                <Index.Box className="amount-cont-box">
                                    <Index.Grid container spacing={2} sx={{ alignItems: "center" }}>
                                        <Index.Grid item xs={8} md={8}>
                                            <Index.Box className="amount-detail">
                                                <Index.Typography className="qr-subtitle xlg-font">A$51.00</Index.Typography>
                                                <Index.Typography className='date-subtitle'>Due November 26, 2024</Index.Typography>
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
                                                                display: 'flex',
                                                                justifyContent: 'start',
                                                                alignItems: 'center',
                                                                gap: '4px',
                                                                margin: '4px 0px'
                                                            }}
                                                        >
                                                            <Index.Typography className='qr-subtitle sm-font'>ADSDD...HIFTJ</Index.Typography>
                                                            <PagesIndex.ContentCopyIcon style={{ fontSize: 16 }} sx={{ color: '#0093E9' }} />
                                                        </Index.Link>
                                                    </CopyToClipboard>
                                                </Index.Typography>
                                            </Index.Box>
                                        </Index.Grid>
                                        <Index.Grid item xs={4} md={4} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Index.Box class="qr-code web-img">
                                                <img src={PagesIndex.Png.qrExample} />
                                            </Index.Box>
                                        </Index.Grid>
                                    </Index.Grid>
                                </Index.Box>
                                <Index.Box className="qr-descrip two-column">
                                    <Index.Box className="qr-box-details">
                                        <Index.Typography className="qr-title">To : </Index.Typography>
                                        <Index.Typography className='qr-subtitle' sx={{ marginLeft: "4px" }}>Jenny Rosen</Index.Typography>
                                    </Index.Box>
                                    <Index.Box className="qr-box-details">
                                        <Index.Typography className="qr-title">From : </Index.Typography>
                                        <Index.Typography className='qr-subtitle' sx={{ marginLeft: "4px" }}>Rocket Rides</Index.Typography>
                                    </Index.Box>
                                    <Index.Box className="qr-box-details">
                                        <Index.Typography className="qr-title">Invoice No : </Index.Typography>
                                        <Index.Typography className='qr-subtitle' sx={{ marginLeft: "4px" }}>#4647313646</Index.Typography>
                                    </Index.Box>
                                    <Index.Box className="qr-box-details">
                                        <Index.Typography className="qr-title">Memo : </Index.Typography>
                                        <Index.Typography className='qr-subtitle' sx={{ marginLeft: "4px" }}>Deposit 10252</Index.Typography>
                                    </Index.Box>
                                </Index.Box>
                                <Index.Box className="btn-box-cont">
                                    <Index.Box className="admin-save-btn-main btn-main-primary">
                                        <Index.Button className='admin-save-user-btn btn-primary' type="submit">
                                            <img src={PagesIndex.Svg.share} className="admin-user-save-icon" alt='Save'></img>Share this QR Code</Index.Button>
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
