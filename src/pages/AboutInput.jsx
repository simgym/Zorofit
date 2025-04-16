import React, { useState } from "react";
import "./AboutInput.css";

const AboutInput = ({ toggleModal }) => {
  const [favMuscles, setFavMuscles] = useState([""]);
  const [gymPlaylists, setGymPlaylists] = useState([""]);
  const [gymExperiences, setGymExperiences] = useState([
    { gymName: "", gymCity: "", gymCountry: "", workoutMethod: "" },
  ]);
  const [bio, setBio] = useState("");
  const [gymCrush, setGymCrush] = useState("");
  //   const [gymMethod, setGymMethod] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");

  const workoutList = [
    "Powerlifting",
    "Weightlifting",
    "Bodybuilding",
    "Yoga",
    "Pilates",
    "CrossFit",
    "Calisthenics",
    "Aerobics",
    "Zumba",
  ];

  const handleAddInput = (setter, defaultValue) => {
    setter([...defaultValue, ""]);
  };

  const handleAddExperience = () => {
    setGymExperiences([
      ...gymExperiences,
      { gymName: "", gymCity: "", gymCountry: "", workoutMethod: "" },
    ]);
  };

  const handleChange = (setter, value, index, event) => {
    const newValues = [...value];
    newValues[index] = event.target.value;
    setter(newValues);
  };

  const handleExperienceChange = (index, key, event) => {
    const newExperiences = [...gymExperiences];
    newExperiences[index][key] = event.target.value;
    setGymExperiences(newExperiences);
  };

  // store gymcrush img in storage
  // store gymexperience in its collection
  // store gym songs in gym playlist collection
  // update rest of it from firstore see path for it in signup comp
  // add logic to change DP as well

  const submitHandler = () => {};

  return (
    <div className="aboutInputWrapper">
      <form onSubmit={submitHandler}>
        <div className="inputFavMuscles">
          <div className="favMusclesLabelAddWrapper">
            <label>Favorite Muscles</label>
            <button
              type="button"
              onClick={() => handleAddInput(setFavMuscles, favMuscles)}
            >
              +
            </button>
          </div>
          <div className="favMusclesInputWrapper">
            {" "}
            {favMuscles.map((muscle, index) => (
              <input
                key={index}
                placeholder="Add your favourite muscle"
                type="text"
                value={muscle}
                onChange={(e) =>
                  handleChange(setFavMuscles, favMuscles, index, e)
                }
              />
            ))}
          </div>
        </div>

        <div className="inputGymPlaylist">
          <div className="playlistLablAddWrapper">
            <label>Gym Playlist</label>
            <button
              type="button"
              onClick={() => handleAddInput(setGymPlaylists, gymPlaylists)}
            >
              +
            </button>
          </div>
          <div className="playlistInputWrapper">
            {gymPlaylists.map((playlist, index) => (
              <input
                key={index}
                placeholder="Add song to your playlist"
                type="text"
                value={playlist}
                onChange={(e) =>
                  handleChange(setGymPlaylists, gymPlaylists, index, e)
                }
              />
            ))}
          </div>
        </div>

        <div className="inputGymExperience">
          <div className="gymExppLabelAddWrapper">
            <label>Gym Experience</label>
            <button type="button" onClick={handleAddExperience}>
              +
            </button>
          </div>
          <div className="gymExpFieldsWrapper">
            {gymExperiences.map((experience, index) => (
              <div key={index} className="gymExpInputWrapper">
                <input
                  type="text"
                  placeholder="Gym Name"
                  value={experience.gymName}
                  onChange={(e) => handleExperienceChange(index, "gymName", e)}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={experience.gymCity}
                  onChange={(e) => handleExperienceChange(index, "gymCity", e)}
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={experience.gymCountry}
                  onChange={(e) =>
                    handleExperienceChange(index, "gymCountry", e)
                  }
                />
                <input
                  type="date"
                  value={experience.workoutMethod}
                  onChange={(e) =>
                    handleExperienceChange(index, "workoutMethod", e)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="inputBio">
          <div className="bioLabelWrapper">
            <label>Bio</label>
          </div>
          <div className="bioTextWrapper">
            <input
              placeholder="Add a bio to your profile"
              value={bio}
              type="text"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className="inputGymCrush">
          <div className="gymCrushLabelWrapper">
            <label>Who's your gym crush?</label>
          </div>
          <div className="gymCrushInputWrapper">
            <input
              placeholder="Add name of your gym crush"
              value={gymCrush}
              type="text"
              onChange={(e) => setGymCrush(e.target.value)}
            />
          </div>

          {/* <div className="gymCrushImageWrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="avatar-input"
              style={{ border: "none" }}
            /> */}
          {/* <div className="">
              <img src={photoUrl} alt="Avatar" className="avatar" />  // use code from Signup.jsx
            </div> */}
          {/* </div> */}
        </div>
        <div className="inputGymMethod">
          <div className="inputGymMethodLabelWrapper">
            <label>Current workout method</label>
          </div>
          <div className="gymMethodSelectWrapper">
            <select>
              <option value="">Select Workout</option>
              {workoutList.map((workout, index) => (
                <option key={index}>{workout}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="inputWeightHeight">
          <div className="inputWeight">
            <div className="labelWeightWrapper">
              <label>Weight(in kg)</label>
            </div>
            <div className="inputWeightWrapper">
              <input
                placeholder="Add your Weight"
                type="text"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="inputHeight">
            <div className="labelHeightWrapper">
              <label>Height(in cm)</label>
            </div>
            <div className="inputHeightWrapper">
              <input
                placeholder="Add your Height"
                type="text"
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="aboutInputButtonWrapper">
          <button type="submit">Done</button>
          <button type="button" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutInput;
