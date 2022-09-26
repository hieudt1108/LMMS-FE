import React from "react";
import { Input, Table } from "reactstrap";
import { putCheckIn } from "../../../../Api";

export default function ShowArray({
  Arrcss,
  rollCall,
  setRollCall,
  totalLesson,
  lessonId,
}) {
  function handleCheck(student) {
    const updateStudents = rollCall.map((stu) => {
      if (stu.user_code === student.user_code) {
        handleUpdateRollCall(student.id, !student.is_user_in);
        return { ...stu, is_user_in: !student.is_user_in };
      }
      return { ...stu };
    });
    setRollCall(updateStudents);
  }

  async function handleUpdateRollCall(user_id, is_user_in) {
    const payload = {
      user_id,
      is_user_in,
    };
    
    const res = await putCheckIn(lessonId, payload);
    if (res.status < 400) {
    } else if (res.response) {
      alert("lỗi" + res.response.status);
    }
  }

  return (
    <div className={Arrcss.table_list + " bg-white pb-5"}>
      <Table borderless striped responsive className="px-5 text-center mb-0">
        <thead>
          <tr className="aka-color-3">
            <th>STT</th>
            <th className="text-start">Mã học sinh</th>
            <th className="text-start">Họ và tên</th>
            <th>Điểm danh</th>
            <th>Số buổi vắng mặt</th>
          </tr>
        </thead>
        <tbody>
          {rollCall.map((student, index) => (
            <tr key={index}>
              <th scope="row" className="ps-3">
                {student.student_no}
              </th>
              <td className="text-start">{student.user_code}</td>
              <td className="text-start">{student.name}</td>
              <td>
                <Input
                  className="m-0"
                  type="checkbox"
                  style={{ width: 20, height: 20 }}
                  defaultChecked={student.is_user_in}
                  value={student.is_user_in}
                  onChange={() => handleCheck(student)}
                />
              </td>
              <td>
                {student.total_missing}/{totalLesson}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
