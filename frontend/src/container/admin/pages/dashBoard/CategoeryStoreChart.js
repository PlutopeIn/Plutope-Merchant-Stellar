import React from "react";
import PagesIndex from "../../../../component/PagesIndex";
import Index from "../../../Index";

const CategoeryStoreChart = () => {
  const [storeDate, setStoreData] = PagesIndex.useState([]);
  const [chartOptions, setChartOptions] = PagesIndex.useState({
    chart: {
      width: 500,
      height: 400,
      type: "pie",
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const getStoreDetails = async () => {
    const data = await PagesIndex.getApi(
      PagesIndex.api.admin.getStoreListFromCategory
    );
    if (data.length) {
      setStoreData(data.map((item) => item.totalStores));

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        labels: data.map((item) => item.categoryName),
      }));
    }
  };
  PagesIndex.useEffect(() => {
    getStoreDetails();
  }, []);
  return (
    <>
      <Index.Box className="chart-title-main">
        <Index.Typography className="chart-title" component="h2" variant="h2">
          Category Stores
        </Index.Typography>
      </Index.Box>
      <Index.Box className="pie-chart-main">
        <Index.Box className="chart-box">
          <PagesIndex.ReactApexChart
            options={chartOptions}
            series={storeDate}
            type="pie"
            width={chartOptions.chart.width}
            height={chartOptions.chart.height}
          />
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default CategoeryStoreChart;
