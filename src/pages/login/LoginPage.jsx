import { useFormik } from "formik";
import "./LoginPage.css";
import { useState } from "react";
import userService from "../../services/userService";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import { useUser } from "../../contexts/UserContext";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  return errors;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: () => {
      userService
        .login(formik.values)
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            alert(response.data.message);
            formik.resetForm();
            if (response.data.user.role === "employee") {
              navigate("/employee/dashboard");
            } else if (response.data.user.role === "teamLeader") {
              navigate("/dashboard");
            } else if (response.data.user.role === "admin") {
              navigate("/admin/dashboard");
            }
            // navigate("/dashboard");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <header className="header">
        <Logo />
      </header>
      <div className="login-wrapper">
        <form className="login-form-container" onSubmit={formik.handleSubmit}>
          <div className="title-container">
            <h2 className="title">
              Welcome <span className="highlight-header">back!</span>
            </h2>
            <div className="login-description">
              <p className="login-description-text">
                Sign In, to resume your tasks and meet your{" "}
                <span className="highlight">deadline.</span>
              </p>
            </div>
          </div>

          <div className="input-container-login">
            <MdEmail className="login-icon" />
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email:"
              className="input email-input"
            />
          </div>
          {formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : (
            <></>
          )}
          <div className="input-container-login">
            <FaLock className="login-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password:"
              className="input"
            />
            {showPassword ? (
              <IoMdEye className="login-eye-icon" onClick={togglePassword} />
            ) : (
              <IoMdEyeOff className="login-eye-icon" onClick={togglePassword} />
            )}
          </div>
          {formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : (
            <></>
          )}
          <div className="button-container">
            <button className="submit-button" type="submit">
              SIGN IN
            </button>
            <p>
              Forgot Password?{" "}
              <span className="link">
                <Link to="/forgot">Click Here</Link>
              </span>
            </p>
            <p>
              Do not have an Account?{" "}
              <span className="link">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
