import React, { useEffect, useState } from "react";

import TutorBanner from "../../../Assets/Dashboard/tutor-banner.png";
import StudentBanner from "../../../Assets/Dashboard/student-banner.png";
import { getSumaryInfo } from "../../../Api";
import Banner from "./Banner/Banner";
import ScheduleList from "./ScheduleList/ScheduleList";
import HomeworkList from "./HomeworkList/HomeworkList";
import { useSelector } from "react-redux";

export default function Home() {
  const role =useSelector((state)=>state.user.role)
 
  const [sumary, setSumary] = useState({
    courses_today: [],
    homeworks_today: [],
    total_class: 0,
    total_course: 0,
  });
  let BannerTitle, BannerImage, TitleScheduleList, homeworkTitle;

  // SIDE EFFECTS
  useEffect(() => {
    fetchSumaryInfo();
  }, []);

  // FUNTION DECLARATIONS
  async function fetchSumaryInfo() {
    const res = await getSumaryInfo();
    if (res.status < 400) {
      setSumary(res.data);
    }

    if (res.response) {
      window.alert("Lỗi " + res.response.status);
    }
  }

  if (role === 0) {
    BannerTitle = (
      <h4 className="fw-bold mb-3">
        <span>Bạn đang theo học</span>
        <span className="aka-color-2"> {sumary.total_course} môn học</span>
      </h4>
    );
    BannerImage = <img src={StudentBanner} alt="tutor" />;
    homeworkTitle = "BTVN cần nộp";
    TitleScheduleList = (
      <h4 className=" fw-bold flex-grow-1 mb-0">
        Thời khoá biểu hôm nay ({sumary.courses_today?.length} tiết)
      </h4>
    );
  } else {
    BannerTitle = (
      <h4 className="fw-bold mb-3">
        <span>Bạn đang dạy</span>
        {/* <span className="aka-color-2"> {sumary.total_course} môn học</span>
        <span> cho</span> */}
        <span className="aka-color-2"> {sumary.total_class} lớp</span>
      </h4>
    );
    BannerImage = <img src={TutorBanner} alt="tutor" />;
    homeworkTitle = "BTVN đang chờ chấm";
    TitleScheduleList = (
      <h4 className="aka-color-5 fw-bold flex-grow-1 mb-0">
        Lịch dạy hôm nay ({sumary.courses_today?.length} tiết)
      </h4>
    );
  }

  return (
    <div>
      <Banner BannerImage={BannerImage} BannerTitle={BannerTitle} />
      <ScheduleList
        TitleScheduleList={TitleScheduleList}
        courses_today={sumary.courses_today}
      />
      {/* <HomeworkList
        homeworks_today={sumary.homeworks_today}
        homeworkTitle={homeworkTitle}
      /> */}
    </div>
  );
}
