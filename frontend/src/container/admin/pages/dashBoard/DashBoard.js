import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Index from "../../../Index";
import PagesIndex from "../../../../component/PagesIndex";
import "./dashBoard.css";
import "./dashBoard.responsive.css";
import RegisteredUserChart from "./RegisteredUserChart";
import CategoeryStoreChart from "./CategoeryStoreChart";

// for custom progressbar design
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function Dashboard() {
  const [dashboardTiles, setDashboardTiles] = PagesIndex.useState({});

  const navigate = PagesIndex.useNavigate();

  const dashboadData = async () => {
    const data = await PagesIndex.getApi(PagesIndex.api.admin.getDashboardData);
    if (data) {
      setDashboardTiles(data);
    }
  };

  PagesIndex.useEffect(() => {
    dashboadData();
  }, []);

  return (
    <Index.Box className="admin-dashboard-content">
      <Index.Box className="admin-user-list-flex admin-page-title-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          Dashboard
        </Index.Typography>
      </Index.Box>
      <Index.Box className="admin-dashboad-row">
        <Index.Box className="admin-dash-card-row">
          <Index.Box
            className="grid-column"
            onClick={() => navigate("/admin/user-list")}
          >
            <Index.Box className="admin-dashboard-box common-card">
              <Index.Box className="admin-dashboard-inner-box">
                <Index.Box className="admin-dash-left">
                  <Index.Typography
                    className="admin-dash-text"
                    variant="p"
                    component="p"
                  >
                    Total Users
                  </Index.Typography>
                  <Index.Typography
                    className="admin-dash-price"
                    variant="h1"
                    component="h1"
                  >
                    {dashboardTiles?.totalUser}
                  </Index.Typography>
                </Index.Box>
                <Index.Box className="admin-dash-right">
                  <Index.Box className="admin-dash-icon-box">
                    <img
                      src={PagesIndex.Svg.dashicon1}
                      className="admin-dash-icons"
                      alt="dashboard icon"
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box
            className="grid-column"
            onClick={() => navigate("/admin/assets")}
          >
            <Index.Box className="admin-dashboard-box common-card">
              <Index.Box className="admin-dashboard-inner-box">
                <Index.Box className="admin-dash-left">
                  <Index.Typography
                    className="admin-dash-text"
                    variant="p"
                    component="p"
                  >
                    Total Assets
                  </Index.Typography>
                  <Index.Typography
                    className="admin-dash-price"
                    variant="h1"
                    component="h1"
                  >
                    {dashboardTiles?.totalAssests}
                  </Index.Typography>
                </Index.Box>
                <Index.Box className="admin-dash-right">
                  <Index.Box className="admin-dash-icon-box">
                    <img
                      src={PagesIndex.Svg.dashicon2}
                      className="admin-dash-icons"
                      alt="dashboard icon"
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box
            className="grid-column"
            onClick={() => navigate("/admin/kyc")}
          >
            <Index.Box className="admin-dashboard-box common-card">
              <Index.Box className="admin-dashboard-inner-box">
                <Index.Box className="admin-dash-left">
                  <Index.Typography
                    className="admin-dash-text"
                    variant="p"
                    component="p"
                  >
                    Total Pending KYC
                  </Index.Typography>
                  <Index.Typography
                    className="admin-dash-price"
                    variant="h1"
                    component="h1"
                  >
                    {dashboardTiles?.totalPendingKyc}
                  </Index.Typography>
                </Index.Box>
                <Index.Box className="admin-dash-right">
                  <Index.Box className="admin-dash-icon-box">
                    <img
                      src={PagesIndex.Svg.dashicon3}
                      className="admin-dash-icons"
                      alt="dashboard icon"
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box
            className="grid-column"
            onClick={() => navigate("/admin/kyb")}
          >
            <Index.Box className="admin-dashboard-box common-card">
              <Index.Box className="admin-dashboard-inner-box">
                <Index.Box className="admin-dash-left">
                  <Index.Typography
                    className="admin-dash-text"
                    variant="p"
                    component="p"
                  >
                    Total Pending KYB
                  </Index.Typography>
                  <Index.Typography
                    className="admin-dash-price"
                    variant="h1"
                    component="h1"
                  >
                    {dashboardTiles?.totalPendingKyb}
                  </Index.Typography>
                </Index.Box>
                <Index.Box className="admin-dash-right">
                  <Index.Box className="admin-dash-icon-box">
                    <img
                      src={PagesIndex.Svg.dashicon4}
                      className="admin-dash-icons"
                      alt="dashboard icon"
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>

      <Index.Box className="title-row-flex">
        <Index.Box className="admin-sub-title-main">
          <Index.Typography
            className="admin-sub-title"
            component="h2"
            variant="h2"
          >
            Analytics
          </Index.Typography>
        </Index.Box>
        <Index.Box className="admin-userlist-inner-btn-flex">
          <Index.Box className="admin-adduser-btn-main border-btn-main">
            <Index.Button className="admin-adduser-btn border-btn">
              Watch History
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>

      <Index.Box className="chart-row-main">
        {/* Store chart */}
        <Index.Box className="chart-col common-card">
          <CategoeryStoreChart />
        </Index.Box>

        {/* Registered user char */}
        <Index.Box className="chart-col common-card">
          <RegisteredUserChart />
        </Index.Box>
      </Index.Box>

      {/* <Index.Box className="admin-progress-bar-content">
          <Index.Typography className='admin-page-title' component='h2' variant='h2'>Progress Bar</Index.Typography>
          <Index.Box className="admin-progress-bar-main">
            <BorderLinearProgress variant="determinate" value={50} className="admin-progress-bar" />
            <span className="admin-progress-bar-text">50%</span>
          </Index.Box>
        </Index.Box> */}
    </Index.Box>
  );
}
