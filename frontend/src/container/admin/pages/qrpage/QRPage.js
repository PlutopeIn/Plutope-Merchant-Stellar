import React, { useEffect, useState } from 'react'
import './qrpage.css'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import QRCode from "react-qr-code";


export default function QRPage() {

    const { id } = PagesIndex.useParams();
    const [data, setData] = useState("");
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        getUserQrDetails()
    }, []);

    const getUserQrDetails = async() => {
        const data = await PagesIndex.getApi(PagesIndex.api.admin.getQR + '/' + id)
        if(data)
        {
            setData(data);
            setLoaded(true);
        }
    };

    return (
        <>
            <Index.Box className="qr-scanner-box">
                <Index.Box className="qr-detail-cont">
                    <Index.Grid container spacing={3}>
                        <Index.Grid item xs={12} md={12}>
                            <Index.Box className="merchant-icon-cont">
                                <Index.Box className="merchant-icon">
                                    <img src={`${PagesIndex.ImageURL}${data?.customizeStoreDetails?.coverPhoto}`} alt="" />
                                    {/* <img src={PagesIndex.Png.dummylogo} alt='logo' /> */}
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="merchant-cont-box">
                                <Index.Box className="merchant-detail">
                                    {/* <Index.Typography className="merchant-title">Business Name</Index.Typography> */}
                                    <Index.Typography className="merchant-title">{data?.storeDetails?.businessName != undefined ? data?.storeDetails?.businessName : "-"}</Index.Typography>
                                </Index.Box>
                                <Index.Box className="merchant-detail">
                                    {/* <Index.Typography className="merchant-subtitle">Address</Index.Typography> */}
                                    <Index.Typography className="merchant-subtitle">{data?.storeDetails?.address != undefined ? data?.storeDetails?.address : "-"}</Index.Typography>
                                </Index.Box>
                                <Index.Box className="merchant-detail merch-amt-curr">
                                    {/* <Index.Typography className="merchant-amt">5</Index.Typography>
                                    <Index.Typography className="merchant-amt">XLM</Index.Typography> */}
                                    <Index.Typography className="merchant-amt">{data?.amount}</Index.Typography>
                                    <Index.Typography className="merchant-amt">{data?.currency}</Index.Typography>
                                </Index.Box>
                                <Index.Box className="merchant-detail">
                                    {/* <Index.Typography className="merchant-subtitle">kanan@yopmail.com</Index.Typography> */}
                                    <Index.Typography className="merchant-subtitle">{data?.userId?.email != undefined ? data?.userId?.email : "-"}</Index.Typography>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="merchant-qr-img-box">
                                <Index.Box className="merchant-qr-img">
                                    {loaded && (
                                        <QRCode value={data?.link} />
                                    )}
                                    {loaded && (
                                        <Index.Box className="company-icon">
                                            <img src={PagesIndex.Png.paymentLogo} alt='logo' />
                                        </Index.Box>
                                    )}
                                    {/* <img src={PagesIndex.Png.qrExample} alt='logo' />
                                    <Index.Box className="company-icon">
                                        <img src={PagesIndex.Png.paymentLogo} alt='logo' />
                                    </Index.Box> */}
                                </Index.Box>
                                <div class="scan-code">
                                    <span class="scan-code__angle scan-code__angle--top"></span>
                                    <span class="scan-code__angle scan-code__angle--bottom"></span>
                                </div>
                            </Index.Box>
                            <Index.Box className="scan-qr-bottom">
                                <Index.Typography className="merchant-footer">Scan this QR Code</Index.Typography>
                            </Index.Box>
                        </Index.Grid>
                    </Index.Grid>
                </Index.Box>
            </Index.Box>
        </>
    )
}
