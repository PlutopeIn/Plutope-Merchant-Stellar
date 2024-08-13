import React, { useEffect, useState } from 'react'
import PagesIndex from '../../../../component/PagesIndex';
import SumsubWebSdk from '@sumsub/websdk-react'
const Verification = () => {

    // const id = '6684110db9df5a5183bd6448';
    const { id } = PagesIndex.useParams();
    const [loaded, setLoaded] = useState(false);
    const navigate = PagesIndex.useNavigate();

    // const [token, setToken] = useState();

    const [token, setToken] = useState();

    useEffect(() => {
        getUserList()
    }, []);

    const getUserList = () => {
        PagesIndex.postApi(PagesIndex.api.admin.getSumsubToken,
            { userId: id }, false
        ).then((res) => {
            setToken(res?.data?.token)
            setLoaded(true);
        });
    };

    async function handleMessage(data, payload) {
       
        if (data == 'idCheck.onApplicantStatusChanged' && payload?.reviewResult?.reviewAnswer == 'GREEN' && payload?.reviewStatus == "completed") {
            setTimeout(() => {
                navigate("/success");
            }, 10000);
        }

    }
    return (
        <>
            <div id="sumsub-container" style={{ width: '100%', height: '100%' }}>
                {loaded &&
                    <SumsubWebSdk
                        testEnv={true}
                        accessToken={token}
                        expirationHandler={() => token}
                        config={{
                            // lang: "zh-tw"
                            // email: "test@gmail.com",
                            // phone: "0912234456"
                        }}
                        options={{ addViewportTag: false, adaptIframeHeight: true }}
                        onMessage={(data, payload) => handleMessage(data, payload)}
                        onError={(data) => console.log("onError", data)}
                    />
                }
            </div>
        </>
    )
}

export default Verification;

