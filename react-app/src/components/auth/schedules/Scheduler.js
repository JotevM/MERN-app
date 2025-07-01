import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import ClientApprovementModal from "./ClientApprovementModal";

export default function Scheduler({ date, user, setTime, setDate, setUser }) {
  console.log("USER", user, "DATE", date);
  const context = useContext(AuthContext);
  console.log("User", user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user, date]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3500/schedulesByDate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, date }),
      });
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setData([]);
    }
  };

  if (loading) return <Spinner color="success" />;
  if (error) return <div>Error: {error}</div>;

  let scheduler = [];
  if (data) {
    console.log("DATA", data);
    for (let i = 0; i < 8; i++) {
      scheduler[i] = null;
    }

    for (let j = 0; j < data.length; j++) {
      console.log(data[j]);
      scheduler[data[j].time - 10] = data[j];
    }

    console.log(scheduler);
  }

  const handleClick = (e) => {
    console.log("1", e, "DATE", date, "USER", user, "CLIENT");
    let time = "1" + e;
    setTime(time);
    setDate(date);
    setUser(user);
  };

  const getStyle = (date) => {
    if (new Date(date).getDay() === 0 || new Date(date).getDay() === 6) {
      return {
        width: "75px",
        height: "25px",
        borderRadius: "15px",
        backgroundColor: "#FFA500",
        opacity: "0.7",
      };
    } else {
      return {
        width: "75px",
        height: "25px",
        borderRadius: "15px",
        backgroundColor: "red",
      };
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div
          className="bg-warning text-center text-white py-4 border border-light"
          style={{ 
          width: "75px",
          height: "25px",
        }}
        >
          {" "}
          {new Date(date).toLocaleDateString()}{" "}
        </div>
        {scheduler &&
          scheduler.map((schedule, i) => {
            return schedule === null &&
              new Date(date).getDay() !== 0 &&
              new Date(date).getDay() !== 6 ? (
              <React.Fragment>
                {context.role === "client" ? (
                  <ClientApprovementModal
                    onClick={() => handleClick(i)}
                    key={i}
                    i={i}
                    date={date}
                    user={user}
                  />
                ) : (
                  <div
                    key={i}
                    className="bg-success text-center text-white py-4 border border-light"
                    style={{
                      width: "75px",
                      height: "25px",
                      borderRadius: "15px",
                    }}
                  >
                    {10 + i}:00
                  </div>
                )}
              </React.Fragment>
            ) : (
              <div
                key={i}
                className=" text-center text-white py-4 border border-light"
                style={getStyle(date)}
              >
                {" "}
                {new Date(date).getDay() === 0 || new Date(date).getDay() === 6
                  ? ""
                  : 10 + i + ":00"}{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
}
