import React from "react";
import { useHistory } from "react-router-dom";

function GoBack(props) {
  const history = useHistory();
  return (
    <p
      style={{ width: "fit-content", cursor: "pointer" }}
      className="bi bi-arrow-left aka-color-3 fs-6 aka-p-12" 
      onClick={history.goBack}
    >
      {" "}
      Quay lại
    </p>
  );
}

export default GoBack;
