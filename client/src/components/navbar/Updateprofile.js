import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Updateprofile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [UserData, setUserData] = useState([]);

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

  const hendleInput = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUserData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("x-access-token");
    let url = `http://localhost:4000/profile/edit/${id}`;
    axios
      .put(url, UserData, { headers: { "x-access-token": token } })
      .then(function (res) {
        if (res.data.success) {
          alert(res.data.message);
          navigate("/profile");
        }
      });
  };

  return (
    <>
      <Card style={{ width: "30rem", height: "25rem", margin: "5rem" }}>
        <Form onSubmit={handlesubmit}>
          <Card.Body>
            <Card.Title className="mb-4">User Datails</Card.Title>
            <Card.Text>
              <Form.Label> Name </Form.Label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="form-control"
                value={UserData.name}
                onChange={hendleInput}
              />
            </Card.Text>
            <Card.Text>
              <Form.Label> Number </Form.Label>
              <input
                type="number"
                id="number"
                placeholder="Number"
                className="form-control"
                name="number"
                value={UserData.number}
                onChange={hendleInput}
              />
            </Card.Text>
            <Card.Text>
              <Form.Label> Email </Form.Label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-control"
                name="email"
                value={UserData.email}
                onChange={hendleInput}
              />
            </Card.Text>

            <Card.Text>
              {/* <Form.Label> Email </Form.Label> */}
              <input
                type="hidden"
                id="password"
                placeholder="Password"
                className="form-control"
                name="password"
                value={UserData.password}
                onChange={hendleInput}
              />
            </Card.Text>
            <Button variant="primary" type="submit" className="mx-2">
              Update
            </Button>
          </Card.Body>
        </Form>
      </Card>
    </>
  );
}
