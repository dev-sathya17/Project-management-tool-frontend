import { useState } from "react";
import "./ForgotPassword.css";
import { MdOutlineMail } from "react-icons/md";
import userService from "../../services/userService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);

    userService
      .forgotPassword(email)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setEmail("");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setError("Email is required");
    } else {
      setError("");
    }
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-form-container">
        <h2 className="form-title">Oh snap &#128543;, Forgot Your Password?</h2>
        <p>No worries! Let&lsquo;s reset them for you.</p>
        <div className="fp-input-container">
          <MdOutlineMail className="fp-icon" />
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="abcd@email.com:"
            id="email"
            className={error ? "fp-input-error" : "fp-input"}
          />
        </div>
        {error ? (
          <div className="fp-error">
            <p className="fp-error-message">{error}</p>
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={handleSubmit}
          className={error || loading ? "fp-button-error" : "fp-signup-button"}
          disabled={error || loading ? true : false}
        >
          {loading ? "Loading..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
