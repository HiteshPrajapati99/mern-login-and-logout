import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PtofilePage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    let url = "http://localhost:4000/profile";
    const token = localStorage.getItem("x-access-token");

    axios.get(url, { headers: { "x-access-token": token } }).then((res) => {
      setUserData(res.data.message);
    });
  };

  return (
    <>
      <Card style={{ width: "30rem", height: "15rem", margin: "10rem" }}>
        <Card.Body>
          <Card.Title className="mb-4">User Datails</Card.Title>
          <Card.Text>Name : {userData.name} </Card.Text>
          <Card.Text>Number : {userData.number} </Card.Text>
          <Card.Text>Email : {userData.email} </Card.Text>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => navigate(`/profile/edit/${userData._id}`)}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
