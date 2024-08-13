import React from "react";
import PagesIndex from "../../../../component/PagesIndex";
import Index from '../../../Index';

const RegisteredUserChart = () => {
  const [registeredUser, setRegisteredUser] = PagesIndex.useState([]);
  const [registeredUserBar, setRegisterdUserBar] = PagesIndex.useState({
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: false // Hide the action button
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      //   return val + "%";
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        // formatter: function (val) {
        //   return val + "%";
        // },
      },
    },
  });

  const getRegisteredUserDetails = async () => {
    const data = await PagesIndex.getApi(
      PagesIndex.api.admin.getWeeklyRegiteredUser
    );
    if (data.length) {
      setRegisteredUser([
        {
          name: "Users",
          data: data.map((item) => item?.totalJoinedUser),
        },
      ]);

      setRegisterdUserBar((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: data.map((item) => PagesIndex.moment(item.date).format('ll')),
        },
      }));
    }
  };

  PagesIndex.useEffect(() => {
    getRegisteredUserDetails();
  }, []);

  return (
    <>
      <Index.Box className="chart-title-main">
        <Index.Typography className="chart-title" component="h2" variant="h2">
          Past Joined Users
        </Index.Typography>
      </Index.Box>
      <Index.Box className="chart-box">
        <PagesIndex.ReactApexChart
          options={registeredUserBar}
          series={registeredUser}
          type="bar"
        />
      </Index.Box>
    </>
  );
};

export default RegisteredUserChart;
