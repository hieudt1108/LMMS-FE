import React from "react";
import { useHistory } from "react-router";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Style from "./Style.module.scss";
import MessageBuble from "../../../../Assets/Dashboard/message-buble.svg";
import Bell from "../../../../Assets/Dashboard/bell.svg";
import { logout } from "../../../../Api";
import TopnavTitle from "./TopnavTitle";

function Topnav() {
  const history = useHistory();
  function handleLogout() {
    logout();
    localStorage.clear();
    history.push("/");
  }
  return (
    <div
      className={
        Style["topnav"] + " bg-white d-flex align-items-center ps-3 pe-4"
      }
    >
      <TopnavTitle />

      <ul className="navbar-nav flex-box flex-row">
        <li
          className={
            Style["topnav__items"] +
            " aka-circle-box me-3 position-relative nav-item aka-center-box aka-boxshadow rounded-circle btn"
          }
        >
          <img src={MessageBuble} alt="message" />
          <div
            className={
              Style["count"] +
              " aka-circle-box-sm aka-center-box aka-fz-1 position-absolute rounded-circle text-white aka-fw-500"
            }
          >
            1
          </div>
        </li>

        <li
          className={
            Style["topnav__items"] +
            " aka-circle-box-md me-3 position-relative nav-item aka-center-box aka-boxshadow rounded-circle btn"
          }
        >
          <img src={Bell} alt="message" />
          <div
            className={
              Style["count"] +
              " aka-circle-box-sm aka-center-box aka-fz-1 position-absolute rounded-circle text-white aka-fw-500"
            }
          >
            3
          </div>
        </li>

        <li
          className={
            Style["topnav__items"] +
            " aka-circle-box-md position-relative nav-item aka-center-box rounded-circle btn"
          }
        >
          <UncontrolledDropdown>
            <DropdownToggle className="aka-center-box flex-row p-0 bg-white border-0 text-dark">
              <img
                className="rounded-circle"
                src="https://ui-avatars.com/api/?name=DT"
                width={48}
                alt="message"
              />
              <i className="bi bi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu className="mt-3">
              <DropdownItem onClick={handleLogout}>Đăng xuất</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
      </ul>
    </div>
  );
}

export default Topnav;
