import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { Link } from "react-router-dom";
import Style from "./Style.module.scss";
import TeacherIcon from "../../../Assets/Dashboard/teacher.svg";
import SubjectImage from "../Utils/SubjectImage";
import { subjectColor } from "../../Helpers";

function SubjectCard({ subject, isSubjectPage, match, id }) {
   console.log(match)
   const {
      study_class_name,
      name,
      end_time,
      start_time,
      session,
      lesson_no,
      lesson_date,
      current_lesson,
      total_lesson,
   } = subject;
   const nextLesson = `${session} / tiết ${lesson_no} / ${start_time} - ${end_time} /${moment(
      lesson_date
   ).format("DD.MM")}`;
   const background = subjectColor(name, true);
   let SubjectNameBox = <h4 className="mb-0 ms-2 text-uppercase fw-bold">{name}</h4>;

   if (isSubjectPage) {
      SubjectNameBox = (
         <div className="ms-2">
            <h4 className="aka-mb-12 fw-bold text-uppercase">{study_class_name}</h4>
            <p className="mb-0 aka-fw-600">
               <img src={TeacherIcon} alt="subject" />
               {": " + name}
            </p>
         </div>
      );
   }

   return (
      <Link
         to={match.url + "/" + id}
         className={
            Style["subject-card"] + " aka-br-3 d-flex align-items-center aka-p-12 mb-3 text-dark"
         }
         style={{ background }}
         key={study_class_name}
      >
         <div className="d-flex align-items-center">
            <SubjectImage subject={name} width={72} height={72} />
            {SubjectNameBox}
         </div>

         <p className="mb-0">
            Đã hoàn thành:
            <strong className="ms-2">{current_lesson + "/" + total_lesson} tiết học</strong>
         </p>

         <p className="mb-0">
            Tiết học tiếp theo:
            <strong className="ms-2">{nextLesson}</strong>
         </p>
      </Link>
   );
}

SubjectCard.propTypes = {
   subject: PropTypes.object,
};

export default SubjectCard;
