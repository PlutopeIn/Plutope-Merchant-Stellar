import Index from '../../../Index'
import ReactHtmlParser from "react-html-parser";
import PagesIndex from '../../../../component/PagesIndex';
import React, { useEffect, useState } from 'react'

export default function PrivacyPolicy() {

      const [data, setData] = useState("");
      const [loaded, setLoaded] = useState(false);
      useEffect(() => {
            getCMSdata()
      }, []);

      const getCMSdata = async () => {
            const data = await PagesIndex.getApi(PagesIndex.api.admin.getCms)
            if (data) {
                  setData(data);
                  setLoaded(true);
            }
      };
      return (
            <>
                  <Index.Box>
                        <Index.Grid container className="page-cont-box">
                              <Index.Grid item md={11}>
                                    <Index.Box>
                                          <h3>Privacy Policy</h3>
                                          {ReactHtmlParser(data[0]?.privacyPolicy?.description)}
                                    </Index.Box>
                              </Index.Grid>
                        </Index.Grid>
                  </Index.Box>
            </>
      )
}
