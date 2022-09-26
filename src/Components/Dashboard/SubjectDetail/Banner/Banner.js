import React from "react";
import PropTypes from "prop-types";

import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import LDcss from "./Style.module.scss";
import SubjectImage from "../../Utils/SubjectImage";
import { subjectColor } from "../../../Helpers";

function Banner() {
   const data = [
      {
         courseId: "11H",
         subjectName: "Toán học",
         finishedLessons: 5,
         lessons: 6,
         nextLesson: "Sáng / Tiết 1 / 07:00 - 07:45 /26.11 ",
      },
   ];

   return (
      <div className={LDcss.subject + " d-flex align-items-center bg-white aka-br-3 p-3 mb-3"}>
         <SubjectImage subject={"Toán học"} width={96} height={96} />
         <div className="flex-grow-1 ms-2">
            <p className="aka-fz-3 fw-bold text-uppercase mb-2">11H</p>
            <span className="fw-normal">Toán Học</span>
         </div>
         <div className="flex-grow-1 ms-2">
            <p className="aka-fz-2 text-black-50">
               Đã hoàn thành:{" "}
               <span className="aka-fz-2 aka-color-2 text-capitalize fw-bold aka-fw-600">5</span>
               <span className="aka-fz-2 aka-color-5 fw-bold aka-fw-600">
                  {" / 6"} tiết học
               </span>
            </p>
            <span className="aka-fz-2 text-black-50">Tiết học tiếp theo: </span>
            <span className="aka-fz-2 fw-bold aka-fw-600">
               Sáng / Tiết 1 / 07:00 - 07:45 /26.11
            </span>
         </div>
         <div className="d-flex justify-content-end">
            <Link to="/" className="aka-bg-1 aka-br-2 text-light py-2 px-4 text-decoration-none">
               Danh sách học sinh
            </Link>
         </div>
      </div>
   );
}

Banner.propTypes = {};

export default Banner;