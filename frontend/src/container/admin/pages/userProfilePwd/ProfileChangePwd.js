import * as React from 'react';
import PropTypes from 'prop-types';
import Index from '../../../Index';
import Profile from '../../pages/profile/Profile'
import ChangePassword from '../../pages/changepassword/ChangePassword'
import { useState } from 'react';

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

export default function ProfileChangePwd() {
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Index.Box className="tab-cont-box tab-cont-box-rm" sx={{ width: '100%' }}>
            <Index.Box sx={{ borderBottom: 1, borderColor: 'divider', borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} className="bg-gradient-primary">
                <Index.Tabs className='tab-text-color' value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                    <Index.Tab label="User Profile" {...a11yProps(0)} />
                    <Index.Tab label="Change Password" {...a11yProps(1)} />
                </Index.Tabs>
            </Index.Box>
            <CustomTabPanel value={value} index={0}>
                <Profile/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ChangePassword/>
            </CustomTabPanel>
        </Index.Box>
    );
}