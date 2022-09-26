import React from "react";
import { Input, Label } from "reactstrap";
import { uploadDoc } from "../../../Api";
import page from "../../../Assets/Dashboard/LessonDetail/page.png";

function UpFile({ LDcss, lessonId, docs, setDocs }) {

  const uploadFiles = async (files) => {
    // 1. GET FILES FROM INPUT ELEMENT
    // 2. ADD LESSION_ID TO FORM DATA
    // 3. CALL API TO UPLOAD IT
    // 4. ALTER TO ALERT API CALL STATUS
    let formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("docs_file", files[key], files[key].name);
    }
    let res = await uploadDoc(lessonId, formData);
    
    if (res.status < 400) {
      setDocs([...docs, ...res.data]);
      alert("Đã up file thành công");
    } else {
      alert("Đã up file thất bại");
    }
  };
  
  return (
    <>
      <h5 className="mb-3">Tài liệu học tập</h5>
      <div className="aka-bg-1 aka-br-1 p-2">
        <div className={LDcss.up_file + " text-center aka-br-1 p-3"}>
          <img src={page} alt="icon" />
          <Input
            type="file"
            id="hidden-input"
            className={
              LDcss.btn_up_file +
              " bg-white aka-br-1 my-2 aka-fw-600 mx-auto py-2"
            }
            onChange={(e) => uploadFiles(e.target.files)}
          />
          <Label for="hidden-input" className="m-0 text-white">
            hoặc thả tệp ở đây
          </Label>
        </div>
      </div>
    </>
  );
}

export default UpFile;
