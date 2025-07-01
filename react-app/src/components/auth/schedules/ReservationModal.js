import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Spinner,
} from "reactstrap";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import Reservation from "./Reservation";

export default function ReservationModal() {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  });

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggle = () => setModal(!modal);

  const fetchSchedules = (user = localStorage.getItem("id")) => {
    fetch(`http://localhost:3500/schedules?user=${user}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching schedules");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  if (loading) {
    return <Spinner color="success" />;
  }

  return (
    <div>
      <NavLink onClick={toggle} style={{ cursor: "pointer" }}>
        Reservation
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p className="text-center text-danger display-4">Reservation</p>
        </ModalHeader>
        <ModalBody>
          {error && <div>Error: {error.message}</div>}
          <Reservation />
        </ModalBody>
      </Modal>
    </div>
  );
}
