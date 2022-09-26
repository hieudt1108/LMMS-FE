import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "reactstrap";
import { getClassRoomById, getStudentList } from "../../../../Api";
import eye from "../../../../Assets/icon/eye.png";
import feMale from "../../../../Assets/icon/female.png";
import male from "../../../../Assets/icon/male.png";
import { UPDATE_CLASSROOM } from "../../../../Redux/Actions/ActionTypes";

function ShowStudent({ listId, match }) {
  // LOCAL STATE
  const { roomId } = match.params;
  const dispatch = useDispatch();
  const [listStudent, setListStudent] = useState([]);

  useEffect(() => {
    handleGetStudentList();
    fetchClassRoomDetail();
    return () => dispatch({ type: UPDATE_CLASSROOM, config: {} });
  }, [listId]);

  // FUNCTION DECLARATIONS
  async function handleGetStudentList() {
    const res = await getStudentList(listId);
    if (res.status < 400) {
      setListStudent(res.data.results);
    } else if (res.response) {
      alert("Không thể lấy danh sách, mã lỗi" + res.response.status);
    }
  }

  async function fetchClassRoomDetail() {
    const res = await getClassRoomById(roomId);

    if (res.status < 400) {
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
    <div className=" bg-white pb-5">
      <Table borderless striped responsive className="px-5 text-center mb-0">
        <thead>
          <tr className="aka-color-3">
            <th className="text-start">STT</th>
            <th className="text-start">Mã học sinh</th>
            <th className="text-start">Họ và tên</th>
            <th>Giới tính</th>
            <th>Số buổi vắng mặt</th>
            <th>Liên hệ</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.map((student, index) => (
            <tr key={index}>
              <th scope="row" className="ps-3 text-start">
                {student.student_no}
              </th>
              <td className="text-start">{student.user_code}</td>
              <td className="text-start">{student.name}</td>
              <td>
                {student.gender === 1 ? (
                  <img src={male} alt="icon" />
                ) : (
                  <img src={feMale} alt="icon" />
                )}
              </td>
              <td>{student.email}</td>
              <td>
                <img src={eye} alt="eye" style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowStudent;
