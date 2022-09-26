import React from "react";
import SubjectImage from "../Utils/SubjectImage";

function SubjectDetailCard({ LDcss, course }) {
  const { id, name, start_datetime, total_lesson } = course;
  
  return (
    <div
      className={
        LDcss.subject + " d-flex align-items-center bg-white aka-br-3 p-3"
      }
    >
      <SubjectImage subject={"Toán học"} width={96} height={96} />
      <div className="flex-grow-1 ms-2">
        <p className={LDcss.codeclass + " aka-color-2 px-2 aka-br-1"}>
          Mã lớp học: {id}
        </p>
        <h5 className="mb-3">{name}</h5>
        <p className="mb-0">
          Ngày bắt đầu lớp học:{" "}
          <span className="aka-color-2 aka-fw-600">{start_datetime}</span>
        </p>
      </div>
      <p className={LDcss.total + " aka-br-2 px-3 py-2 mb-0"}>
        Tổng số tiết học: {total_lesson} tiết
      </p>
    </div>
  );
}

export default SubjectDetailCard;
