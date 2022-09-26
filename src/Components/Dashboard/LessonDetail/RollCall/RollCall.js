import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCheckIn } from "../../../../Api";
import { UPDATE_CLASSROOM } from "../../../../Redux/Actions/ActionTypes";
import GoBack from "../../Utils/GoBack";
import Arrcss from "./RollCall.module.scss";
import InfoClass from "./InfoClass";
import SearchBox from "./SearchBox";
import ShowArray from "./ShowArray";

export default function RollCall({ match }) {
  const dispatch = useDispatch();
  const { roomId, lessonId } = match.params;
  const [rollCall, setRollCall] = useState([]);
  const [classInfo, setClassInfo] = useState([]);

  // SIDE EFFECTS
  useEffect(() => {
    handleRollCall();
    return () => dispatch({ type: UPDATE_CLASSROOM, config: {} });
  }, [roomId]);

  // FUNCTION DECLARATIONS

  async function handleRollCall() {
    const res = await getCheckIn(lessonId);

    if (res.status < 400) {
      setRollCall(res.data.student_info);
      setClassInfo(res.data.course);
      const studyClass = res.data.course.study_class;
      dispatch({
        type: UPDATE_CLASSROOM,
        config: { classRoomDetail: studyClass },
      });
    } else if (res.response) {
      dispatch({ type: UPDATE_CLASSROOM, config: { classRoomDetail: {} } });
      alert("Không thể lấy danh sách, mã lỗi" + res.response.status);
    }
  }

  return (
    <div>
      <GoBack />
      <SearchBox title="Điểm danh" />
      <InfoClass Arrcss={Arrcss} classInfo={classInfo} lessonId={lessonId} />
      <ShowArray
        Arrcss={Arrcss}
        rollCall={rollCall}
        setRollCall={setRollCall}
        totalLesson={classInfo.total_lesson}
      />
    </div>
  );
}
