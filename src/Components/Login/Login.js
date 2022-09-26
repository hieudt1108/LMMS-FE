import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import {login, setLocalStorage, getLocalStorage} from "../../Api";
import { LOGIN_REQUEST } from "../../Redux/Actions/ActionTypes";

import lgUnder from "../../Assets/Login/loginBG.svg";
import logo from "../../Assets/Login/LogoGroup.svg";

import Lgcss from "./Login.module.scss";
import LoginInfo from "./LoginInfo";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  // warning unctrol to control
  const initUser = {
    school: "Akadon",
    email: "thanhdovan210184@gmail.com",
    password: "123@123a",
  };
  const [hide, setHide] = useState(true);
  const [loginData, setLoginData] = useState(initUser);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  // SIDE EFFECTS
  useEffect(() => {
    const isAuthenticated = getLocalStorage("isAuthenticated");
    if (isAuthenticated) {
      history.push("/dashboard/home");
    }
  });

  // FUNCTION DECLARATIONS
  async function handleLogin(e) {
    e.preventDefault();
    // optional
    if (!loginData.email) {
      setError("school");
      return;
    }
    if (!loginData.email) {
      setError("email");
      return;
    }
    if (!loginData.email) {
      setError("password");
      return;
    }
    setError("");

    const res = await login(loginData);

    if (res.status < 400) {
      history.push("/dashboard/home");
      // setLocalStore
      setLocalStorage("access_token", res.data.token);
      setLocalStorage("user_info", res.data.user);
      setLocalStorage("isAuthenticated", true);
      dispatch({ type: LOGIN_REQUEST, user: res.data.user });
    } else if (res.response) {
      alert("Tài khoản này không có hoặc bị sai thông tin!!");
    }
  }

  return (
    <div className={Lgcss.login_main + " aka-bg-4"}>
      <div className={Lgcss.box_contain + "  position-relative"}>
        <img
          src={lgUnder}
          alt="under"
          className={Lgcss.under_img + " position-absolute"}
        />
        <div className="text-center pb-2">
          <img alt="logo" src={logo} width={125} />
        </div>
        <Form
          className={Lgcss.box + " mx-auto mt-4 aka-br-2"}
          onSubmit={handleLogin}
        >
          <h4 className="text-center fw-bold py-4 mb-0"> Đăng Nhập</h4>
          <LoginInfo
            hide={hide}
            setHide={setHide}
            data={loginData}
            setData={setLoginData}
            error={error}
          />
          <div className="mx-5">
            <Button
              className={
                Lgcss.main_btn +
                " text-center fw-bold h5 text-white mb-3 aka-br-2 position-relative w-100 border-0"
              }
              type="submit"
            >
              Đăng nhập
            </Button>

            <div className="pb-3">
              <Input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="me-1"
                defaultChecked={remember}
                value={remember}
                onChange={() => setRemember(!remember)}
              />
              <Label for="rememberMe">Ghi nhớ tài khoản</Label>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
