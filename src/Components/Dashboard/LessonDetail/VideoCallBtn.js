import React from "react";
import bg1 from "../../../Assets/Dashboard/LessonDetail/phone.svg";
import camera from "../../../Assets/Dashboard/LessonDetail/camera.png";

function VideoCallBtn({ LDcss, statusLesson }) {
  if (statusLesson === 2) {
    return (
      <div
        className={
          LDcss.done + " d-flex align-items-center bg-white aka-br-3 p-3"
        }
      >
        <div className={LDcss.btn_video_done + " main-btn mx-auto"}>
          <img src={camera} alt="bg" className="me-2" />
          Video đã dạy
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          LDcss.videoCall + " d-flex align-items-center bg-white aka-br-3 p-3"
        }
      >
        <div className={LDcss.btn_video + " main-btn mx-auto"}>
          <img src={bg1} alt="bg" className="me-2" />
          Vào tiết học
        </div>
      </div>
    );
  }
}

export default VideoCallBtn;
