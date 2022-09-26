import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import Style from "./Style.module.scss";
import Icon1 from "../../../../Assets/Dashboard/white-board.svg";
import Icon2 from "../../../../Assets/Dashboard/grey-calendar.svg";
import SubjectImage from "../../Utils/SubjectImage";

function HomeworkList({ homeworkTitle, homeworks_today }) {

  function renderSchedule() {
    return homeworks_today.map((d) => {
      const {id, course_name, study_class_name, lesson, total_question } =
        d;
      const {lesson_no, start_time, end_time, session} = lesson;
      const timeStatus =
      session + " / Tiết " + lesson_no + " / " + start_time + " - " + end_time;
      return (
        <tr className="border-1" key={id}>
          <td className={Style["border-left-radius"] + " fw-bold border-start"}>
            <div className="d-flex align-items-center">
              <SubjectImage subject={course_name} width={80} height={80} />
              <div className="ms-2">
                <p className="fe-bold text-uppercase mb-2">{course_name}</p>
                <span className="fw-normal">{total_question} câu</span>
              </div>
            </div>
          </td>

          <td colSpan={2}>
            <div className={Style["stack-column"] + " d-flex justify-content-between"}>
              <p className="mb-0">
                <img src={Icon1} alt="course id" className="me-2" />
                {study_class_name}
              </p>
              <p className="mb-0">
                <img src={Icon2} alt="calendar" className="me-2" />
                {timeStatus}
              </p>
            </div>
          </td>

          <td className={Style["border-right-radius"] + " border-end"}>
            <div className="d-flex justify-content-end">
              <Link
                to="/"
                className="aka-bg-1 aka-br-2 text-nowrap text-light py-2 px-4 text-decoration-none"
              >
                Chấm điểm
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="p-4 aka-br-2 bg-white">
      <h4 className="fw-bold mb-0">{homeworkTitle}</h4>
      <Table className={Style["homework-list"]}>
        <tbody>{renderSchedule()}</tbody>
      </Table>
    </div>
  );
}

HomeworkList.propTypes = { homeworkTitle: PropTypes.string };

export default HomeworkList;
