import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "../../style/Login.css";
import { withRouter } from "react-router-dom";

const loginData = [
  {
    name: "hetu",
    pass: "1234",
  },
];
const signupdata = [
  {
    name: "het",
    pass: "1457",
  },
];

const Register = (props) => {
  const [login, setlogin] = useState("active");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupusername, setsignupusername] = useState("");
  const [signuppassword, setsignuppassword] = useState("");
  const [signuprepassword, setsignuprepassword] = useState("");
  const [alert, setalert] = useState(false);
  const [alertmssg, setalertmssg] = useState("");

  const showalert = () => {
    if (alert) {
      return (
        <Alert variant="warning" id="alert_mssg">
          {alertmssg}
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  const dislogin = () => {
    if (login === "none") {
      setlogin("active");
      document.getElementById("form_login").classList.add("active");
      document.getElementById("form_sign").classList.remove("active");
    }
  };
  const dissign = () => {
    if (login === "active") {
      setlogin("none");
      document.getElementById("form_login").classList.remove("active");
      document.getElementById("form_sign").classList.add("active");
    }
  };

  const loginCheck = () => {
    for (var i = 0; i < loginData.length; i++) {
      if (
        loginData[i].name == loginUsername &&
        loginData[i].pass == loginPassword.toString()
      ) {
        return false;
      }
    }
    return true;
  };
  const signupCheck = () => {
    for (var i = 0; i < signupdata.length; i++) {
      if (signupdata[i].name.toLowerCase() == signupusername.toLowerCase()) {
        return true;
      }
    }
    return false;
  };
  const passwordcheck = () => {
    if (signuppassword === signuprepassword) {
      return false;
    } else {
      return true;
    }
  };
  const userLogin = (e) => {
    e.preventDefault();
    if (loginCheck()) {
      setalertmssg("User name and password not maching");
      setalert(true);
    } else {
      setalertmssg("You can go further");
      props.history.push("/home");
      setalert(true);
    }
  };

  const userSignup = (e) => {
    e.preventDefault();
    if (passwordcheck()) {
      setalertmssg("Password not maching");
      setalert(true);
    } else if (signupCheck()) {
      setalertmssg("username already exists");
      setalert(true);
    } else {
      setalertmssg("You can go further");
      props.history.push("/home");
      setalert(true);
    }
  };

  return (
    <div className="login_page">
      {showalert()}
      <div className="login_component">
        <div className="login">
          <div className="login_op option" onClick={dislogin}>
            <span className="circle"></span>Login.{" "}
            <span> Already a user? </span>
          </div>
          <form
            className="login_form active"
            id="form_login"
            onSubmit={(e) => userLogin(e)}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Continue
            </button>
          </form>
        </div>
        <div className="signup">
          <div className="sign_op option" onClick={dissign}>
            Create Account. <span>New user?</span>
          </div>
          <form
            className="login_form"
            id="form_sign"
            onSubmit={(e) => userSignup(e)}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setsignupusername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setsignuppassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setsignuprepassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" id="btn">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
