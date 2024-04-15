import React from "react";
import progress from "../assets/progress.jpg";
import zoroBuddy from "../assets/zorobuddy.jpg";
import trainerplus from "../assets/trainerplus.jpg";
import "./Services.css";

const Services = () => {
  const serviceArray = [
    {
      title: "Performance Tracker",
      description:
        "Performance Tracker lets you monitor your exercise and diet regularity. It also includes a Transformation Diary for daily photos to visually track your progress. Stay accountable and see your transformation!",
      image: progress,
    },
    {
      title: "Trainer+",
      description:
        "Trainer+ is your personal fitness companion, bridging the gap between you and your gym trainer. No matter which gym you visit, connect with your trainer on our platform. Receive daily updates on your workout and diet plans, tailored to your needs. Stay on track with Trainer+, your partner in fitness!",
      image: trainerplus,
    },
    {
      title: "Zoro Buddy",
      description:
        "Zoro Buddy is your social fitness partner. Find gym buddies, view profiles, send friend requests, and motivate each other. Share your performance and workout plans. With Zoro Buddy, fitness becomes a shared journey",
      image: zoroBuddy,
    },
  ];
  return (
    <div className="service-wrapper">
      <div className="services-heading">
        <p>
          OUR <strong>SERVICES</strong>
        </p>
      </div>
      <div className="service-content">
        {serviceArray.map((service, index) => (
          <li key={index} className={`service-layout-${index}`}>
            <span className="service-img">
              <img src={service.image} />
            </span>
            <span>
              <div className="service-title">
                <p>{service.title}</p>
              </div>
              <div className="service-description">
                <p>{service.description}</p>
              </div>
            </span>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Services;
