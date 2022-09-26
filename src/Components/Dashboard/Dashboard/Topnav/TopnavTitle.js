import React from "react";
import { useSelector } from "react-redux";

import TeacherIcon from "../../../../Assets/Dashboard/teacher.svg";

export default function TopnavTitle() {
  const appConfig = useSelector(state => state.appConfig);
  const {totalClassRoom, classRoomDetail, subjectList,lesonDetail, subjectDetail} = appConfig;

   switch (true) {
      case typeof (classRoomDetail ||  subjectDetail) === "object": {
         return (
            <ul className="navbar-nav d-flex flex-row align-items-center flex-wrap flex-grow-1">
               <li className="nav-item aka-color-5 flex-grow-1">
                  <h4 className="mb-0 fw-bold">
                     <img src={TeacherIcon} alt="teacher" className="me-2" />
                     {classRoomDetail.name}
                  </h4>
               </li>
            
               <li className="nav-item aka-fw-600 flex-grow-1">
                  <span className="aka-color-3">Tổng học sinh: </span>
                  <span className="aka-color-5">{classRoomDetail.total_student}</span>
               </li>

               <li className="nav-item aka-fw-600 flex-grow-1">
                  <span className="aka-color-3">Nam: </span>
                  <span className="aka-color-2">{" " + classRoomDetail.total_male}</span>
                  <span className="aka-color-5">{" /" + classRoomDetail.total_student}</span>
               </li>

               <li className="nav-item aka-fw-600 flex-grow-1">
                  <span className="aka-color-3">Nữ: </span>
                  <span className="aka-color-2">{" " + classRoomDetail.total_female}</span>
                  <span className="aka-color-5">{" /" + classRoomDetail.total_student}</span>
               </li>

          <li className="nav-item aka-fw-600 flex-grow-1">
            <span className="aka-color-3">Số khoá học giảng dạy:</span>
            <span className="aka-color-5">{" " + classRoomDetail.total_course}</span>
          </li>
        </ul>
      );
    }
    case typeof(totalClassRoom) === "number" : {
      return (
        <h4 className="flex-grow-1 fw-bold mb-0">
          <span>Bạn đang dạy</span>
          <span className="aka-color-2"> {totalClassRoom} lớp</span>
        </h4>
      );
    }
    case typeof(subjectList) === "object": {
      return (
        <h4 className="flex-grow-1 fw-bold mb-0">
          Bạn đang dạy
          <span className="aka-color-2"> {subjectList.totalSubject} khoá học </span>
          cho
          <span className="aka-color-2"> {subjectList.totalClassRoom} lớp</span>
        </h4>
      );
    }
    case typeof(lesonDetail) === "object":{
      const {subject,less}=lesonDetail;
      return(
        <h5 className="flex-grow-1 fw-bold mb-0">
       {subject||"Không xác định"} / <span className="h6">
       Tiết {less||0}
       </span>
      </h5>
      )
    }
    default: {
      return <h2 className="flex-grow-1 aka-fw-800">Tổng Quan</h2>;
    }
  }
}
