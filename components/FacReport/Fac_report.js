import * as React from "react"
import loadable from "@loadable/component"

import FacBanner from "./FacBanner"
import GradientLine from "./GradientLine/index"
import InfoSection from "./InfoSection"
import QualityAssessment from "./QualityAssessment/index"
import useFetch from "use-http"
import { CONFIG } from "./Config"

// const FacBanner = loadable(() => import("./FacBanner"))

const FacReport = ({ id }) => {
  const [reportData, setData] = React.useState({})
  const currentPage = React.useRef()
  const url = typeof window !== "undefined" ? window.location.href : ""

  const reportDataRef = React.useRef()

  const { get: getReport, loading } = useFetch(
    CONFIG.base_url + "/sports-card/card-fac",
    {
      cachePolicy: "no-cache",
    }
  )

  const { post: createJob, error: errorCreateJob } = useFetch(
    CONFIG.base_url + "/api/v1/public/job/create",
    { cachePolicy: "no-cache" }
  )

  const {
    post: fetchPricing,
    loading: loadingPricingData,
    error: errorPricingData,
  } = useFetch(CONFIG.base_url + "/api/v1/public/cards/get-price-analytics", {
    cachePolicy: "no-cache",
  })

  const {
    post: fetchGrading,
    loading: loadingGradingData,
    error: errorGradingData,
  } = useFetch(CONFIG.base_url + "/api/v1/public/cards/get-grade-analytics", {
    cachePolicy: "no-cache",
  })

  const {
    post: getJobStatus,
    loading: loadingJobStatus,
    error: errorGetJobStatus,
  } = useFetch(CONFIG.base_url + "/api/v1/public/job/status", {
    cachePolicy: "no-cache",
  })

  const initGradeAndPricingFetch = async jobId => {
    const { priceFetchComplete, gradingFetchComplete } = reportDataRef.current

    const
      status
        = await getJobStatus({ jobId })
    console.log(status, "status")
    //  statusPriceDataFetch, statusGradingDataFetch 
    if (!gradingFetchComplete) {
      let { data: gradeData = [] } = await fetchGrading("", {
        jobId,
      })

      reportDataRef.current = { ...reportDataRef.current, gradeData }
    }

    if (!priceFetchComplete) {
      let { data: priceData } = await fetchPricing("", {
        jobId,
        period: "monthly",
      })
      reportDataRef.current = { ...reportDataRef.current, priceData }
    }

    reportDataRef.current = {
      ...reportDataRef.current,
      statusGradingDataFetch: status?.statusGradingDataFetch,
      sstatusPriceDataFetch: status?.statusPriceDataFetch,
    }

    setData({
      ...reportDataRef.current,
    })

    if (!status?.statusPriceDataFetch || !status?.statusGradingDataFetch) {
      setTimeout(() => {
        initGradeAndPricingFetch(jobId)
      }, 10 * 1000)
    }
  }

  const initFetch = async () => {
    let response = await getReport(`/${id}`)
    console.log(response?.data)

    setData({ ...response?.data })
    reportDataRef.current = { ...response?.data }

    let
      {
        year,
        brand,
        cardNumber,
        playerNames,
        modelNo,
        serialNo,
        cardType,

      } = response?.data?.card || {}

    let
      responseId
        = await createJob({
          year,
          brand,
          cardNumber,
          playerNames,
          modelNo,
          serialNo,
          cardType,
        })
    console.log(responseId, "id")

    initGradeAndPricingFetch(responseId?._id)
  }

  React.useEffect(() => {
    initFetch()
  }, [])
  console.log(reportData)
  return (
    <div ref={currentPage}>
      <FacBanner
        currentPageRef={currentPage}
        card={reportData?.card}
        gradeData={reportData?.gradeData}
        loading={loadingGradingData || loading || loadingJobStatus}
        cardId={id}
        price={reportData?.price}
        quantity={reportData.quantity}
      />
      <GradientLine />
      <QualityAssessment card={reportData?.card} />
      <InfoSection
        user={reportData?.user}
        priceData={reportData?.priceData}
        loading={
          loading ||
          ((loadingJobStatus || loadingPricingData) && !reportData?.priceData)
        }
      />
    </div>
  )
}

export default FacReport
