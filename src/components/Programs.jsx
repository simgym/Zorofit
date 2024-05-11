import { GiBiceps } from "react-icons/gi";
import { GiJumpingRope } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exerciseAction } from "../store/ExerciseStore";
import "./Programs.css";

const Programs = () => {
  const dispatch = useDispatch();

  const programData = [
    {
      Icon: GiBiceps,
      title: "Strength Training",
      description:
        "In this program, you are trained to improve your strength through many exercises.",
      url: "strength",
    },
    {
      Icon: GiJumpingRope,
      title: "Cardio Training",
      description:
        "In this program, you are trained to do sequential moves in range of 20 until 30 minutes",
      url: "cardio",
    },
    {
      Icon: GrYoga,
      title: "Yoga Training",
      description:
        "This program is designed for those who exercises only for their body fitness not body building",
      url: "stretching",
    },
    {
      Icon: GiWeightLiftingUp,
      title: "Power Lifting",
      description:
        "This program is designed for those who want to exercise for competing in strength",
      url: "powerlifting",
    },
  ];

  return (
    <>
      <div className="program-wrapper">
        <h2 className="program-heading">
          EXPLORE OUR <strong className="program-part-heading">PROGRAMS</strong>{" "}
          TO SHAPE YOU
        </h2>

        <div className="programs">
          {programData.map((program, index) => (
            <div className="program-clicks" key={index}>
              <div className="program-logo">
                <program.Icon />
              </div>
              <div>
                <h2>{program.title}</h2>
              </div>
              <div>
                <p>{program.description}</p>
              </div>
              <div
                className="program-link"
                onClick={() =>
                  dispatch(exerciseAction.exerciseType(program.url))
                }
              >
                <Link to={`/exercise/${program.url}`}>View {`->`}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Programs;
