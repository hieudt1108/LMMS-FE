import React from "react";
import { Link } from "react-router-dom";

import Style from "./Style.module.scss";
import { LDImage1, LDIcon6, LDIcon7 } from "../../Assets/LandingPage";
import Logo from "../../Assets/Dashboard/logo-victoryschool.png";

export default function LandingPage() {
  return (
    <div className={Style["landing-page"]}>
      <section className={Style["header-wrapper"] + " w-100"}>
        <div className={Style["container"] + " mx-auto"}>
          <div
            className={
              Style["top-nav"] +
              " d-flex justify-content-between align-items-center"
            }
          >
            <div
              className={
                Style["vic-school"] + " d-flex align-items-center mb-3"
              }
            >
              <img src={Logo} alt="akadon" />
              <div className={Style["vic-info-name"]}>
                <span className={Style["vic-grade"]}>
                  TRƯỜNG TIỂU HỌC VÀ TRUNG HỌC CƠ SỞ
                </span>
                <br></br>
                <span className=" aka-fw-700 mb-0 text-capitalize text-nowrap">
                  VICTORIA THĂNG LONG
                </span>
              </div>
            </div>

            <Link
              to="/login"
              className="aka-bg-1 aka-br-2 aka-lh-44 text-decoration-none border-0 text-light px-4"
            >
              Đăng nhập
            </Link>
          </div>

          <div className="d-flex flex-column flex-xl-row align-items-center justify-content-between">
            <h1 className="text-white aka-fw-800 mb-0 text-capitalize text-nowrap">
              Quản lý<span className="d-inline d-xl-block"></span> tài liệu
              online<br></br> thật đơn giản
            </h1>
            <img src={LDImage1} alt="landing page" width={648} />
          </div>
        </div>
      </section>

      <section className={`${Style["block-3"]} ${Style["container"]}`}>
        <h2
          className={`${Style["sub-header"]} position-relative text-center aka-fw-800`}
        >
          Quản lý tài liệu bài giảng
        </h2>

        <div className="d-flex flex-column flex-xl-row align-items-center align-items-xl-stretch">
          <div
            className={`${Style["content-box"]} aka-bg-4 aka-br-4 position-relative w-50 p-4 me-0 me-xl-3 mb-5 mb-xl-0`}
          >
            <div className="d-flex align-items-center mb-2 mb-xl-3">
              <img src={LDIcon6} alt="landing page" />
              <h4 className="mb-0 fw-bold aka-ms-12 text-capitalize">
                Chương trình học
              </h4>
            </div>
            <p>
              Nhà trường luôn có thể chủ động cài đặt chương trình học theo
              giáo án đã định sẵn cho các năm học
            </p>
          </div>

          <div
            className={`${Style["content-box"]} aka-bg-4 aka-br-4 position-relative w-50 p-4`}
          >
            <div className="d-flex align-items-center mb-3">
              <img src={LDIcon7} alt="landing page" />
              <h4 className="mb-0 fw-bold aka-ms-12 text-capitalize">
                Trải nghiệm dùng
              </h4>
            </div>
            <p>
              Đem lại trải nghiệm đơn giản cho các giáo viên và học sinh
            </p>
          </div>
        </div>
      </section>

      <section className={`${Style["footer-wrapper"]} aka-bg-4`}>
        <div className={`${Style["container"]}`}>
          {/* <img src={Logo} alt="akadon" className="mb-4" /> */}
          <ul
            className={`navbar-nav justify-content-between d-flex flex-row flex-wrap border-bottom`}
          >
            <li className={`nav-item mb-4 me-3`}>
              <img
                src={Logo}
                alt="akadon"
                className="mb-4 d-flex mx-auto"
              />
              <p className="mb-4">VICTORIA THĂNG LONG</p>
            </li>

            <li className={`nav-item mb-4 me-3`}>
              <p className="mb-4">
                <i className="bi bi-geo-alt"></i>
                <span className="ms-3">
                  Địa chỉ: Lô A2.4 - TH01 - KĐT Thanh <br></br> Hà - Thanh
                  Oai - Hà Nội
                </span>
              </p>
              <p className="mb-4">
                <i className="bi bi-geo-alt"></i>
                <span className="ms-3">
                  CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN <br></br> GIÁO DỤC
                  VICTORIA THĂNG LONG Địa chỉ Văn Phòng: <br></br>Tầng 2 –
                  Khu Văn Phòng, tòa nhà 27A3, Khu đô thị <br></br>Green
                  Star 232 Phạm Văn Đồng, Phường Cổ Nhuế 1,<br></br> Quận
                  Bắc Từ Liêm, TP Hà Nội
                </span>
              </p>
            </li>

            <li className={`nav-item mb-4`}>
              <p className="aka-mb-12">
                <i className="bi bi-telephone-fill"></i>
                <a
                  href="tel:0858836632"
                  className="ms-3 text-dark text-decoration-none"
                >
                  024 6653 6253 - 0889 662 899
                </a>
              </p>
              <p className="aka-mb-12">
                <i class="bi bi-envelope-fill"></i>
                <span className="ms-3">
                  Email: <strong>vicschool@vicschool.edu.vn</strong>
                </span>
              </p>

              <p className="aka-mb-12">
                <i class="bi bi-building"></i>
                <span className="ms-3">
                  Website:{" "}
                  <strong>
                    <a href="http://vicschool.edu.vn/">
                      http://vicschool.edu.vn/
                    </a>
                  </strong>
                </span>
              </p>
            </li>
          </ul>
          <div className="py-3 d-flex">
            <a
              href="/"
              className="mb-0 me-4 text-dark text-decoration-none"
            >
              Điều khoản sử dụng
            </a>
            <a
              href="/"
              className="mb-0 flex-grow-1 text-dark text-decoration-none"
            >
              Chính sách bảo mật
            </a>
            <p className="mb-0">
              Copyright © Victoria Thăng Long Corporation. All Rights
              Reserved
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
