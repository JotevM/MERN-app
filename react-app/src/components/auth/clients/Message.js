import React from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Message() {
  return (
    <ToastContainer duration={2000}>
      <h4> Successfully saved client</h4>
    </ToastContainer>
  );
}
