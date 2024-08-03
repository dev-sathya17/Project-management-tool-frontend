import "./RegisterPage.css";
import Logo from "../../components/logo/Logo";
import { useFormik } from "formik";
import userService from "../../services/userService";
import { Link } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First name is Required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (values.password.length > 20) {
    errors.password = "Password must be within 20 characters";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/i.test(values.password)
  ) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile is Required";
  } else if (values.mobile.length !== 10) {
    errors.mobile = "Invalid mobile number";
  }
  if (!values.salaryPerMonth) {
    errors.salaryPerMonth = "Salary is Required";
  } else if (isNaN(values.salaryPerMonth) || values.salaryPerMonth <= 0) {
    errors.salaryPerMonth = "Invalid salary";
  }
  if (!values.role) {
    errors.role = "Role is Required";
  }

  return errors;
};

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      salaryPerMonth: "",
      mobile: "",
      role: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      userService
        .registerUser(values)
        .then((response) => {
          if (response.status === 201) {
            alert(response.data.message);
            formik.resetForm();
          }
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data.message);
        });
      setSubmitting(false);
    },
  });

  return (
    <div className="reg-container">
      <div className="reg-header">
        <header className="header">
          <Logo />
        </header>
      </div>
      <div className="wrapper">
        <div className="form-container">
          <h2 className="form-title">
            Create an <span className="highlight-title highlight">Account</span>
          </h2>
          <p className="form-description align-center">
            Register now, and increase your{" "}
            <span className="highlight">productivity.</span>
          </p>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="input-container">
                <label htmlFor="firstName">First Name: </label>
                <input
                  className="input"
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  required
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <span className="error">{formik.errors.firstName}</span>
                ) : null}
              </div>

              <div className="input-container">
                <label htmlFor="lastName">Last Name: </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  required
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error">{formik.errors.lastName}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="input-container password-container">
                <label htmlFor="password">Password:</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  maxLength={20}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="input-container">
                <label htmlFor="mobile">Mobile:</label>
                <input
                  className="input"
                  type="tel"
                  placeholder="Mobile"
                  id="mobile"
                  name="mobile"
                  required
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="error">{formik.errors.mobile}</div>
                ) : null}
              </div>
              <div className="input-container">
                <label htmlFor="salary">Salary:</label>
                <input
                  className="input"
                  type="number"
                  placeholder="Enter salary"
                  id="salary"
                  name="salaryPerMonth"
                  required
                  value={formik.values.salaryPerMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.salaryPerMonth &&
                formik.errors.salaryPerMonth ? (
                  <div className="error">{formik.errors.salaryPerMonth}</div>
                ) : null}
              </div>
            </div>
            <div className="radio-wrapper">
              <div className="radio-container">
                <label htmlFor="tl">Team Leader</label>
                <input
                  type="radio"
                  value="teamLeader"
                  id="tl"
                  name="role"
                  required
                  checked={formik.values.role === "teamLeader"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="radio-container">
                <label htmlFor="emp">Employee</label>
                <input
                  type="radio"
                  value="employee"
                  id="emp"
                  name="role"
                  required
                  checked={formik.values.role === "employee"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            {formik.touched.role && formik.errors.role ? (
              <div className="error">{formik.errors.role}</div>
            ) : null}
            <button type="submit" className="submit-button">
              REGISTER
            </button>
            <p className="align-center login-nav">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
