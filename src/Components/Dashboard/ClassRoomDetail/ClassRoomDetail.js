import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { UPDATE_CLASSROOM } from "../../../Redux/Actions/ActionTypes";
import { getClassRoomById } from "../../../Api";
import SubjectCard from "./SubjectCard";
import GoBack from "../Utils/GoBack";
import { subjectColor } from "../../Helpers";

export default function ClassRoomDetail({ match }) {
   const [subjects, setSubjects] = useState([]);
   const dispatch = useDispatch();
   const { roomId } = match.params;
   console.log("ClassroomID: " + roomId);
   // SIDE EFFECTS
   useEffect(() => {
      fetchClassRoomDetail();
      return () => dispatch({ type: UPDATE_CLASSROOM, config: {} });
   }, [roomId]);

   // FUNCTION DECLARATIONS
   async function fetchClassRoomDetail() {
      const res = await getClassRoomById(roomId);

      if (res.status < 400) {
         setSubjects(res.data);
         const studyClass = res.data.length > 0 ? res.data[0].study_class : {};
         dispatch({
            type: UPDATE_CLASSROOM,
            config: { classRoomDetail: studyClass },
         });
      } else if (res.response) {
         dispatch({ type: UPDATE_CLASSROOM, config: { classRoomDetail: {} } });
         alert("Error: " + res.response.status);
      }
   }

   return (
      <>
         <GoBack />
         <div className="bg-white h-100 aka-br-2 py-4 px-3">
            {subjects.length > 0 ? (
               subjects.map((room) => {
                  const { name, study_class_name, next_lesson, current_lesson, total_lesson } =
                     room;
                  return (
                     <SubjectCard
                        subject={{
                           name,
                           study_class_name,
                           ...next_lesson,
                           current_lesson,
                           total_lesson,
                        }}
                        key={room.next_lesson.id}
                        match={match}
                        id = {room.id}
                     />
                  );
               })
            ) : (
               <p>Bạn chưa có môn nào cho lớp này</p>
            )}
         </div>
      </>
   );
}
