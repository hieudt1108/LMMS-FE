import React from "react";

import Calender from "../../../Assets/Dashboard/LessonDetail/calender.svg";
import lapWitPer from "../../../Assets/Dashboard/LessonDetail/Frame.png";

function ScheduleCard({ LDcss, statusLesson, schedule }) {
  const {
    session,
    start_time,
    end_time,
    lesson_date,
    total_student,
    total_student_in,
    lesson_no,
  } = schedule;
  const date = lesson_date && lesson_date.split("-", 2).join(".");
  console.log(schedule);
  return (
    <div
      className={
        LDcss.schedule +
        " d-flex flex-row flex-wrap w-25 bg-white aka-br-3 px-3 pt-4"
      }
    >
      <div className="w-75">
        <h5>
          <img src={Calender} alt="icon" /> Tiết {lesson_no}
        </h5>
        <p>
          {session} / {start_time} - {end_time} / {date}
        </p>
        {statusLesson === 2 ? (
          <p>
            Điểm danh:<span className="aka-color-2"> {total_student_in}</span>/
            {total_student}
          </p>
        ) : (
          <p>Chưa điểm danh</p>
        )}
      </div>
      <div className="w-25">
        <img src={lapWitPer} alt="anh" />
      </div>
    </div>
  );
}

export default ScheduleCard;
