import React from "react";
import { IoFitnessOutline } from "react-icons/io5";
import { RiVipCrownFill } from "react-icons/ri";
import { CgGym } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import "./MembershipPlans.css";

const MembershipPlans = () => {
  return (
    <div className="plans-wrapper">
      <div className="membership-heading">
        <p>
          START <strong>YOUR JOURNEY</strong>
        </p>
      </div>
      <div className="all-plans">
        <div className="basic-plan">
          <div className="basic-plan-logo">
            <IoFitnessOutline />
          </div>
          <div className="plan-details">
            <div>
              <p>BASIC PLAN</p>
            </div>
            <div>
              <h1>$ 10</h1>
            </div>
            <ul>
              <li>
                <BsCheck2Circle /> Trainer +
              </li>
              <li>
                <BsCheck2Circle /> Performance Tracker
              </li>
              <li style={{ color: "white" }}>
                <BsCheck2Circle /> Workout Planner
              </li>
              <li style={{ color: "white" }}>
                <BsCheck2Circle /> Zoro Buddy
              </li>
            </ul>
            <div className="plan-links">
              <Link>Join now</Link>
            </div>
          </div>
        </div>
        <div className="premium-plan">
          <div className="premium-plan-logo">
            <RiVipCrownFill />
          </div>
          <div className="plan-details">
            <div>
              <p>PREMIUM PLAN</p>
            </div>
            <div>
              <h1>$ 25</h1>
            </div>
            <ul>
              <li>
                <BsCheck2Circle /> Trainer +
              </li>
              <li>
                <BsCheck2Circle /> Performance Tracker
              </li>
              <li>
                <BsCheck2Circle /> Workout Planner
              </li>
              <li>
                <BsCheck2Circle /> Zoro Buddy
              </li>
            </ul>
            <div className="plan-links">
              <Link>Join now</Link>
            </div>
          </div>
        </div>
        <div className="pro-plan">
          <div className="pro-plan-logo">
            <CgGym />
          </div>
          <div className="plan-details">
            <div>
              <p>PRO PLAN</p>
            </div>
            <div>
              <h1>$ 15</h1>
            </div>
            <ul>
              <li>
                <BsCheck2Circle /> Trainer +
              </li>
              <li>
                <BsCheck2Circle /> Performance Tracker
              </li>
              <li>
                <BsCheck2Circle /> Workout Planner
              </li>
              <li style={{ color: "white" }}>
                <BsCheck2Circle /> Zoro Buddy
              </li>
            </ul>
            <div className="plan-links">
              <Link>Join now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
