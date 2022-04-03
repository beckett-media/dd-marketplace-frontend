import * as React from "react"
// import HeroBg from "../../../images/svgs/HeroBg.svg"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css" // This only needs to be imported once in your app


const QualityAssessmentCard = ({ title, child, grade }) => {
  return (
    <div className="max-val-box h-100 d-flex justify-content-between flex-column">
      <p className="text-white h5 font-weight-bold text-center">{title}</p>
      {child}
      <p className="text-white h5 text-center m-0">
        {title} Snapscore {<span>&trade;</span>} {grade}
      </p>
    </div>
  )
}

const QualityAssessment = ({ card }) => {
  const cornersDeatils = card?.grading?.corners
  let newCornerGrades
  if (card?.grading?.corners) {
    newCornerGrades = {
      top_left: cornersDeatils?.top_left,
      top_right: cornersDeatils?.top_right,
      bottom_left: cornersDeatils?.bottom_left,
      bottom_right: cornersDeatils?.bottom_right,
    }
  }

  const cornerText = {
    top_left: "Top Left Corner #1",
    top_right: "Top Right Corner #2",
    bottom_left: "Bottom Left Corner #3",
    bottom_right: "Bottom Right Corner #4",
  }

  const [isVisibleSurfaceMap, showSurfaceMap] = React.useState(false)

  const fetchBackgroundColor = _overallGrade => {
    return "#0E1024"
  }

  const fetchtextClass = _grade => {
    return "text-cyan"
  }

  const fetchtextClassGreen = _grade => {
    return "green"
  }

  let overall = card?.grading?.overallGrade

  return (
    <div
      style={{
        background: fetchBackgroundColor(overall),
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="container-md py-5"
        style={{ position: "relative", zIndex: 5 }}
      >
        <p className="text-white h2 fond-weight-bolder font-poppins">
          <strong>CARD</strong> QUALITY ASSESSMENT
        </p>
        <div className="white-underline"></div>
        <div className="d-flex row justify-content-between align-items-stretch">
          <div className="col-12 col-md-6 col-xl-3 my-2">
            <QualityAssessmentCard
              title="Corners"
              grade={
                <span
                  className={`${fetchtextClassGreen(overall)} font-weight-bold`}
                >
                  {card?.grading?.corners?.["corner_grade"] || "NA"}
                </span>
              }
              child={
                <div className="row ">
                  {Object.keys(newCornerGrades || {}).map(key => (
                    <div className="col-6 py-2">
                      <p className="text-white  font-poppins">
                        {cornerText[key]}
                      </p>
                      <p
                        className={`${fetchtextClass(
                          overall
                        )} m-1 font-poppins`}
                      >
                        {newCornerGrades[key]}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
              }
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3 my-2">
            <QualityAssessmentCard
              title="Centering"
              grade={
                <span
                  className={`${fetchtextClass(
                    overall
                  )} font-weight-bold font-poppins`}
                >
                  {card?.grading?.centering?.["letter_grade"].length < 4
                    ? card?.grading?.centering?.["letter_grade"]
                    : "NA"}
                </span>
              }
              child={
                <div className="text-center text-white px-2 py-5 font-poppins">
                  {card?.grading?.centering?.["left/right"] && (
                    <p className="text-white">
                      <strong>Left / Right</strong>{" "}
                      {card?.grading?.centering?.["left/right"]}
                    </p>
                  )}
                  {card?.grading?.centering?.["top/bottom"] && (
                    <p className="text-white">
                      <strong>Top / Bottom</strong>{" "}
                      {card?.grading?.centering?.["top/bottom"]}
                    </p>
                  )}
                  {card?.grading?.centering?.["letter_grade"] && (
                    <div
                      style={{
                        marginTop: 15,
                        borderRadius: 30,
                        paddingTop: 5,
                      }}
                    >
                      <h6 className="text-cyan">
                        <strong>
                          {card?.grading?.centering?.["letter_grade"]}
                        </strong>
                      </h6>
                    </div>
                  )}
                </div>
              }
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3 my-2">
            <QualityAssessmentCard
              title="Surface"
              grade={
                <span
                  className={`${fetchtextClassGreen(
                    overall
                  )} font-weight-bold font-poppins`}
                >
                  {card?.grading?.surface?.["surface_grade"] || "NA"}
                </span>
              }
              child={
                <div className="text-center text-white px-2 py-5 font-poppins">
                  Click{" "}
                  <a
                    href="#"
                    className={`${fetchtextClass(overall)}`}
                    onClick={() => showSurfaceMap(true)}
                  >
                    here
                  </a>{" "}
                  to see a surface defect map of the card.
                </div>
              }
            />
            {isVisibleSurfaceMap && (
              <Lightbox
                onCloseRequest={() => showSurfaceMap(false)}
                mainSrc={card?.grading?.surface?.surface_defect_img}
              />
            )}
          </div>
          <div className="col-12 col-md-6 col-xl-3 my-2">
            <QualityAssessmentCard
              title="Edges"
              grade={
                <span
                  className={`${fetchtextClassGreen(
                    overall
                  )} font-weight-bold font-poppins`}
                >
                  {card?.grading?.edges?.["edge_grade"] || "NA"}
                </span>
              }
              child={
                <div className="row">
                  <div className="col-6 py-2">
                    <p className="text-white  m-1 font-poppins">Left Edge</p>
                    <p
                      className={`${fetchtextClass(
                        overall
                      )}   m-1 font-poppins`}
                    >
                      {card?.grading?.edges?.left || "NA"}
                    </p>
                  </div>
                  <div className="col-6 py-2">
                    <p className="text-white  m-1 font-poppins">Right Edge</p>
                    <p
                      className={`${fetchtextClass(
                        overall
                      )}   m-1 font-poppins`}
                    >
                      {card?.grading?.edges?.right || "NA"}
                    </p>
                  </div>
                  <div className="col-6 py-2">
                    <p className="text-white  m-1 font-poppins">Top Edge</p>
                    <p
                      className={`${fetchtextClass(overall)}  m-1 font-poppins`}
                    >
                      {card?.grading?.edges?.top || "NA"}
                    </p>
                  </div>
                  <div className="col-6 py-2">
                    <p className="text-white  m-1 font-poppins">Bottom Edge</p>
                    <p
                      className={`${fetchtextClass(
                        overall
                      )}   m-1 font-poppins`}
                    >
                      {card?.grading?.edges?.bottom || "NA"}
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
        <p className="text-white py-3 h2 font-weight-bold font-poppins">
          OVERALL SNAPSCORE{" "}
          <span className={`${fetchtextClassGreen(overall)} font-weight-bold`}>
            {overall || "NA"}
          </span>
        </p>
      </div>
      {/* <HeroBg className="qa-bcg-left" />
      <HeroBg className="qa-bcg-right" /> */}
    </div>
  )
}

export default QualityAssessment
