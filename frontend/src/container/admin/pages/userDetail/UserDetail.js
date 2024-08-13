import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Index from '../../../Index';
import TabKyc from './TabKyc';
import TabKyb from './TabKyb';
import Store from './Store';
import CustomStore from './CustomStore';
import PagesIndex from '../../../../component/PagesIndex';
import { ManageAccounts } from "@mui/icons-material";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Index.Box sx={{ p: 2 }}>{children}</Index.Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserDetail() {
    const [value, setValue] = React.useState(0);
    const { userId } = PagesIndex.useParams();
    const [userDetails, setUserDetails] = useState([]);
    const navigate = PagesIndex.useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUserList = async () => {
        const data = await PagesIndex.getApi(PagesIndex.api.admin.getUserListDetail + "/" + userId);
        if (data) {
            setUserDetails(data)
        }
    };

    useEffect(() => {
        getUserList()
    }, [])

    const handleBack = () => {
        navigate(-1);
    };

    const formatPublicKey = (publickKey) => {
        if (!publickKey || publickKey.length <= 6) {
            return publickKey;
        }
        return `${publickKey?.slice(0, 4)}...${publickKey?.slice(-4)}`;
    };

    return (
        <Index.Box className="tab-cont-box" sx={{ width: '100%' }}>
            <Index.Box class="page-header-box">
                {/* <Index.Typography variant='h3' class="page-title user-title">
                    <Index.Box class="page-title-icon bg-gradient-primary text-white mr-2">
                        <ManageAccounts />
                    </Index.Box> {userDetails?.email}
                </Index.Typography> */}
                {/* <Index.Box className="back-btn-box" sx={{ marginBottom: "16px" }}>
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box> */}
            </Index.Box>

            <Index.Box className="tab-cont-box" sx={{ width: '100%', marginBottom: "16px" }}>
                <Index.Box className="back-btn-box">
                    <Index.Button onClick={() => handleBack()} className='back-btn' type="submit">
                        <PagesIndex.KeyboardDoubleArrowLeftIcon />
                    </Index.Button>
                </Index.Box>
                <Index.Box className="card-box">
                    <Index.List className='list-style-1 column-two'>
                        <Index.ListItem>
                            <label class="form-label mb-0 custom-label-title">Email : </label>
                            <p class="custom-label-subtitle">{userDetails?.email}</p>
                        </Index.ListItem>
                        <Index.ListItem>
                            <label class="form-label mb-0 custom-label-title">Store Name : </label>
                            <p class="custom-label-subtitle">{userDetails?.storeDetails?.businessName}</p>
                        </Index.ListItem>
                        <Index.ListItem>
                            <label class="form-label mb-0 custom-label-title">Mobile Number : </label>
                            <p class="custom-label-subtitle">{userDetails?.storeDetails?.countryCode} &nbsp; {userDetails?.storeDetails?.mobileNumber}</p>
                        </Index.ListItem>
                        <Index.ListItem>
                            <label class="form-label mb-0 custom-label-title">Public Key : </label>
                            {userDetails?.publicKey ? (
                                <>
                                    <Index.Tooltip
                                        title={userDetails?.publicKey}
                                        placement="top"
                                    >
                                        <p className="custom-label-subtitle">{formatPublicKey(userDetails?.publicKey)}</p></Index.Tooltip>
                                    <CopyToClipboard text={userDetails?.publicKey}>
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
                        </Index.ListItem>
                    </Index.List>
                </Index.Box>
            </Index.Box>

            <Index.Box sx={{ borderBottom: 1, borderColor: 'divider', borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} className="bg-gradient-primary">
                <Index.Tabs className='tab-text-color' value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                    <Index.Tab label="Store Details" {...a11yProps(0)} />
                    <Index.Tab label="KYC - KYB" {...a11yProps(1)} />
                    {/* <Index.Tab label="KYB" {...a11yProps(1)} /> */}
                    {/* <Index.Tab label="Customize Store" {...a11yProps(2)} /> */}
                </Index.Tabs>
            </Index.Box>
            <CustomTabPanel value={value} index={0}>
                <Store userDetails={userDetails} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TabKyc userDetails={userDetails} userId={userId} />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
                <TabKyb userDetails={userDetails}/>
            </CustomTabPanel> */}
            {/* <CustomTabPanel value={value} index={2}>
                <CustomStore userDetails={userDetails} />
            </CustomTabPanel> */}
        </Index.Box>
    );
}