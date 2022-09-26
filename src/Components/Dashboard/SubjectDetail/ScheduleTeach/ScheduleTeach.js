import React, { useState, useEffect } from "react";
import Style from "./Style.module.scss";
import PropTypes from "prop-types";

import CelendarTeach from "../../../../Assets/Dashboard/celendar-teach.svg";

import CelendarDetail from "../Celendar/Celendar";
import { Link } from "react-router-dom";

export default function ScheduleTeach({ match }) {
   return (
      <div className="bg-white aka-br-3">
         <div className={Style["left-header"]}>
            <div className={Style["border-bottom"]}>
               <img src={CelendarTeach} alt="" />
               <span className="aka-fz-2 aka-fw-400">Lịch giảng dạy</span>
            </div>
         </div>

         {/* to={Math.path + "/" + 10} */}
         <CelendarDetail />
         <div className={Style["detail-celendar"] + " aka-mt-12 p-3"}>
            <div className={"aka-mb-12"}>
               <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 2 - 22.11.2021</span>
               <Link
                  to={Math.path + "/" + 10}
                  className={
                     Style["day-detail"] +
                     " aka-bg-8 aka-br-2 aka-p-16 aka-mt-12 aka-mb-24 text-decoration-none text-black"
                  }
               >
                  <div>
                     <span className={Style["lesson-id"] + " aka-fz-2 aka-fw-400 aka-me-50"}>
                        Tiết 1 / 7:00 - 7:45
                     </span>
                  </div>
                  <div>
                     <span className="aka-fz-2 aka-ms-12">
                        Điểm danh:{" "}
                        <span className="aka-fz-2 aka-color-2 text-capitalize fw-bold aka-fw-600">
                           30
                        </span>
                        <span className="aka-fz-2 aka-color-5 fw-bold aka-fw-600">{" / "} 30</span>
                     </span>
                  </div>
               </Link>
            </div>

            <div className={"aka-mb-12"}>
               <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 3 - 23.11.2021</span>
               <Link
                  className={
                     Style["day-detail"] +
                     " aka-bg-8 aka-br-2 aka-p-16 aka-mt-12 text-decoration-none text-black"
                  }
               >
                  <div>
                     <span className={Style["lesson-id"] + " aka-fz-2 aka-fw-400"}>
                        Tiết 1 / 7:00 - 7:45
                     </span>
                  </div>
                  <div>
                     <span className="aka-fz-2 aka-ms-12">Chưa điểm danh </span>
                  </div>
               </Link>
               <Link
                  className={
                     Style["day-detail"] +
                     " aka-bg-8 aka-br-2 aka-p-16 aka-mt-12 aka-mb-24 text-decoration-none text-black"
                  }
               >
                  <div>
                     <span className={Style["lesson-id"] + " aka-fz-2 aka-fw-400"}>
                        Tiết 3 / 9:40 - 10:25
                     </span>
                  </div>
                  <div>
                     <span className="aka-fz-2 aka-ms-12">Chưa điểm danh </span>
                  </div>
               </Link>
            </div>
            <div className={"aka-mb-12"}>
               <span className="aka-fz-3 fw-bold aka-fw-600">Thứ 5 - 25.11.2021</span>
               <Link
                  className={
                     Style["day-detail"] +
                     " aka-bg-8 aka-br-2 aka-p-16 aka-mt-12 text-decoration-none text-black"
                  }
               >
                  <div>
                     <span className={Style["lesson-id"] + " aka-fz-2 aka-fw-400"}>
                        Tiết 1 / 7:00 - 7:45
                     </span>
                  </div>
                  <div>
                     {" "}
                     <span className="aka-fz-2 aka-ms-12">Chưa điểm danh </span>
                  </div>
               </Link>
            </div>
         </div>
      </div>
   );
}

ScheduleTeach.propTypes = {};
