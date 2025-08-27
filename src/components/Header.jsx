import { useState } from "react";
// import { LOGO_URL } from "../utils/constant";
import logo from "../assets/logo.png";

const Header = () => {
  const [loginText, setLoginText] = useState("Login");

  const loginBtnHandler = () => {
    {
      loginText === "Login" ? setLoginText("Log out") : setLoginText("Login");
    }
  };
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>Cart</li>
          <li>
            <button onClick={loginBtnHandler} className="log">
              {loginText}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
