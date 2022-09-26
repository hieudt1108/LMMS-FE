import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import Style from "./Style.module.scss";
import Icon from "../../../../Assets/Dashboard/white-schedule.svg";
import Icon1 from "../../../../Assets/Dashboard/white-board.svg";
import Icon2 from "../../../../Assets/Dashboard/grey-calendar.svg";
import { subjectColor } from "../../../Helpers";
function ScheduleList({TitleScheduleList, courses_today}) {

  function renderSchedule() {
    return courses_today.map((course) => {
      const { id, name, study_class_name, next_lesson } = course;
      const { lesson_no, start_time, end_time, session } = next_lesson;
      const bgColor = subjectColor(name, true);
      const borderColor = subjectColor(name, false);
      const borderLeft = `4px solid ${borderColor}`;
      const timeStatus =
        session +
        " / Tiết " +
        lesson_no +
        " / " +
        start_time +
        " - " +
        end_time;
      return (
        <tr
          className="border-1"
          key={id}
          style={{ background: bgColor }}
        >
          <td
            className={Style["border-left-radius"] + " fw-bold"}
            style={{
              borderLeft,
              borderColor,
            }}
          >
            {name}
          </td>

          <td colSpan={2} style={{ borderColor }}>
            <div
              className={
                Style["stack-column"] + " d-flex justify-content-between"
              }
            >
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

          <td className={Style["border-right-radius"]} style={{ borderColor }}>
            <div className="d-flex justify-content-end me-1">
              <Link
                to="/"
                className="aka-bg-1 aka-br-2 text-nowrap text-light py-2 px-4 text-decoration-none"
              >
                Vào tiết học
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="p-4 aka-br-2 bg-white mb-4">
      <div className="d-flex">
       {TitleScheduleList}
        <div className="d-flex align-items-center">
          <div className="aka-circle-box-md aka-center-box aka-bg-2 me-2">
            <img src={Icon} alt="schedule" />
          </div>
          <span className="aka-color-5 fw-bold aka-fz-1 btn px-0">
            Xem lịch
            <i className="bi bi-arrow-right ms-1"></i>
          </span>
        </div>
      </div>
      <Table className={Style["schedule-list"]}>
        <tbody>{renderSchedule()}</tbody>
      </Table>
    </div>
  );
}

ScheduleList.propTypes = { courses_today: PropTypes.array };

export default ScheduleList;
