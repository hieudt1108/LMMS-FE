import React from "react";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";
import EyesIcon from "../../Assets/Login/eyes-icon.svg";
import SlashEyesIcon from "../../Assets/Login/slash-eyes-icon.svg";
import Lgcss from "./Login.module.scss";
import ErrorHandler from "./ErrorHandler";
import { Link } from "react-router-dom";

function LoginInfo({ hide, setHide, data, setData, error }) {
  return (
    <div className="mx-5">
      <div>
        <Label className={Lgcss.lable} for="school">
          Mã trường
        </Label>
        {error === "school" && (
          <ErrorHandler error={"Bạn chưa nhập trường"} number={1} />
        )}
        <Input
          id="school"
          name="school"
          type="text"
          placeholder="Nhập mã trường"
          required
          value={data.school}
          onChange={(e) =>
            setData({
              ...data,
              school: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Label className={Lgcss.lable + " mt-4"} for="email">
          Email
        </Label>
        {error === "email" && (
          <ErrorHandler error={"Bạn chưa nhập email"} number={1} />
        )}
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Nhập email"
          required
          value={data.email}
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Label className={Lgcss.lable + " mt-4"} for="password">
          Mật Khẩu
        </Label>
        {error === "password" && (
          <ErrorHandler error={"Bạn chưa nhập mật khẩu"} number={1} />
        )}
        <InputGroup>
          <Input
            id="password"
            name="password"
            type={hide ? "password" : "text"}
            placeholder="Nhập mật khẩu"
            required
            value={data.password}
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
          />

          <InputGroupText
            onClick={() => setHide(!hide)}
            className="cursor-pointer bg-light border-left-0"
          >
            <img src={hide ? SlashEyesIcon : EyesIcon} alt="visible password" />
          </InputGroupText>
        </InputGroup>
      </div>
      <p className="text-end my-4 ">
        <Link to="/" className="text-decoration-none aka-color-1">
          Quên mật khẩu?
        </Link>
      </p>
    </div>
  );
}

export default LoginInfo;
