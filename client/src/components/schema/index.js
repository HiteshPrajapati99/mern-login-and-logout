import * as Yup from "yup";

export const formSchema = Yup.object({
  name: Yup.string().min(3).max(20).required("place Enter Your Name"),
  number: Yup.string().min(10).max(12).required("place Enter Your Number"),
  email: Yup.string().email().required("place Enter Your Email"),
  password: Yup.string()
    .min(8)
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required(" place Enter Your Password"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwod Not Match")
    .required("place Enter Your Password"),
});
