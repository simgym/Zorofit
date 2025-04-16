import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function BasicTimeline({ gymExperience }) {
  return (
    <Timeline
      sx={{
        color: "pink",
        border: "1px solid blue",
        padding: 0,
        position: "relative",
      }}
    >
      {gymExperience.map((item, index) => (
        <TimelineItem
          key={index}
          sx={{
            position: "relative",
            // paddingLeft: "40px",
            // marginBottom: "20px",
          }}
        >
          <TimelineSeparator
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              // transform: "translateX(-50%)",
            }}
          >
            <TimelineDot />
            {index !== gymExperience.length - 1 && (
              <TimelineConnector
                sx={{
                  position: "absolute",
                  top: "50%",

                  // transform: "translateX(-50%)",
                  // borderLeft: "1px solid red",
                  height: "100%",
                }}
              />
            )}
          </TimelineSeparator>
          <TimelineContent sx={{ border: "1px solid yellow" }}>
            eat
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
