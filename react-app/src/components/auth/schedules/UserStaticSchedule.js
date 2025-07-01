import React from "react";
import Scheduler from "./Scheduler";
export default function UserStaticSchedule() {
  const getDates = () => {
    let dates = [];
    for (let i = 0; i < 30; i++) {
      let d = new Date();
      let x = d.setDate(d.getDate() + i);
      dates[i] = new Date(x).toISOString();
    }
    return dates;
  };
  return (
    <div>
      <div style={{ height: "500px", overflow: "scroll" }}>
        {getDates().map((date, i) => {
          if (localStorage.getItem("id") === "") return null;
          return (
            <Scheduler
              user={localStorage.getItem("id")}
              date={date}
              key={i}
              i={i}
            />
          );
        })}
      </div>
    </div>
  );
}
