import React from "react";
import { Link } from "react-router-dom";

import Style from "./Style.module.scss";
import {
  LDImage1,
  LDImage2,
  LDIcon1,
  LDIcon2,
  LDIcon3,
  LDIcon4,
  LDIcon5,
  LDIcon6,
  LDIcon7,
} from "../../Assets/LandingPage";
import Logo from "../../Assets/Dashboard/logo.svg";

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
            <img src={Logo} alt="akadon" />
            <Link
              to="/login"
              className="aka-bg-1 aka-br-2 aka-lh-44 text-decoration-none border-0 text-light px-4"
            >
              Đăng nhập
            </Link>
          </div>

          <div className="d-flex flex-column flex-xl-row align-items-center justify-content-between">
            <h1 className="aka-color-5 aka-fw-800 mb-0 text-capitalize text-nowrap">
              Quản lý<span className="d-inline d-xl-block"></span> trường học
              online<br></br> thật đơn giản
            </h1>
            <img src={LDImage1} alt="landing page" width={648} />
          </div>
        </div>
      </section>

      <section className={`${Style["block-1"]} ${Style["container"]}`}>
        <h2
          className={`${Style["sub-header"]} aka-fw-800 text-center text-capitalize position-relative`}
        >
          Quản lý lớp học & các khoá học
        </h2>
        <div className="d-flex flex-column flex-xl-row align-items-stretch">
          <div className="text-center">
            <img
              src={LDImage2}
              alt="landing page"
              className={Style["hero-image"] + " me-3"}
            />
          </div>
          <div className="d-flex flex-row flex-xl-column justify-content-between align-items-stretch py-3">
            <div
              className={`${Style["content-box"]} aka-br-4 aka-boxshadow py-4 px-3 me-3 mb-0 mb-xl-4 me-xl-0 `}
            >
              <div className="d-flex align-items-center">
                <img src={LDIcon1} alt="classroom" className="me-2" />
                <h4 className="mb-0 fw-bold">Lớp học</h4>
              </div>
              <p>
                Từng lớp học và khoá học được chia theo logic tương tự như lớp
                học truyền thống
              </p>
            </div>

            <div
              className={`${Style["content-box"]} aka-br-4 aka-boxshadow py-4 px-3`}
            >
              <div className="d-flex align-items-center">
                <img src={LDIcon2} alt="classroom" className="me-2" />
                <h4 className="mb-0 fw-bold">Trải nghiệm</h4>
              </div>
              <p>
                Giúp đem lại trải nghiệm xuyên suốt dù học trực tiếp hay trực
                tuyến
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${Style["block-2-wrapper"]} w-100`}>
        <div className={`${Style["container"]}`}>
          {/* HEADER */}
          <h2
            className={`${Style["sub-header"]} position-relative text-capitalize aka-fw-800 text-center`}
          >
            Tác vụ của giáo viên
          </h2>
          {/* PARAGRAPH */}
          <p className="text-center mx-auto">
            Các tác vụ thường ngày của giáo viên sẽ được tự động hoá, giúp giáo
            viên có thể bỏ qua những công đoạn lặp lại, và có thể tập trung vào
            việc truyền đạt kiến thức tốt hơn
          </p>
          {/* CONTENT CONTAINER START */}
          <div className="d-flex justify-content-between">
            <div
              className={`${Style["content-box"]} aka-br-4 me-3 position-relative bg-white`}
            >
              <h4 className="fw-bold text-center w-100">Điểm danh</h4>
              <img
                src={LDIcon3}
                alt="landing page"
                className={`position-absolute`}
              />
            </div>

            <div
              className={`${Style["content-box"]} aka-br-4 me-3 position-relative bg-white`}
            >
              <h4 className="fw-bold text-center w-100">Giao bài tập</h4>
              <img
                src={LDIcon4}
                alt="landing page"
                className={`position-absolute`}
              />
            </div>

            <div
              className={`${Style["content-box"]} aka-br-4 position-relative bg-white`}
            >
              <h4 className="fw-bold text-center w-100">Đánh giá kết quả</h4>
              <img
                src={LDIcon5}
                alt="landing page"
                className={`position-absolute`}
              />
            </div>
          </div>
          {/* CONTENT CONTAINER END */}
        </div>
      </section>

      <section className={`${Style["block-3"]} ${Style["container"]}`}>
        <h2
          className={`${Style["sub-header"]} position-relative text-center aka-fw-800`}
        >
          Quản lý nội dung giáo dục
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
              Nhà trường luôn có thể chủ động cài đặt chương trình học theo giáo
              án đã định sẵn cho các năm học
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
            <p>Đem lại trải nghiệm đơn giản cho các giáo viên và học sinh</p>
          </div>
        </div>
      </section>

      <section className={`${Style["footer-wrapper"]} aka-bg-4`}>
        <div className={`${Style["container"]}`}>
          <img src={Logo} alt="akadon" className="mb-4" />
          <ul className={`navbar-nav d-flex flex-row flex-wrap border-bottom`}>
            <li className={`nav-item mb-4 me-3`}>
              <p className="mb-4">Công ty TNHH Công nghệ Ứng dụng AKADON</p>
              <a href="/" className="text-dark h2 mb-0 me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="/" className="text-dark h2 mb-0">
                <i className="bi bi-youtube"></i>
              </a>
            </li>

            <li className={`nav-item mb-4 me-3`}>
              <p className="mb-4">
                <i className="bi bi-geo-alt"></i>
                <span className="ms-3">
                  Tầng 3, số 26 Lê Trọng Tấn, Khương Mai,<br></br> Thanh Xuân,
                  Hà Nội
                </span>
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone-fill"></i>
                <a
                  href="tel:0858836632"
                  className="ms-3 text-dark text-decoration-none"
                >
                  085 883 6632
                </a>
              </p>
            </li>

            <li className={`nav-item mb-4`}>
              <p className="aka-mb-12">
                Mã số doanh nghiệp: <strong>0107979500</strong>
              </p>

              <p className="aka-mb-12">
                Đại diện doanh nghiệp: <strong>Văn Thị Thu Nhiên</strong>
              </p>

              <p className="aka-mb-12">
                Chức vụ: <strong>Giám đốc điều hành</strong>
              </p>
            </li>
          </ul>
          <div className="py-5 d-flex">
            <a href="/" className="mb-0 me-4 text-dark text-decoration-none">
              Điều khoản sử dụng
            </a>
            <a
              href="/"
              className="mb-0 flex-grow-1 text-dark text-decoration-none"
            >
              Chính sách bảo mật
            </a>
            <p className="mb-0">@2021 AKADON EDUCATION. All Rights Reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
