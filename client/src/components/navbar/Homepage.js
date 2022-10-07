import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <h1 style={{ fontWeight: "600", textAlign: "center" }}>
        Hello this is a home page <br /> login success
      </h1>

      <Button
        onClick={() => {
          localStorage.removeItem("x-access-token");
          navigate("/login");
        }}
      >
        Log Out
      </Button>
    </>
  );
}
