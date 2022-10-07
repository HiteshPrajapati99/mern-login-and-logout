import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Heder() {
  const navigate = useNavigate();
  useEffect(() => {
    loginverfy();
  }, []);

  const loginverfy = () => {
    if (!localStorage.getItem("x-access-token")) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile">
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            onClick={() => {
              localStorage.removeItem("x-access-token");
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        </Container>
      </Navbar>
    </>
  );
}
