import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { UPDATE_CLASSROOM } from "../../../Redux/Actions/ActionTypes";
import SubjectCard from "../ClassRoomDetail/SubjectCard";

export default function SubjectList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: UPDATE_CLASSROOM, config: { subjectList: {totalSubject: 4, totalClassRoom: 2} } });
    return () => dispatch({ type: UPDATE_CLASSROOM, config: {} });
  },[]);

  const data = [
    {
      course_id: 0,
      current_lesson: 5,
      end_time: "07:45",
      id: 1,
      lesson_date: "0035-05-14",
      lesson_no: 1,
      name: "Toán học",
      session: "Sáng",
      start_time: "07:00",
      study_class_name: "Lớp 11H",
      total_lesson: 6,
    },
  ];

  return (
    <div className="bg-white h-100 aka-br-2 py-4 px-3">
      {data.map((subject) => (
        <SubjectCard
          subject={subject}
          isSubjectPage={true}
          key={subject.course_id}
        />
      ))}
    </div>
  );
}
