import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink, useRouteMatch, Link } from "react-router-dom";

import style from "./Style.module.scss";
import Logo from "../../../../Assets/Dashboard/logo-victoryschool.png";

export default function Sidebar() {
  const match = useRouteMatch();
  return (
    <div className={style["sidebar"] + " bg-white"}>
      <div className={style["logo"] + " text-center"}>
        <Link to="/">
          <img src={Logo} alt="akadon" width={110} className="mx-auto" />
        </Link>
      </div>

      <ListGroup>
        <ListGroupItem className="border-0 px-0 py-3">
          <NavLink
            to={match.path + "/home"}
            activeClassName={style.active}
            className={
              style["nav-link"] +
              " aka-color-3 aka-color-1 text-decoration-none d-block w-100 ps-3"
            }
          >
            <i className="bi bi-house-door-fill h4 mb-0 me-2"></i>
            <span className="text-color-1 aka-fw-600">Trang chủ</span>
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="border-0 px-0 py-3">
          <NavLink
            to={match.path + "/classroom"}
            activeClassName={style.active}
            className={
              style["nav-link"] +
              " aka-color-3 aka-color-1 text-decoration-none d-block w-100 ps-3"
            }
          >
            <i className="bi bi-bank2 h4 mb-0 me-2"></i>
            <span className="text-color-1 aka-fw-600">Lớp học</span>
          </NavLink>
        </ListGroupItem>

        <ListGroupItem className="border-0 px-0 py-3">
          <NavLink
            to={match.path + "/subjects"}
            activeClassName={style.active}
            className={
              style["nav-link"] +
              " aka-color-3 aka-color-1 text-decoration-none d-block w-100 ps-3"
            }
          >
            <i className="bi bi-book-half h4 mb-0 me-2"></i>
            <span className="text-color-1 aka-fw-600">Môn học</span>
          </NavLink>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
