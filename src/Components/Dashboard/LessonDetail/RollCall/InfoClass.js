import React from "react";

export default function InfoClass({ Arrcss, classInfo }) {
  const { current_lesson, total_lesson, total_user_in, total_user } = classInfo;
  const total_user_absent = total_user - total_user_in || 0;

  return (
    <div className={Arrcss.infocss + " d-flex justify-content-between"}>
      <div>
        <span className="me-5 ">
          Số tiết học:<span className="ms-1">{total_lesson}</span>
        </span>
        <span>
          Tiết học hôm nay:
          <span className="ms-1">
            <span>{current_lesson}</span>/{total_lesson}
          </span>
        </span>
      </div>
      <div>
        <span>
          Tổng số học sinh:<span className="ms-1">{total_user}</span>
        </span>
        <span className="mx-5 ">
          Có mặt:
          <span className="ms-1">
            <span>{total_user_in}</span>/{total_user}
          </span>
        </span>
        <span>
          Vắng mặt:
          <span className="ms-1">
            <span>{total_user_absent}</span>/{total_user}
          </span>
        </span>
      </div>
    </div>
  );
}
