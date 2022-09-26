import React from "react";

function HomeWork({ css, homWork, moment }) {
  const { start_dates, title, content, state } = homWork;

  return (
    <div>
      <h5 className="text-capitalize my-2 aka-fw-600">
        {moment(start_dates).format("dddd, DD.mm.yyyy")}
      </h5>
      <div
        className={
          css.home_work + " d-flex justify-content-between aka-br-1 p-3"
        }
      >
        <div className="flex-grow-1 ms-2">
          <p className="fw-bold fs-6">{title}</p>
          <p className="m-0">{content}</p>
        </div>
        <p className={state === 2 ? css.not_mark : css.mark + " fw-bold"}>
          {state === 2 ? "Chưa chấm" : "Đã chấm"}
        </p>
      </div>
    </div>
  );
}

export default HomeWork;
