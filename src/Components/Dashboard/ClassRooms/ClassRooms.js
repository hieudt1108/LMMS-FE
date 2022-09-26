import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Style from "./Style.module.scss";
import { UPDATE_CLASSROOM } from "../../../Redux/Actions/ActionTypes";
import {getAllClassroom} from "../../../Api";
import TeacherIcon from "../../../Assets/Dashboard/teacher.svg";

export default function ClassRooms({match}) {
  const [classroom, setClassroom] = useState([]);
  const dispatch = useDispatch();
  // SIDE EFFECTS
  useEffect(() => {
    fetchAllClassroom();
    return () => dispatch({type: UPDATE_CLASSROOM, config: {}});
  }, []);

  // FUNCTION DECLARATIONS
  async function fetchAllClassroom() {
    const res = await getAllClassroom();

    if (res.status < 400) {
      setClassroom(res.data);
      dispatch({type: UPDATE_CLASSROOM, config: {totalClassRoom: res.data.length}});
    } else if (res.response) {
      alert("Error: " + res.response.status);
      dispatch({type: UPDATE_CLASSROOM, config: {totalClassRoom: 0}});
    }
  }

  function renderCourses() {
    return classroom.map((room) => {
      const { id,  start_datetime, study_class } = room.user_study_class;
      const {total_student, total_male, total_female, total_course, total_lesson, name} = study_class;

      return (
        <Link to={match.path + "/" + id} className="d-block text-decoration-none bg-white aka-br-3 p-4 mb-3" key={id}>
          <h4 className="text-dark mb-3">
            <img src={TeacherIcon} alt="teacher" className="me-2" />
            {name}
          </h4>
          <div className={Style["course-card"] + " aka-br-2 d-flex mb-3"}>
            <div className="aka-color-5 text-center py-3">
              <h4>{total_student}</h4>
              <span>Học sinh</span>
            </div>

            <div className="aka-color-5 text-center py-3">
              <h4>{total_male}</h4>
              <span>Nam</span>
            </div>

            <div className="aka-color-5 text-center py-3">
              <h4>{total_female}</h4>
              <span>Nữ</span>
            </div>

            <div className="aka-color-5 text-center py-3">
              <h4>{total_course}</h4>
              <span>Môn học giảng dạy</span>
            </div>

            <div className="aka-color-5 text-center py-3">
              <h4>{total_lesson}</h4>
              <span>Số tiết giảng dạy</span>
            </div>
          </div>
          <p className="mb-0">
            <span className="aka-color-3">Ngày bắt đầu dạy: </span>
            <span className="aka-color-5">{start_datetime}</span>
          </p>
        </Link>
      );
    });
  }
  return <div>{renderCourses()}</div>;
}
