import React from "react";

import icon1 from "../../../Assets/Dashboard/LessonDetail/icon2.png";
import bin from "../../../Assets/Dashboard/LessonDetail/bin.png";
import { deleteDoc, downLoadDoc } from "../../../Api";

function DocumentFile({ css, doc, docs, setDocs, lessonId }) {
  const { title, id, doc_type } = doc;

  const handleDeleteFile = async (fileId) => {
    const res = await deleteDoc(lessonId, fileId);
    if (res.status < 400) {
      const updateDocs = docs.filter((doc) => doc.id !== id);
      setDocs(updateDocs);
      alert("Xóa file thành công");
    } else if (res.response) {
      alert("Xóa file thất bại");
    }
  };

  return (
    <div
      className={
        css.doc_file +
        " d-flex justify-content-between align-items-center aka-br-1 mt-3 px-3"
      }
    >
      <div
        className="d-flex py-3"
        onClick={() => downLoadDoc(lessonId, id, title)}
        style={{cursor:"pointer"}}
      >
        <img src={icon1} alt="icon" width={20} height={20} />
        <div className="flex-grow-1 ms-2">{title}</div>
      </div>

      <img
        src={bin}
        alt="bin"
        width={24}
        height={24}
        onClick={() => handleDeleteFile(id)}
        style={{cursor:"pointer"}}
      />
    </div>
  );
}

export default DocumentFile;
