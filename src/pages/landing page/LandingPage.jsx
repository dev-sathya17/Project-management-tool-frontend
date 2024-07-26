import "./LandingPage.css";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdAccessAlarm } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import { features } from "../../data/features";
import FeatureCard from "../../components/featureCard/FeatureCard";
import Logo from "../../components/logo/Logo";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(page);
  };

  return (
    <div className="container">
      <header className="header">
        <Logo />
      </header>
      <main className="main-content">
        <section className="description">
          <p className="description-text box">
            <span className="brand-emphasis">Pro</span>-Manager, here to
            increase your <em>Professional productivity</em> and help you{" "}
            <em>Meet your Deadlines</em>.
          </p>
          <ul className="merits box">
            <li>
              <MdAccessAlarm className="icon" />
              <span className="merit">Never miss out on a deadline.</span>
            </li>
            <li>
              <FaTasks className="icon" />
              <span className="merit">
                Keep track of all your tasks on a daily basis.
              </span>
            </li>
            <li>
              <FaChartPie className="icon" />
              <span className="merit">Visualize your progress.</span>
            </li>
            <li>
              <IoCheckmarkDoneOutline className="icon" />
              <span className="merit">
                Meet your professional goals faster.
              </span>
            </li>
          </ul>
          <div className="footer box">
            <div className="button-group">
              <div className="button-container">
                <h3 className="nav-text">Join Us Today!</h3>
                <button
                  className="button"
                  onClick={() => handleClick("/register")}
                >
                  Sign Up
                </button>
              </div>
              <div className="button-container">
                <h3 className="nav-text">Already a member?</h3>
                <button
                  className="button"
                  onClick={() => handleClick("/login")}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="info">
              <p className="disclaimer">
                Pro-Manager is a free product and does not require any
                subscription.
              </p>
              <p className="privacy-policy">
                By using Pro-Manager, you agree to our{" "}
                <span className="links">Privacy Policy</span> and{" "}
                <span className="links">Terms of Service</span>.
              </p>
            </div>
          </div>
        </section>
        <section className="features">
          <p className="box feature-title">
            <span className="brand-emphasis">Pro</span>-Manager Features:
          </p>
          {features.map((feature, index) => (
            <FeatureCard feature={feature} index={index} key={index} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
