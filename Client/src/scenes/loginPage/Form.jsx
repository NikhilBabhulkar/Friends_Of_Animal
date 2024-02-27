import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Modal.css";
import axios from "axios";
import { AssistWalkerOutlined } from "@mui/icons-material";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register"; // Define isRegister here
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [valuesH, setValuesH] = useState({});
  const [onSubmitPropsH, setonSubmitPropsH] = useState();


  // otp verification
  const handleSendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:3001/auth/sendotp", {
        "email": valuesH.email,
        "name": `${valuesH.firstName} ${valuesH.lastName}`
      });
      if (res.status == 200) {
        toast.success("otp send successfully")
        setIsOTPVerified(false); // Reset verification status
      } else {
        toast.error("otp send was unsuccessfull");
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Server side Error");
    }

  };

  const handleVerifyOTP = async () => {
    // console.log(otp);
    try {
      const res = await axios.post(`${process.env.REACT_APP_LOCAL}/auth/otp-verification`, {
        "otp": otp
      });

      if (res.status == 200) {
        setIsOTPVerified(true);
        setShowModal(false);
        setOtp("")
        await register(valuesH, onSubmitPropsH);
      }

    } catch (error) {
      setOtp("");
      toast.error("otp verification falid");
      console.log(error);
    }

  };

  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", "profilepics/" + values.picture.name);

      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!savedUserResponse.ok) {
        throw new Error("Server Side error");
      } else {
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
          setPageType("login");
          toast.success("Registration successful! Please log in.");
        } else {
          throw new Error("Server Error");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again later.");
      onSubmitProps.resetForm();
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(
        `${process.env.REACT_APP_LOCAL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!loggedInResponse.ok) {
        if (loggedInResponse.status === 400) {
          throw new Error("Invalid credentials");
        } else {
          const errorData = await loggedInResponse.json();
          throw new Error(`Server error: ${errorData.message}`);
        }
      } else {
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
              role: loggedIn.user.role,
            })
          );
          Cookies.set("userData", JSON.stringify({
            userId: loggedIn.user._id,
            token: loggedIn.token,
          }));
          navigate("/home");
          toast.success("Login successful!"); // Display success message
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Failed to log in. Please check your credentials.");
      onSubmitProps.resetForm();
    }
  };


  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    else {
      setShowModal(true);
      setValuesH(values);
      setonSubmitPropsH(onSubmitProps);
    }
  };


  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* <TextField
                  label="Role"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={Boolean(touched.role) && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 4" }}
                /> */}
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0];
                        const newFileName = `${values.email}_${file.name}`; // Add email to the filename
                        setFieldValue("picture", newFileName); // Set the updated filename in form values
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>

                  </Box>
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>

      <div>
        {/* <button onClick={toggleModal}>Open Modal</button> */}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              {/* <button onClick={toggleModal} className="close-btn">
              Close
            </button> */}
              <h2>Verify OTP</h2>
              {!isOTPVerified ? (
                <>
                  <p>Please enter the OTP sent to your registerd email.</p>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button onClick={handleVerifyOTP}>Verify OTP</button>
                </>
              ) : (
                <p>OTP verified successfully!</p>
              )}
              <button onClick={handleSendOTP} className="send-otp-btn">Send OTP</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Form;
