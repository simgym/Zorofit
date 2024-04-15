import Skeleton from "react-loading-skeleton";
import "./Shimmer.css";

const Shimmer = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <div className="shimmer-wrapper" key={index}>
        <div className="top-row">
          <div className="top-left">
            <Skeleton count={2} />
          </div>
          <div className="top-right">
            <Skeleton style={{ marginBottom: "2rem", height: "4.2vh" }} />
          </div>
        </div>
        <div className="bottom-row">
          <div className="left-col">
            <Skeleton style={{ marginBottom: "0.6rem", height: "6.5vh" }} />
          </div>
          <div className="right-col">
            <Skeleton count={3} />
          </div>
        </div>
      </div>
    ));
};

export default Shimmer;
