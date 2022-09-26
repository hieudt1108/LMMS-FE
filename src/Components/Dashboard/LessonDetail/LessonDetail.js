import React, { useEffect, useState } from "react";
import GoBack from "../Utils/GoBack";
import LDcss from "./ModuleStyle/LessonDetail.module.scss";

import DocumentFile from "./DocumentFile";
import SubjectDetailCard from "./SubjectDetailCard";
import ScheduleCard from "./ScheduleCard";
import UpFile from "./UpFile";
import VideoCallBtn from "./VideoCallBtn";
import check from "../../../Assets/Dashboard/LessonDetail/check.png";
import { useDispatch } from "react-redux";
import { UPDATE_CLASSROOM } from "../../../Redux/Actions/ActionTypes";
import { useHistory } from "react-router-dom";
import { getLessonById } from "../../../Api";
import HomeWork from "./HomeWork";
import moment from "moment";

export default function LessonDetail({ match }) {
   const history = useHistory();
   const dispatch = useDispatch();
   //  GET LESSONID
   const { lessonId } = match.params;
   //  LOCAL STATE
   const [lesson, setLesson] = useState();
   const [docs, setDocs] = useState([]);
   const [schedule, setSchedule] = useState({});

   //   CALL API
   useEffect(() => {
      getLesson();
      return () => dispatch({ type: UPDATE_CLASSROOM, config: {} });
   }, [lessonId]);

   // FUNCTION DECLARATIONS
   async function getLesson() {
      const res = await getLessonById(lessonId);

      if (res.status < 400) {
         setLesson(res.data);
         setDocs(res.data.docs);
         setSchedule({
            session: res.data.session,
            start_time: res.data.start_time,
            end_time: res.data.end_time,
            lesson_date: res.data.lesson_date,
            total_student: res.data.total_student,
            total_student_in: res.data.total_student_in,
            lesson_no: res.data.lesson_no,
         });
         const param = res.data ? { subject: res.data.course.name, less: res.data.lesson_no } : {};
         dispatch({
            type: UPDATE_CLASSROOM,
            config: { lesonDetail: param },
         });
      } else if (res.response) {
         dispatch({ type: UPDATE_CLASSROOM, config: {} });
         alert("Error: " + res.response.status);
      }
   }

  //   FUCNTION CLICK BTN
  function handleClick() {
    history.push(match.url + "/roll-call/" + lessonId);
  }

   // CHECK EMPTY STATE RETURN
   if (!lesson) {
      return <h2>Tiết này không có gì cả</h2>;
   }
   const { status, course } = lesson;
   const initHomeWorks = [
      {
         start_dates: moment().add(1, "days"),
         title: "Kiểm tra tự học1",
         content: "Lăng kính 1: Tư duyu (24/11)",
         state: 1,
      },
      {
         start_dates: moment().subtract(3, "days"),
         title: "Kiểm tra tự học 22",
         content: "Lăng kính 2: Tư duy 11)",
         state: 1,
      },
      {
         start_dates: moment().subtract(2, "days"),
         title: "Kiểm tra tự học 3323",
         content: "Lăng kính 3: Tư duy T",
         state: 2,
      },
      {
         start_dates: moment().subtract(4, "days"),
         title: "Kiểm tra",
         content: "Lăng kính 4: Tư duy Toàn cầu (24/11)",
         state: 1,
      },
      {
         start_dates: moment(),
         title: "Tự học",
         content: "Lăng kính 15: cầu (24/11)",
         state: 2,
      },
      {
         start_dates: moment(),
         title: "Kiểm tra tự học",
         content: "Lăng kính 1: Tư d(24/11)",
         state: 2,
      },
   ];
   return (
      <div>
         <GoBack />

         <div className="w-100 d-flex justify-content-between aka-p-12">
            <h3 className="fw-bold  d-flex align-items-center">
               Tiết 3
               {status === 2 && (
                  <p className={LDcss.done_text + " h6 mb-0"}>
                     <img src={check} alt="check" width={24} height={24} className=" mx-2" />
                     <span>Đã hoàn thành</span>
                  </p>
               )}
            </h3>
            <div className="main-btn" onClick={handleClick}>
               Điểm danh
            </div>
         </div>

         <div className="d-flex justify-content-between mb-3">
            <SubjectDetailCard LDcss={LDcss} course={course} />
            <ScheduleCard LDcss={LDcss} statusLesson={status} schedule={schedule} />
         </div>

         <div className="d-flex justify-content-between">
            <div className={LDcss.document + " bg-white p-3 aka-br-3 "}>
               <div>
                  <UpFile LDcss={LDcss} lessonId={lessonId} setDocs={setDocs} docs={docs} />
                  {docs.map((doc, index) => (
                     <DocumentFile
                        css={LDcss}
                        doc={doc}
                        key={index}
                        lessonId={lessonId}
                        setDocs={setDocs}
                        docs={docs}
                     />
                  ))}
               </div>
            </div>
            <div className={LDcss.other}>
               <VideoCallBtn LDcss={LDcss} statusLesson={status} />
               <div className="bg-white aka-br-3 p-3 mt-2">
                  <h5 className="mb-3 fw-bold">Bài tập liên quan (8)</h5>
                  {initHomeWorks.map((homWork, index) => (
                     <HomeWork key={index} css={LDcss} homWork={homWork} moment={moment} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
