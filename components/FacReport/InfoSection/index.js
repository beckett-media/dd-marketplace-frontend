import * as React from "react"
// import Chart from ""
import loadable from "@loadable/component"
import Instagram from "../../../public/static/img/facreport/svgs/Instagram.svg"
import Facebook from "../../../public/static/img/facreport/svgs/Facebook.svg"
import Youtube from "../../../public/static/img/facreport/svgs/Youtube.svg"
import Twitter from "../../../public/static/img/facreport/svgs/Twitter.svg"
import VerifiedBadge from "../../../public/static/img/facreport/svgs/verifiedbBadge.jpg"

import { CONFIG } from "../Config"
// import Loader from "../../Loader"

const Chart = loadable(() => import("react-apexcharts"))

const ChartSection = ({ priceData, loading }) => {
  const [chartData, setChartData] = React.useState({})
  const [period, setPeriod] = React.useState("monthly")

  const getMonthName = monthNumber => {
    let date = new Date(2020, monthNumber, 1)
    let monthName = date.toLocaleString("en-us", { month: "short" })
    return monthName
  }

  React.useEffect(() => {
    if (priceData) {
      let chartData = {
        options: {
          chart: {
            id: "apexchart-example",
            foreColor: "#ffffff",
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: "smooth",
            lineCap: "butt",
            colors: "#30BACC",
          },
          xaxis: {
            ...(period === "monthly"
              ? {
                type: "category",
                categories: priceData.map(({ _id }) => getMonthName(_id)),
              }
              : { type: "datetime" }),
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return `$${Math.ceil(value * 10) / 10}`
              },
            },
          },
          tooltip: {
            custom: ({ dataPointIndex, w }) => {
              return (
                '<div class="graph-tooltip">' +
                "<span>" +
                "$" +
                w.globals.stackedSeriesTotals[dataPointIndex] +
                "</span>" +
                "</div>"
              )
            },
          },
        },

        series: [
          {
            name: "Price",
            data:
              period === "monthly"
                ? priceData.map(({ avgValue }) => Math.ceil(avgValue))
                : priceData.map(({ date, avgValue }) => ({
                  x: new Date(date).getTime(),
                  y: Math.ceil(avgValue),
                })),
          },
        ],
      }
      setChartData(chartData)
    }
  }, [priceData])

  return (
    <div
      className="max-val-box w-100 position-relative py-3"
      style={{ height: 375 }}
    >
      {loading ? (
        <div className="d-flex justify-content-center p-5 align-items-center h-100">
        </div>
      ) : (
        chartData &&
        priceData && (
          <Chart
            style={{ paddingTop: 20 }}
            // options={options}
            // series={series}
            options={chartData.options}
            series={chartData.series}
            // type="line"
            type="line"
            width={"100%"}
            height={320}
          />
        )
      )}
    </div>
  )
}

const InfoSection = ({ priceData, user, loading }) => {
  return (
    <div style={{ background: "#121634" }}>
      <div className="container-md ">
        <div className="row  align-items-stretch">
          <div className="col-12 col-md-6 h-100 py-5">
            <p className="text-white h3 fond-weight-bolder">
              <strong>SELLER</strong> INFO
            </p>
            <div className="white-underline"></div>
            <div
              className="d-flex row m-0 p-3 justify-content-between max-val-box"
              style={{ minHeight: 375 }}
            >
              <div className="col-12 align-items-center justify-content-center d-flex py-2">
                <div className="d-md-flex">
                  {(user?.profilePicture && (
                    <img
                      src={`${user.profilePicture.startsWith("profilePic")
                        ? CONFIG.s3BaseUrl
                        : CONFIG.base_url
                        }/${user?.profilePicture}`}
                      className="info-avatar-image"
                    ></img>
                  )) || (
                      <div
                        className="info-avatar-image"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      ></div>
                    )}
                </div>
                <div className="px-2 m-1">
                  <p className="text-white m-0 h4 font-weight-bold">
                    {user?.fullName}{" "}
                    <img align="middle" width="30px" src={VerifiedBadge}></img>
                  </p>
                  {user?.username && (
                    <p className="text-white m-0 font-weight-bold">
                      @{user.username}
                    </p>
                  )}
                  <div className="d-flex py-2">
                    <div className="social-media-wrapper">
                      <img src={Instagram} width="24px" height="24px" fill="#fff" />
                    </div>
                    <div className="social-media-wrapper">
                      <img src={Facebook} width="24px" height="24px" />
                    </div>
                    <div className="social-media-wrapper">
                      <img src={Youtube} width="24px" height="24px" />
                    </div>
                    <div className="social-media-wrapper">
                      <img src={Twitter} width="24px" height="24px" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 align-items-center">
                <p className="text-white text-center m-0 py-2">
                  ADDITIONAL CARD NOTES:
                </p>
                <p className="text-white text-center m-0">
                  Card seller is <span className="text-cyan">OPEN</span> to all
                  offers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 py-5">
            <p className="text-white h3 fond-weight-bolder">
              <strong>PRICING</strong> TREND
            </p>
            <div className="white-underline"></div>

            <div className="d-flex justify-content-between">
              <ChartSection loading={loading} priceData={priceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
