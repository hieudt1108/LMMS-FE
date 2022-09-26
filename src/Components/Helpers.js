import {useLocation} from "react-router-dom";

function subjectColor(subject, lightBg) {
  switch (subject) {
    case "Toán học": {
      return lightBg ? "#F1EFFF" : "#816FFC";
    }
    case "Ngữ văn": {
      return lightBg ? "#FFFAEF" : "#BB9241";
    }
    case "Sinh học": {
      return lightBg ? "#EDF4FF" : "#65A1F5";
    }
    case "Vật lý": {
      return lightBg ? "#FFEFF2" : "#FC6A82";
    }
    case "Hóa học": {
      return lightBg ? "#FFF9F1" : "#FFA42C";
    }
    case "Địa lý": {
      return lightBg ? "#FFF0F3" : "#BEA5A9";
    }
    case "Lịch sử": {
      return lightBg ? "#EFF4FF" : "#7B91BC";
    }
    case "Tiếng Anh": {
      return lightBg ? "#EDFDFF" : "#00B2C7";
    }
    case "Tin học": {
      return lightBg ? "#FFF0FD" : "#C15CB5";
    }
    default:
      return "";
  }
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export {
  subjectColor,
  useQuery
}