import React, { useEffect, useState } from 'react'
import './qrcode.css'
import Index from '../../../Index'
import PagesIndex from '../../../../component/PagesIndex';
import QRCode from "react-qr-code";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function QRCodeFile() {

    const { id } = PagesIndex.useParams();
    const [data, setData] = useState("");
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        getUserQrDetails()
        handleReceivePayment();
    }, []);

    const getUserQrDetails = async () => {
        const data = await PagesIndex.getApi(PagesIndex.api.admin.getQR + '/' + id)
        if (data) {
            setData(data);
            setLoaded(true);
        }
    };

    const handleReceivePayment = async () => {
        // try {
        //   const server = new StellarSdk.Server(url);
        //   var payments = server.payments().forAccount(walletPrivateData?.publicKey);
        //   payments.stream({
        //     onmessage: function (payment: a) {
        //       Log('receive payment', JSON.stringify(payment));
        //       fetchMyAssetsList();
        //     },

        //     onerror: function (error: any) {
        //       Log('Error in payment stream', error);
        //     },
        //   });
        // } catch (error: any) {
        //   Log('Error in stream', error);
        // }

        // var StellarSdk = require("stellar-sdk");

        // var server = new StellarSdk.Horizon.Server(
        //     "https://horizon-testnet.stellar.org",
        // );
        // var accountId = "GC2BKLYOOYPDEFJKLKY6FNNRQMGFLVHJKQRGNSSRRGSMPGF32LHCQVGF";

        // // Create an API call to query payments involving the account.
        // var payments = server.payments().forAccount(accountId);

        // // If some payments have already been handled, start the results from the
        // // last seen payment. (See below in `handlePayment` where it gets saved.)
        // var lastToken = loadLastPagingToken();
        // if (lastToken) {
        //     payments.cursor(lastToken);
        // }

        // // `stream` will send each recorded payment, one by one, then keep the
        // // connection open and continue to send you new payments as they occur.
        // payments.stream({
        //     onmessage: function (payment) {
        //         // Record the paging token so we can start from here next time.
        //         savePagingToken(payment.paging_token);

        //         // The payments stream includes both sent and received payments. We only
        //         // want to process received payments here.
        //         if (payment.to !== accountId) {
        //             return;
        //         }

        //         // In Stellar’s API, Lumens are referred to as the “native” type. Other
        //         // asset types have more detailed information.
        //         var asset;
        //         if (payment.asset_type === "native") {
        //             asset = "lumens";
        //         } else {
        //             asset = payment.asset_code + ":" + payment.asset_issuer;
        //         }

        //         console.log(payment.amount + " " + asset + " from " + payment.from);
        //     },

        //     onerror: function (error) {
        //         console.error("Error in payment stream");
        //     },
        // });
    };


    return (
        <>
            <Index.Box className="qr-code-data">
                <Index.Box className="qr-data-detail">
                    <Index.Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Index.Grid item xs={12} md={12}>
                            <Index.Box className="qr-company-icon">
                                <img src={`${PagesIndex.ImageURL}${data?.customizeStoreDetails?.logo}`} alt="" />
                                {/* <img src={PagesIndex.Png.Frame} alt='logo' /> */}
                            </Index.Box>
                        </Index.Grid>


                        <Index.Grid item xs={12} md={12}>
                            <Index.Box className="qr-data-cont">
                                <Index.Typography className="qr-code-title-scan">Scan this QR Code</Index.Typography>

                                <Index.Box className="qr-data-img">
                                    {/* <img src={PagesIndex.Png.NewQRCode} alt='logo' /> */}
                                    {loaded && (
                                        <QRCode value={data?.link} />
                                    )}
                                    {loaded && (
                                        <>
                                            <Index.Box className="company-icon-middle">
                                                <img src={PagesIndex.Png.paymentLogo} alt='logo' />
                                            </Index.Box>
                                            {data?.status == "Completed" && (
                                                <Index.Box className="paid-box">
                                                    <img src={PagesIndex.Png.Paid} alt='logo' />
                                                </Index.Box>
                                            )}
                                        </>
                                    )}
                                </Index.Box>


                                <Index.Box className="qr-desrip-box brder-box-1">
                                    {/* <Index.Typography className="qr-code-title">10 SRT</Index.Typography> */}
                                    <Index.Box className="bordr-btm" sx={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                        <Index.Typography className="qr-code-title-price">{data?.amount}</Index.Typography>
                                        <Index.Typography className="qr-code-title-price">{data?.currency}</Index.Typography>
                                    </Index.Box>
                                </Index.Box>
                                <Index.Box className="qr-desrip-box brder-box-2">
                                    <Index.Box className="qr-descrip-detail">
                                        <Index.Typography className="qr-descrip-title">Requested By</Index.Typography>
                                        <Index.Box sx={{ display: "flex", gap: "4px" }}>
                                            <Index.Typography className="qr-descrip-subTitle">{data?.userId?.email != undefined ? data?.userId?.email : "-"}</Index.Typography>
                                            <CopyToClipboard text={data?.userId?.email}>
                                                <Index.Link
                                                    title="Copy to clipboard"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    <PagesIndex.ContentCopyIcon style={{ fontSize: 18 }} sx={{ color: '#fff' }} />
                                                </Index.Link>
                                            </CopyToClipboard>
                                        </Index.Box>

                                    </Index.Box>
                                    <Index.Box className="qr-descrip-detail">
                                        <Index.Typography className="qr-descrip-title">Wallet Address</Index.Typography>
                                        {/* <Index.Typography className="qr-descrip-subTitle">{data?.userId?.email != undefined ? data?.userId?.email : "-"}</Index.Typography> */}
                                        <Index.Box sx={{ display: "flex", gap: "4px", alignItems: "end" }}>
                                            <Index.Typography className="qr-descrip-subTitle" sx={{ wordBreak: "break-word" }}>{data?.userId?.publicKey != undefined ? data?.userId?.publicKey : "-"}</Index.Typography>
                                            <CopyToClipboard text={data?.userId?.publicKey}>
                                                <Index.Link
                                                    title="Copy to clipboard"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    <PagesIndex.ContentCopyIcon style={{ fontSize: 18 }} sx={{ color: '#fff' }} />
                                                </Index.Link>
                                            </CopyToClipboard>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="qr-descrip-detail">
                                        <Index.Typography className="qr-descrip-title">Memo</Index.Typography>
                                        {/* <Index.Typography className="qr-descrip-subTitle">{data?.userId?.email != undefined ? data?.userId?.email : "-"}</Index.Typography> */}
                                        <Index.Box sx={{ display: "flex", gap: "4px" }}>
                                            <Index.Typography className="qr-descrip-subTitle">{data?.memoId}</Index.Typography>
                                            <CopyToClipboard text={data?.memoId}>
                                                <Index.Link
                                                    title="Copy to clipboard"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    <PagesIndex.ContentCopyIcon style={{ fontSize: 18 }} sx={{ color: '#fff' }} />
                                                </Index.Link>
                                            </CopyToClipboard>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="qr-descrip-detail">
                                        <Index.Typography className="qr-descrip-title">Message</Index.Typography>
                                        {/* <Index.Typography className="qr-descrip-subTitle">{data?.userId?.email != undefined ? data?.userId?.email : "-"}</Index.Typography> */}
                                        <Index.Typography className="qr-descrip-subTitle">{data?.message}</Index.Typography>
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
