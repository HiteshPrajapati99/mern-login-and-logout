import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { formSchema } from "./schema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registerpage() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    number: "",
    email: "",
    password: "",
    c_password: "",
  };
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: formSchema,
      onSubmit: (values, actions) => {
        console.log(values);
        let url = "http://localhost:4000/register";
        axios.post(url, values).then(function (res) {
          if (res.data.success) {
            alert(res.data.message);
            navigate("/login");
          } else {
            alert(res.data.message);
          }
        });

        actions.resetForm();
      },
    });

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const [show, setShow] = useState(false);

  const showpassword = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row" style={{ marginTop: "10rem" }}>
          <div className="col-md-5">
            <h2 className="text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>

                <input
                  type="name"
                  placeholder="Enter Your Name"
                  className="form-control"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "6px",
                    }}
                  >
                    {errors.name && touched.name ? errors.name : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mt-3">Number</Form.Label>
                <input
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  type="Number"
                  placeholder="Enter Your Number"
                  className="form-control"
                  name="number"
                  id="number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "6px",
                    }}
                  >
                    {errors.number && touched.number ? errors.number : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mt-3">Email </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your  Email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "6px",
                    }}
                  >
                    {errors.email && touched.email ? errors.email : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="mt-3">Password</Form.Label>

                <input
                  className="form-control"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Form.Group className="mt-1" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Click Here to view Password"
                    onClick={showpassword}
                  />
                  {
                    <p
                      style={{
                        color: "red",
                        position: "absolute",
                      }}
                    >
                      {errors.password && touched.password
                        ? errors.password
                        : null}
                    </p>
                  }
                </Form.Group>
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label className="mt-3"> Confirm Password</Form.Label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm Your Password"
                  name="c_password"
                  id="c_password"
                  value={values.c_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "6px",
                    }}
                  >
                    {errors.c_password && touched.c_password
                      ? errors.c_password
                      : null}
                  </p>
                }
              </Form.Group>

              <Button
                className="mt-4"
                size="lg"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="primary"
                className="mx-3"
              >
                Login Page
              </Button>
            </Form>
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src="./assets/rocket.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
